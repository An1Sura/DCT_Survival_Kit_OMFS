import { BadgeCheck, BookOpen, ShieldCheck } from "lucide-react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { PRODUCT } from "@/data/meta";

export default function About() {
  const a = PRODUCT.clinicalAuthor;
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6">
        <div className="kicker">Clinical author</div>
        <h1 className="mt-2 font-serif text-4xl font-semibold">Whose judgement you're relying on</h1>

        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-brand-green font-serif text-3xl font-bold text-white">
            VB
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold">{a.name}</h2>
            <p className="text-muted-foreground">{a.role}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                <BadgeCheck className="h-3.5 w-3.5" /> GMC {a.gmc}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                <BadgeCheck className="h-3.5 w-3.5" /> GDC {a.gdc}
              </span>
            </div>
          </div>
        </div>

        <div className="prose mt-10 max-w-none space-y-5 text-[15px] leading-relaxed text-foreground/85">
          <p>
            The {PRODUCT.name} is authored by a practising surgeon and professor —
            not written by a product team on their behalf. Every module and
            toolkit is written from experience and from local and national
            guidelines.
          </p>
          <p>
            Clinical content draws on personal practice and local protocols
            alongside named guideline bodies including the Resuscitation Council
            UK, the British National Formulary (BNF), NICE, ATLS and BAOMS. Where
            a specific dose or threshold is given, it reflects those sources.
          </p>
          <p>
            Content is reviewed on a regular cadence (target: biannually, or
            sooner where emergent national guidance supersedes existing
            material). The clinical author retains editorial sign-off on
            additions and corrections.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: BookOpen, t: "Written from practice", d: "Authored directly, not outsourced." },
            { icon: ShieldCheck, t: "Guideline-aligned", d: "Resus UK, BNF, NICE, ATLS, BAOMS." },
            { icon: BadgeCheck, t: "Accountable", d: "A named, registered clinician stands behind it." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border border-border bg-background p-5">
              <x.icon className="mb-2 h-5 w-5 text-brand-green" />
              <h3 className="font-semibold">{x.t}</h3>
              <p className="text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-lg border border-brand-gold/40 bg-brand-gold/10 p-4 text-sm text-brand-gold-ink">
          This resource is a personal educational aid. It does not replace senior
          clinical advice, local trust policies, professional judgment, or
          emergency escalation procedures.
        </p>
      </div>
    </PublicLayout>
  );
}
