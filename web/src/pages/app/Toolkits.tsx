import { useMemo, useState } from "react";
import { PageContainer, PageHeading } from "@/components/app/PageContainer";
import { ToolkitCard } from "@/components/ContentCard";
import { TOOLKITS } from "@/data/toolkits";
import type { ToolkitType } from "@/data/types";
import { cn } from "@/lib/utils";

const TYPES: (ToolkitType | "all")[] = ["all", "ALGORITHM", "CHECKLIST", "FORM", "REFERENCE"];

export default function Toolkits() {
  const [type, setType] = useState<ToolkitType | "all">("all");

  const filtered = useMemo(
    () => (type === "all" ? TOOLKITS : TOOLKITS.filter((t) => t.type === type)),
    [type],
  );

  return (
    <PageContainer>
      <PageHeading
        kicker="Rapid reference"
        title="Toolkits"
        description={`${TOOLKITS.length} clinical toolkits — algorithms, checklists, forms and references. Toolkits pending clinical review are clearly marked.`}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
              type === t
                ? "border-brand-green bg-brand-green text-white"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {t === "all" ? "All types" : t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <ToolkitCard key={t.id} toolkit={t} />
        ))}
      </div>
    </PageContainer>
  );
}
