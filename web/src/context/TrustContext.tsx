import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readJSON, writeJSON } from "@/lib/storage";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

/**
 * Trust-specific settings entered by the user.
 * NOTHING here is prepopulated with invented information — every field
 * starts empty and must be confirmed by the user and their employing
 * organisation. Stored locally only.
 */
export interface TrustSettings {
  trustName: string;
  hospitalName: string;
  switchboard: string;
  registrarContact: string;
  consultantContact: string;
  anaestheticsContact: string;
  entContact: string;
  ophthalmologyContact: string;
  referralRoutes: string;
  airwayEquipmentLocation: string;
  antibioticPolicy: string;
  localPolicies: string;
}

export const EMPTY_TRUST: TrustSettings = {
  trustName: "",
  hospitalName: "",
  switchboard: "",
  registrarContact: "",
  consultantContact: "",
  anaestheticsContact: "",
  entContact: "",
  ophthalmologyContact: "",
  referralRoutes: "",
  airwayEquipmentLocation: "",
  antibioticPolicy: "",
  localPolicies: "",
};

interface TrustValue {
  trust: TrustSettings;
  update: (patch: Partial<TrustSettings>) => void;
  reset: () => void;
  hasAny: boolean;
}

const TrustContext = createContext<TrustValue | null>(null);

export function TrustProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [trust, setTrust] = useState<TrustSettings>(() =>
    readJSON<TrustSettings>("trust", EMPTY_TRUST),
  );

  useEffect(() => writeJSON("trust", trust), [trust]);

  useEffect(() => {
    if (!supabase || !user) return;

    let cancelled = false;

    async function loadRemote() {
      const { data } = await supabase
        .from("trust_settings")
        .select("settings")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!cancelled && data?.settings) {
        setTrust({ ...EMPTY_TRUST, ...(data.settings as Partial<TrustSettings>) });
      }
    }

    void loadRemote();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!supabase || !user) return;

    void supabase.from("trust_settings").upsert({
      user_id: user.id,
      settings: trust,
      updated_at: new Date().toISOString(),
    });
  }, [trust, user]);

  const update = useCallback((patch: Partial<TrustSettings>) => {
    setTrust((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setTrust(EMPTY_TRUST), []);

  const value = useMemo<TrustValue>(
    () => ({
      trust,
      update,
      reset,
      hasAny: Object.values(trust).some((v) => v.trim() !== ""),
    }),
    [trust, update, reset],
  );

  return <TrustContext.Provider value={value}>{children}</TrustContext.Provider>;
}

export function useTrust(): TrustValue {
  const ctx = useContext(TrustContext);
  if (!ctx) throw new Error("useTrust must be used within TrustProvider");
  return ctx;
}
