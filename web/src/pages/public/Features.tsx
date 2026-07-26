import { Link } from "react-router-dom";
import {
  Siren, BookOpen, Wrench, Search, WifiOff, Bookmark,
  RefreshCw, ShieldCheck, ListChecks, FileText, Accessibility, ArrowRight,
} from "lucide-react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { PageHeading } from "@/components/app/PageContainer";

const GROUPS = [
  {
    title: "On the shift",
    items: [
      { icon: Siren, title: "One-tap On-Call mode", desc: "Emergency search, red-flag content, rapid-access algorithms and escalation prompts — reachable from anywhere." },
      { icon: ListChecks, title: "Interactive checklists", desc: "Sepsis 6, consent, Ludwig's red flags and more, with your progress remembered per checklist." },
      { icon: Search, title: "Prioritised search", desc: "Title matches and urgent content float to the top; filter by modules or toolkits." },
    ],
  },
  {
    title: "The content",
    items: [
      { icon: BookOpen, title: "36 handbook modules", desc: "Recognition, assessment, immediate actions, escalation, red flags, consultant pearls and handover prompts." },
      { icon: Wrench, title: "17 clinical toolkits", desc: "Algorithms, checklists, forms and references drawn from the handbook and named guideline bodies." },
      { icon: FileText, title: "Sources & review info", desc: "Every module carries version, clinical owner and review status so you can judge currency." },
    ],
  },
  {
    title: "Your workspace",
    items: [
      { icon: Bookmark, title: "Bookmarks & progress", desc: "Save modules and toolkits, mark them read, and pick up where you left off." },
      { icon: RefreshCw, title: "Account sync", desc: "Keep bookmarks and progress connected to your account across devices." },
      { icon: WifiOff, title: "Offline-ready access", desc: "Core emergency content stays available offline after first sync." },
    ],
  },
  {
    title: "Built responsibly",
    items: [
      { icon: ShieldCheck, title: "Clinically authored", desc: "Written by a practising consultant OMF surgeon, not a product team." },
      { icon: Accessibility, title: "Designed for WCAG 2.2 AA", desc: "Keyboard navigation, focus states, scalable text, reduced-motion support — never colour alone." },
      { icon: FileText, title: "Report an issue", desc: "Separate flows for clinical-content and technical issues, with patient-safety warnings." },
    ],
  },
];

export default function Features() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
        <PageHeading
          kicker="Features"
          title="A survival kit that keeps up with the bleep"
          description="Every feature is designed to help you recognise the sick patient, assess systematically, and escalate early — fast to scan under pressure."
        />
        <div className="space-y-12">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="mb-4 font-serif text-2xl font-semibold">{g.title}</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {g.items.map((f) => (
                  <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green text-white">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center">
          <h2 className="font-serif text-2xl font-semibold">Ready for your first on-call?</h2>
          <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-mid">
            Get the kit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
