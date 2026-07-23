import { NavLink } from "react-router-dom";
import { Home, BookOpen, Wrench, Siren, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/modules", label: "Modules", icon: BookOpen },
  { to: "/app/on-call", label: "On-Call", icon: Siren, emergency: true },
  { to: "/app/toolkits", label: "Toolkits", icon: Wrench },
  { to: "/app/search", label: "Search", icon: Search },
];

/** Mobile bottom navigation with large touch targets + safe-area spacing. */
export function BottomNav() {
  return (
    <nav
      className="safe-bottom fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-background/95 backdrop-blur md:hidden"
      aria-label="Primary"
    >
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              isActive
                ? t.emergency
                  ? "text-destructive"
                  : "text-brand-green"
                : "text-muted-foreground",
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  isActive && t.emergency && "bg-destructive/12",
                  isActive && !t.emergency && "bg-brand-green/12",
                )}
              >
                <t.icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              {t.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
