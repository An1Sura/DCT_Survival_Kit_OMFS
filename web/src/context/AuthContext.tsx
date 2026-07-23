import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase, getRedirectUrl } from "@/lib/supabase";

/**
 * Supabase-backed auth and subscription state.
 * Subscription access is derived from the profiles table, which is updated by
 * Stripe webhooks. The client never marks a payment successful.
 */

export type Role = "subscriber" | "editor" | "clinical-reviewer" | "clinical-owner" | "admin";

export type SubscriptionStatus = "none" | "trialing" | "active" | "canceled" | "past_due";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  roles: Role[];
  subscription: SubscriptionStatus;
  renewsOn?: string;
}

interface AuthValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthed: boolean;
  isSubscribed: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async (activeSession?: Session | null) => {
    if (!supabase) {
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }

    const currentSession =
      activeSession ?? (await supabase.auth.getSession()).data.session;
    setSession(currentSession);

    if (!currentSession?.user) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id,email,full_name,roles,subscription_status,subscription_current_period_end")
      .eq("id", currentSession.user.id)
      .maybeSingle();

    const roles = (profile?.roles as Role[] | null) ?? [];
    const subscription = (profile?.subscription_status as SubscriptionStatus | null) ?? "none";

    setUser({
      id: currentSession.user.id,
      name: profile?.full_name || currentSession.user.user_metadata?.full_name || currentSession.user.email?.split("@")[0] || "",
      email: profile?.email || currentSession.user.email || "",
      emailVerified: Boolean(currentSession.user.email_confirmed_at),
      roles,
      subscription,
      renewsOn: profile?.subscription_current_period_end?.slice(0, 10),
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadUser();

    if (!supabase) return;

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void loadUser(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, [loadUser]);

  const login = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: getRedirectUrl("/app/billing"),
      },
    });
    if (error) throw error;
  }, []);

  const sendMagicLink = useCallback(async (email: string) => {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: getRedirectUrl("/app/billing") },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      session,
      loading,
      isAuthed: !!user,
      isSubscribed: !!user && (user.subscription === "active" || user.subscription === "trialing"),
      isAdmin: !!user && user.roles.includes("admin"),
      login,
      register,
      sendMagicLink,
      logout,
      refreshUser: () => loadUser(),
      updateUser,
    }),
    [user, session, loading, login, register, sendMagicLink, logout, loadUser, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
