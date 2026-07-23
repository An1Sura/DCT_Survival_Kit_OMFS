import { cn } from "@/lib/utils";
import { URGENCY_META } from "@/data/meta";
import type { Urgency } from "@/data/types";

/** Urgency badge. Never relies on colour alone — always shows the label + a shape/dot. */
export function UrgencyBadge({
  urgency,
  className,
}: {
  urgency: Urgency;
  className?: string;
}) {
  const meta = URGENCY_META[urgency];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        meta.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} aria-hidden />
      {meta.label}
    </span>
  );
}
