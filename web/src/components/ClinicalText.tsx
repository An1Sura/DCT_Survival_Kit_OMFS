import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * Renders a single clinical item verbatim.
 * The uploaded content uses a leading "Heading\n..." convention and inline
 * "Label: value" fragments plus checklist markers (□). We format for
 * readability WITHOUT altering the clinical wording.
 */
export function ClinicalItem({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  // First line acts as an inline sub-heading when short and not a checklist line.
  const [first, ...rest] = lines;
  const firstIsHeading =
    rest.length > 0 && first.length < 60 && !first.startsWith("□") && !/[.:]$/.test(first) && !first.includes(": ");

  const body = firstIsHeading ? rest : lines;

  return (
    <div className="mb-3 last:mb-0">
      {firstIsHeading && (
        <p className="mb-1 font-semibold text-foreground">{first}</p>
      )}
      {body.map((line, i) => {
        const hasCheck = line.includes("□");
        return (
          hasCheck ? (
            <ChecklistText key={i} line={line} />
          ) : (
            <p key={i} className="text-[15px] leading-relaxed text-foreground/85">
              {line}
            </p>
          )
        );
      })}
    </div>
  );
}

function ChecklistText({ line }: { line: string }) {
  const [intro, ...rawItems] = line.split("□");
  const items = rawItems
    .map((item) => item.trim().replace(/^,/, "").replace(/,$/, "").trim())
    .filter(Boolean);

  return (
    <div className="my-2 space-y-2">
      {intro.trim() && (
        <p className="text-[15px] leading-relaxed text-foreground/85">
          {intro.trim()}
        </p>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex gap-3 rounded-lg border border-border/80 bg-background/55 px-3 py-2.5 text-[15px] leading-relaxed text-foreground/85 shadow-sm"
          >
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2",
                "border-brand-green/35 bg-brand-green/5 text-brand-green",
              )}
              aria-hidden
            >
              <Check className="h-3.5 w-3.5 opacity-45" />
            </span>
            <span className="min-w-0">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
