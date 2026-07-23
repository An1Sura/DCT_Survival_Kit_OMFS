import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X, ChevronRight, SearchX } from "lucide-react";
import { PageContainer, PageHeading } from "@/components/app/PageContainer";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { search as runSearch } from "@/lib/search";
import { cn } from "@/lib/utils";

type Filter = "all" | "module" | "toolkit";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const t = setTimeout(() => {
      if (q) setParams({ q }, { replace: true });
      else setParams({}, { replace: true });
    }, 200);
    return () => clearTimeout(t);
  }, [q, setParams]);

  const all = useMemo(() => runSearch(q), [q]);
  const results = filter === "all" ? all : all.filter((r) => r.kind === filter);

  return (
    <PageContainer className="max-w-4xl">
      <PageHeading kicker="Search" title="Find it fast" description="Search across module titles, sections, red flags, keywords and toolkit steps. Urgent content is prioritised." />

      <div className="relative mb-4">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search clinical content…"
          aria-label="Search"
          className="h-13 w-full rounded-xl border border-input bg-card py-3.5 pl-12 pr-11 text-base outline-none focus:ring-2 focus:ring-ring"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-6 flex gap-2">
        {(["all", "module", "toolkit"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-semibold capitalize transition-colors",
              filter === f ? "border-brand-green bg-brand-green text-white" : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f === "all" ? "All" : f + "s"}
            {q && f !== "all" && <span className="ml-1.5 opacity-60">{all.filter((r) => r.kind === f).length}</span>}
          </button>
        ))}
      </div>

      {q.trim().length < 2 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Type at least two characters to search.
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <SearchX className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-semibold">No results for "{q}"</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a broader term, a symptom, or a red flag. You can also{" "}
            <Link to="/app/modules" className="text-brand-green hover:underline">browse all modules</Link>.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="mb-2 text-sm text-muted-foreground">{results.length} result{results.length !== 1 ? "s" : ""}</p>
          {results.map((r) => (
            <Link
              key={r.kind + r.id}
              to={`/app/${r.kind === "module" ? "modules" : "toolkits"}/${r.slug}`}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-brand-green/40"
            >
              <span className={cn(
                "mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                r.kind === "module" ? "bg-brand-green/12 text-brand-green" : "bg-brand-gold/20 text-brand-gold-ink",
              )}>
                {r.kind}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-semibold">{r.title}</h3>
                  <UrgencyBadge urgency={r.urgency} />
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">{r.category}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.matched}</p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
