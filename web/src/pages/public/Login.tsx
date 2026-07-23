import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell } from "@/components/public/AuthShell";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login, sendMagicLink } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Signed in.");
      navigate("/app");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function magicLink() {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }

    setBusy(true);
    try {
      await sendMagicLink(email);
      toast.success("Magic link sent. Check your email.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send magic link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your survival kit."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="font-semibold text-brand-green hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Link to="/forgot-password" className="text-xs text-brand-green hover:underline">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="h-11 w-full rounded-full bg-brand-green font-semibold text-white transition-transform hover:scale-[1.01]"
        >
          {busy ? "Please wait..." : "Sign in"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={magicLink}
          className="h-11 w-full rounded-full border border-border font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          Email me a magic link
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Access is verified through Supabase and subscription status is updated
          by Stripe webhook events.
        </p>
      </form>
    </AuthShell>
  );
}
