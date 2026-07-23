import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Siren, Search, PhoneCall, ChevronRight, WifiOff, AlertTriangle, Building2,
} from "lucide-react";
import { TOOLKITS, ONCALL_RED_TOOLKITS, getToolkitById } from "@/data/toolkits";
import { MODULES } from "@/data/modules";
import { search as runSearch } from "@/lib/search";
import { useOffline } from "@/context/OfflineContext";
import { useTrust } from "@/context/TrustContext";

const ESCALATION = [
  { icon: "🩺", label: "Registrar", key: "registrarContact" as const },
  { icon: "☎️", label: "Switchboard", key: "switchboard" as const },
  { icon: "👁️", label: "Ophthalmology", key: "ophthalmologyContact" as const },
  { icon: "💉", label: "Anaesthetics", key: "anaestheticsContact" as const },
  { icon: "👂", label: "ENT", key: "entContact" as const },
];

export default function OnCall() {
  const { online, lastSync } = useOffline();
  const { trust } = useTrust();
  const [q, setQ] = useState("");

  const redToolkits = ONCALL_RED_TOOLKITS.map((id) => getToolkitById(id)!).filter(Boolean);
  const emergencyModules = MODULES.filter((m) => m.urgency === "Emergency");
  const results = q.trim().length >= 2 ? runSearch(q).slice(0, 8) : [];

  const redFlags = useMemo(() => {
    const rf = getToolkitById("T06");
    return rf?.items ?? [];
  }, []);

  return (
    <div className="min-h-full bg-[#1a120f] pb-24 md:pb-8">
      {/* Emergency banner */}
      <div className="emergency-gradient px-4 py-6 text-white md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <Siren className="h-3.5 w-3.5" /> On-Call Mode
            </span>
            {!online && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold">
                <WifiOff className="h-3.5 w-3.5" /> Offline — cached content
              </span>
            )}
          </div>
          <h1 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">Recognise. Assess. Escalate.</h1>
          <p className="mt-1 text-white/80">Airway first. If you're worried, escalate early — that's good judgement.</p>

          {/* Emergency search */}
          <div className="relative mt-5 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Emergency search — e.g. airway, sepsis, bleeding…"
              aria-label="Emergency search"
              className="h-14 w-full rounded-xl border-2 border-white/25 bg-black/20 pl-12 pr-4 text-base text-white placeholder:text-white/50 outline-none focus:border-white"
            />
          </div>

          {results.length > 0 && (
            <div className="mt-2 max-w-xl overflow-hidden rounded-xl border border-white/15 bg-[#1a120f]">
              {results.map((r) => (
                <Link
                  key={r.kind + r.id}
                  to={`/app/${r.kind === "module" ? "modules" : "toolkits"}/${r.slug}`}
                  className="flex items-center gap-3 border-b border-white/10 px-4 py-3 text-white last:border-0 hover:bg-white/5"
                >
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase">{r.kind}</span>
                  <span className="flex-1 truncate text-sm font-medium">{r.title}</span>
                  <ChevronRight className="h-4 w-4 text-white/40" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 md:px-8">
        {/* Escalation contacts */}
        <section>
          <SectionTitle icon={<PhoneCall className="h-4 w-4" />}>Escalation</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ESCALATION.map((e) => {
              const number = trust[e.key];
              const inner = (
                <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center text-white transition-colors hover:bg-white/10">
                  <span className="text-2xl">{e.icon}</span>
                  <span className="mt-2 text-sm font-semibold">{e.label}</span>
                  <span className="mt-0.5 text-xs text-white/50">{number || "Add in My Trust"}</span>
                </div>
              );
              return number ? (
                <a key={e.label} href={`tel:${number.replace(/\s/g, "")}`}>{inner}</a>
              ) : (
                <Link key={e.label} to="/app/trust">{inner}</Link>
              );
            })}
          </div>
        </section>

        {/* Rapid toolkits */}
        <section>
          <SectionTitle icon={<Siren className="h-4 w-4" />}>Rapid-access toolkits</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {redToolkits.map((t) => (
              <Link
                key={t.id}
                to={`/app/toolkits/${t.slug}`}
                className="emergency-gradient flex items-center gap-3 rounded-xl p-4 text-white transition-transform hover:scale-[1.01]"
              >
                <span className="text-2xl">{t.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-lg font-semibold leading-tight">{t.title}</div>
                  <div className="truncate text-sm text-white/80">{t.introduction}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-white/60" />
              </Link>
            ))}
          </div>
        </section>

        {/* Red flags */}
        <section>
          <SectionTitle icon={<AlertTriangle className="h-4 w-4" />}>Airway red flags — Ludwig's Angina</SectionTitle>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 text-white">
            <p className="mb-3 text-sm text-white/70">Any positive finding = call anaesthetics + ENT now.</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {redFlags.map((rf, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                  {rf}
                </li>
              ))}
            </ul>
            <Link to="/app/toolkits/ludwig-s-angina-red-flags" className="mt-4 inline-block text-sm font-semibold text-brand-gold hover:underline">
              Open full checklist →
            </Link>
          </div>
        </section>

        {/* Emergency modules */}
        <section>
          <SectionTitle icon={<Siren className="h-4 w-4" />}>Emergency modules</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {emergencyModules.map((m) => (
              <Link
                key={m.id}
                to={`/app/modules/${m.slug}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3.5 text-white hover:bg-white/10"
              >
                <span className="flex-1 truncate text-sm font-medium">{m.title}</span>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-col items-center gap-2 pt-4 text-center text-xs text-white/40">
          <Link to="/app/trust" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white">
            <Building2 className="h-4 w-4" /> Set up your trust escalation contacts
          </Link>
          <p>Offline-ready · {lastSync ? `last synced ${new Date(lastSync).toLocaleString()}` : "not yet synced"}</p>
          <p className="max-w-md">
            Educational aid only. Always confirm doses and pathways against local
            guidance and escalate to your senior.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
      {icon} {children}
    </h2>
  );
}
