import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";
import { DisclaimerGate } from "@/components/app/DisclaimerGate";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function AppLayout() {
  const { isAuthed, isSubscribed, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const location = useLocation();
  const requireSubscription = import.meta.env.VITE_REQUIRE_SUBSCRIPTION === "true";

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Checking account...</div>;
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  if (!disclaimerAccepted) {
    return <DisclaimerGate onAccept={() => setDisclaimerAccepted(true)} />;
  }

  if (requireSubscription && !isSubscribed && location.pathname !== "/app/billing") {
    return <Navigate to="/app/billing" replace />;
  }

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 self-stretch bg-sidebar md:block">
        <div className="sticky top-0 h-screen">
          <AppSidebar />
        </div>
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 animate-fade"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] animate-in-up">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-white/80 hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <AppSidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className={cn("flex min-w-0 max-w-full flex-1 flex-col overflow-x-hidden")}>
        <AppHeader onOpenMenu={() => setMenuOpen(true)} />
        <main className="min-w-0 max-w-full flex-1 overflow-x-hidden pb-24 md:pb-8">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
