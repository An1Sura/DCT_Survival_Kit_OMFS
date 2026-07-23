import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Clock, CheckCircle2, Trash2 } from "lucide-react";
import { PageContainer, PageHeading } from "@/components/app/PageContainer";
import { ModuleCard, ToolkitCard } from "@/components/ContentCard";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { MODULES, getModuleById } from "@/data/modules";
import { TOOLKITS, getToolkitById } from "@/data/toolkits";
import { useLibrary } from "@/context/LibraryContext";
import { cn } from "@/lib/utils";

type Tab = "bookmarks" | "recent" | "read";

export default function Bookmarks() {
  const { bookmarks, recent, read, clearRecent } = useLibrary();
  const [tab, setTab] = useState<Tab>("bookmarks");

  const bookmarkedModules = MODULES.filter((m) => bookmarks.includes(m.id));
  const bookmarkedToolkits = TOOLKITS.filter((t) => bookmarks.includes(t.id));
  const readModules = MODULES.filter((m) => read.includes(m.id));

  const TABS: { key: Tab; label: string; icon: typeof Bookmark; count: number }[] = [
    { key: "bookmarks", label: "Bookmarks", icon: Bookmark, count: bookmarks.length },
    { key: "recent", label: "Recently viewed", icon: Clock, count: recent.length },
    { key: "read", label: "Completed", icon: CheckCircle2, count: read.length },
  ];

  return (
    <PageContainer>
      <PageHeading kicker="Your library" title="Bookmarks & progress" description="Saved content, your history, and modules you've completed. Stored on your device." />

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              tab === t.key ? "border-brand-green bg-brand-green text-white" : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
            <span className={cn("rounded-full px-1.5 text-xs", tab === t.key ? "bg-white/20" : "bg-muted")}>{t.count}</span>
          </button>
        ))}
      </div>

      {tab === "bookmarks" && (
        bookmarks.length === 0 ? (
          <Empty icon={Bookmark} text="No bookmarks yet. Tap the bookmark icon on any module or toolkit to save it here." />
        ) : (
          <div className="space-y-8">
            {bookmarkedModules.length > 0 && (
              <div>
                <h2 className="mb-3 font-serif text-lg font-semibold">Modules</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {bookmarkedModules.map((m) => <ModuleCard key={m.id} module={m} />)}
                </div>
              </div>
            )}
            {bookmarkedToolkits.length > 0 && (
              <div>
                <h2 className="mb-3 font-serif text-lg font-semibold">Toolkits</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {bookmarkedToolkits.map((t) => <ToolkitCard key={t.id} toolkit={t} />)}
                </div>
              </div>
            )}
          </div>
        )
      )}

      {tab === "recent" && (
        recent.length === 0 ? (
          <Empty icon={Clock} text="Nothing viewed yet. Content you open will appear here." />
        ) : (
          <div>
            <div className="mb-3 flex justify-end">
              <button onClick={clearRecent} className="inline-flex items-center gap-1.5 text-sm font-semibold text-destructive hover:underline">
                <Trash2 className="h-4 w-4" /> Clear history
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {recent.map((r) => {
                const mod = r.kind === "module" ? getModuleById(r.id) : null;
                const tk = r.kind === "toolkit" ? getToolkitById(r.id) : null;
                const title = mod?.title ?? tk?.title ?? "";
                const to = mod ? `/app/modules/${mod.slug}` : `/app/toolkits/${tk?.slug}`;
                const urgency = mod?.urgency ?? tk?.urgency;
                return (
                  <Link key={r.id} to={to} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-brand-green/40">
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">{r.kind}</span>
                    <span className="flex-1 truncate font-medium">{title}</span>
                    <span className="text-xs text-muted-foreground">{new Date(r.at).toLocaleDateString()}</span>
                    {urgency && <UrgencyBadge urgency={urgency} />}
                  </Link>
                );
              })}
            </div>
          </div>
        )
      )}

      {tab === "read" && (
        readModules.length === 0 ? (
          <Empty icon={CheckCircle2} text="No completed modules yet. Mark a module as read to track your progress." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {readModules.map((m) => <ModuleCard key={m.id} module={m} />)}
          </div>
        )
      )}
    </PageContainer>
  );
}

function Empty({ icon: Icon, text }: { icon: typeof Bookmark; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-12 text-center">
      <Icon className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
      <p className="mx-auto max-w-sm text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
