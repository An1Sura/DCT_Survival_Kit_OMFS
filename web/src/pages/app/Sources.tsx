import { BookOpen, CalendarClock, UserCheck, ExternalLink } from "lucide-react";
import { PageContainer, PageHeading } from "@/components/app/PageContainer";
import { PRODUCT } from "@/data/meta";

const GUIDELINES = [
  "Resuscitation Council UK",
  "British National Formulary (BNF)",
  "NICE guidance",
  "ATLS (Advanced Trauma Life Support)",
  "BAOMS",
  "Local trust protocols & the clinical author's practice",
];

export default function Sources() {
  const a = PRODUCT.clinicalAuthor;
  return (
    <PageContainer className="max-w-3xl">
      <PageHeading kicker="Transparency" title="Sources & review information" description="How the clinical content is authored, sourced and maintained." />

      <section className="mb-6 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold">
          <UserCheck className="h-5 w-5 text-brand-green" /> Clinical author
        </h2>
        <p className="text-[15px]">
          {a.name}, {a.role} (GMC {a.gmc} / GDC {a.gdc}). Content is authored
          directly from experience and from local and national guidelines, with
          the author retaining editorial sign-off.
        </p>
      </section>

      <section className="mb-6 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold">
          <BookOpen className="h-5 w-5 text-brand-green" /> Guideline sources
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {GUIDELINES.map((g) => (
            <li key={g} className="flex items-center gap-2 text-[15px]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> {g}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold">
          <CalendarClock className="h-5 w-5 text-brand-green" /> Review cadence
        </h2>
        <p className="text-[15px]">
          Target review is biannual, or sooner where emergent national guidance
          supersedes existing material. Safety-critical corrections are actioned
          as soon as they are confirmed. Per-module version and review status are
          shown on each module page.
        </p>
      </section>

      <section className="rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-6 text-brand-gold-ink">
        <h2 className="mb-2 font-serif text-lg font-semibold">Content review status</h2>
        <p className="text-[15px]">
          Clinical wording is imported verbatim from the source handbook. Where
          review dates, ownership metadata, or specific toolkit content were not
          supplied in the source files, they are explicitly marked{" "}
          <strong>"Needs clinical review"</strong> rather than invented. Toolkits
          named in the prototype but not yet built out show{" "}
          <strong>"Content pending clinical review"</strong>.
        </p>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        <ExternalLink className="mr-1 inline h-3 w-3" />
        This information will be finalised alongside legal and clinical
        governance before launch.
      </p>
    </PageContainer>
  );
}
