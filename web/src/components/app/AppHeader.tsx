import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Menu, Siren, WifiOff, X } from "lucide-react";
import { search as runSearch, type SearchResult } from "@/lib/search";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { useOffline } from "@/context/OfflineContext";
import { cn } from "@/lib/utils";

export function AppHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const navigate = useNavigate();
  const { online } = useOffline();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = q.trim().length >= 2 ? runSearch(q).slice(0, 6) : [];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(r: SearchResult) {
    setOpen(false);
    setQ("");
    navigate(`/app/${r.kind === "module" ? "modules" : "toolkits"}/${r.slug}`);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) {
      setOpen(false);
      navigate(`/app/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <header className="safe-top sticky top-0 z-20 flex items-end gap-3 border-b border-border bg-background/90 px-4 pb-3 pt-5 backdrop-blur md:px-6 md:pb-4 md:pt-6">
      <button
        type="button"
        onClick={onOpenMenu}
        className="rounded-lg p-2 text-foreground hover:bg-muted md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div ref={boxRef} className="relative max-w-2xl flex-1">
        <form onSubmit={submit}>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search modules, toolkits, red flags…"
            aria-label="Search clinical content"
            className="h-10 w-full rounded-full border border-input bg-card pl-9 pr-9 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-ring"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        {open && results.length > 0 && (
          <div className="absolute left-0 right-0 top-12 z-30 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
            {results.map((r) => (
              <button
                key={r.kind + r.id}
                onClick={() => go(r)}
                className="flex w-full items-center gap-3 border-b border-border px-4 py-2.5 text-left last:border-0 hover:bg-muted"
              >
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                    r.kind === "module"
                      ? "bg-brand-green/12 text-brand-green"
                      : "bg-brand-gold/20 text-brand-gold-ink",
                  )}
                >
                  {r.kind}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.matched}</div>
                </div>
                <UrgencyBadge urgency={r.urgency} />
              </button>
            ))}
          </div>
        )}
      </div>

      {!online && (
        <span className="hidden items-center gap-1.5 rounded-full bg-brand-gold/15 px-3 py-1.5 text-xs font-semibold text-brand-gold-ink sm:flex">
          <WifiOff className="h-3.5 w-3.5" /> Offline
        </span>
      )}

      <Link
        to="/app/on-call"
        className="emergency-gradient hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-transform hover:scale-105 md:flex"
      >
        <Siren className="h-4 w-4" /> On-Call
      </Link>
    </header>
  );
}
