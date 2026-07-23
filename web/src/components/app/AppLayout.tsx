import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";
import { EmergencyFab } from "@/components/EmergencyFab";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function AppLayout() {
  const { isAuthed, isSubscribed, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Checking account...</div>;
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  if (!isSubscribed && window.location.pathname !== "/app/billing" && window.location.pathname !== "/app/account") {
    return <Navigate to="/app/billing" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 md:block">
        <AppSidebar />
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

      <div className={cn("flex min-w-0 flex-1 flex-col")}>
        <AppHeader onOpenMenu={() => setMenuOpen(true)} />
        <main className="flex-1 pb-24 md:pb-8">
          <Outlet />
        </main>
        <BottomNav />
        <EmergencyFab />
      </div>
    </div>
  );
}
