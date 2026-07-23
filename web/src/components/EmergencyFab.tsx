import { Link, useLocation } from "react-router-dom";
import { Siren } from "lucide-react";

/** One-tap On-Call access from anywhere in the app (safety-critical path). */
export function EmergencyFab() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/app/on-call")) return null;
  return (
    <Link
      to="/app/on-call"
      className="emergency-gradient fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-destructive/30 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white md:bottom-6 md:right-6"
      aria-label="Open On-Call mode"
    >
      <Siren className="h-5 w-5" aria-hidden />
      On-Call
    </Link>
  );
}
