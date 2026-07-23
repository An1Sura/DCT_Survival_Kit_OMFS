import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UrgencyBadge } from "./UrgencyBadge";
import { useLibrary } from "@/context/LibraryContext";
import type { Module, Toolkit } from "@/data/types";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const { isBookmarked, toggleBookmark, isRead } = useLibrary();
  const bookmarked = isBookmarked(module.id);
  const read = isRead(module.id);

  return (
    <Link
      to={`/app/modules/${module.slug}`}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-brand-green/40 hover:shadow-[0_8px_24px_-12px_rgba(47,65,54,0.4)] focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {module.category}
        </span>
        <button
          type="button"
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-pressed={bookmarked}
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(module.id);
          }}
          className="-m-1 rounded-md p-1 text-muted-foreground transition-colors hover:text-brand-green"
        >
          {bookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-brand-gold-ink" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>
      <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">
        {module.title}
      </h3>
      {module.quote && (
        <p className="mt-1.5 line-clamp-2 text-sm italic text-muted-foreground">
          {module.quote}
        </p>
      )}
      <div className="mt-auto flex items-center gap-2 pt-3">
        <UrgencyBadge urgency={module.urgency} />
        {read && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success">
            <Check className="h-3 w-3" /> Read
          </span>
        )}
        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

export function ToolkitCard({ toolkit }: { toolkit: Toolkit }) {
  const { isBookmarked, toggleBookmark } = useLibrary();
  const bookmarked = isBookmarked(toolkit.id);

  return (
    <Link
      to={`/app/toolkits/${toolkit.slug}`}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-brand-green/40 hover:shadow-[0_8px_24px_-12px_rgba(47,65,54,0.4)] focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-2xl leading-none" aria-hidden>
          {toolkit.icon}
        </span>
        <button
          type="button"
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-pressed={bookmarked}
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(toolkit.id);
          }}
          className="-m-1 rounded-md p-1 text-muted-foreground transition-colors hover:text-brand-green"
        >
          {bookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-brand-gold-ink" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>
      <h3 className="font-serif text-base font-semibold leading-tight text-foreground">
        {toolkit.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
        {toolkit.introduction}
      </p>
      <div className="mt-auto flex items-center gap-2 pt-3">
        <span
          className={cn(
            "rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
          )}
        >
          {toolkit.type}
        </span>
        {toolkit.placeholder && (
          <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-gold-ink">
            Pending review
          </span>
        )}
        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
