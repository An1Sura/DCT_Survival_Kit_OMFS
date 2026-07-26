import { Link } from "react-router-dom";
import {
  Siren,
  BookOpen,
  Wrench,
  Search,
  WifiOff,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  Check,
} from "lucide-react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { PRODUCT, CATEGORIES } from "@/data/meta";
import { AppPreview } from "@/components/public/AppPreview";

const FEATURES = [
  {
    icon: Siren,
    title: "On-Call mode",
    desc: "One tap to airway, sepsis, anaphylaxis and bleeding algorithms — built for stressful shifts.",
  },
  {
    icon: BookOpen,
    title: "36 handbook modules",
    desc: "Onboarding, clerking, trauma, infections and emergencies — structured to Recognise, Assess, Escalate.",
  },
  {
    icon: Wrench,
    title: "17 clinical toolkits",
    desc: "SBAR, ABCDE, Sepsis 6, consent checklists and rapid references you'll actually use.",
  },
  {
    icon: Search,
    title: "Fast search",
    desc: "Find any module, red flag or step in seconds — with urgent content prioritised.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    desc: "Install it once. Core emergency content stays available even when hospital signal drops.",
  },
  {
    icon: ShieldCheck,
    title: "Built responsibly",
    desc: "Clear disclaimers, issue reporting and source information keep the kit accountable.",
  },
];

export default function Landing() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div className="animate-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Stethoscope className="h-3.5 w-3.5" /> For OMFS Dental Core Trainees
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] md:text-6xl">
              Recognise.<br />Assess.<br />
              <span className="text-brand-gold">Escalate.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              The {PRODUCT.name} is a personal clinical reference and survival
              resource for your first OMFS on-call shifts — when fatigue,
              interruption and cognitive load are highest.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-base font-bold text-brand-green shadow-lg transition-transform hover:scale-[1.03]"
              >
                Get the kit — {PRODUCT.priceLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Explore features
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/60">
              {PRODUCT.moduleCount} modules · {PRODUCT.toolkitCount} toolkits · offline-ready access
            </p>
          </div>

          <div className="animate-in-up [animation-delay:120ms]">
            <AppPreview />
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10 text-center">
          <div className="kicker">Built for the OMFS front door</div>
          <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
            Whoever's holding the bleep tonight
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT.audience.map((a) => (
            <div
              key={a}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                <Check className="h-5 w-5" />
              </div>
              <p className="font-medium">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="bg-card/50 py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="mb-10 max-w-2xl">
            <div className="kicker">What's inside</div>
            <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
              Everything a new DCT needs, fast to scan
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-[0_12px_32px_-16px_rgba(47,65,54,0.4)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-[15px] text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10 max-w-2xl">
          <div className="kicker">Four categories</div>
          <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
            Organised the way you think on a shift
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div
              key={c.key}
              className={`rounded-xl border bg-card p-6 ${
                c.emergency ? "border-destructive/40" : "border-border"
              }`}
            >
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-3 font-serif text-xl font-semibold">{c.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="bg-brand-green py-16 text-white">
        <div className="mx-auto w-full max-w-3xl px-4 text-center md:px-6">
          <div className="kicker text-white/60">Simple pricing</div>
          <h2 className="mt-2 font-serif text-4xl font-semibold">
            {PRODUCT.priceLabel}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/75">
            One annual subscription. Full access to every module and toolkit,
            offline support, and content updates included for the year.
          </p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 text-base font-bold text-brand-green shadow-lg transition-transform hover:scale-[1.03]"
          >
            Start now <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-5 text-xs text-white/50">
            Legal, regulatory and disclaimer text requires final approval before launch.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
