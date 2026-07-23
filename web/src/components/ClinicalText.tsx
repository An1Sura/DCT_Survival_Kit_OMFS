import { cn } from "@/lib/utils";

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
        const isCheck = line.startsWith("□");
        return (
          <p
            key={i}
            className={cn(
              "text-[15px] leading-relaxed text-foreground/85",
              isCheck && "flex gap-2 pl-1",
            )}
          >
            {isCheck ? (
              <>
                <span className="mt-0.5 select-none text-muted-foreground" aria-hidden>
                  ☐
                </span>
                <span>{line.replace(/^□\s*/, "")}</span>
              </>
            ) : (
              line
            )}
          </p>
        );
      })}
    </div>
  );
}
