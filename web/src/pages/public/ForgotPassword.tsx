import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell } from "@/components/public/AuthShell";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success("If that email exists, a reset link would be sent (demo).");
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a link to set a new one."
      footer={
        <Link to="/login" className="font-semibold text-brand-green hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
          If an account exists for that email, a password-reset link would be
          sent. (Demo — password reset is connected before launch via Supabase.)
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="h-11 w-full rounded-full bg-brand-green font-semibold text-white transition-transform hover:scale-[1.01]"
          >
            Send reset link
          </button>
        </form>
      )}
    </AuthShell>
  );
}
