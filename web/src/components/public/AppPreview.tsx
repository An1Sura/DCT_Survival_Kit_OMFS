import { Siren, Search, Home, BookOpen, Wrench } from "lucide-react";

/**
 * A stylised preview of the real web application layout — a browser window
 * chrome, NOT a phone mockup. Illustrates the desktop clinical UI.
 */
export function AppPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/15 bg-background shadow-2xl">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-gold/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        <div className="ml-3 flex h-5 flex-1 items-center rounded bg-background px-2 text-[10px] text-muted-foreground">
          app.dctsurvivalkit.com
        </div>
      </div>

      <div className="flex h-[360px] text-foreground">
        {/* sidebar */}
        <div className="hidden w-40 flex-col gap-1 bg-brand-green p-3 text-white/80 sm:flex">
          <div className="mb-2 font-serif text-sm font-semibold text-white">DCT Survival Kit</div>
          {[
            { icon: Home, label: "Home", active: true },
            { icon: BookOpen, label: "Modules" },
            { icon: Wrench, label: "Toolkits" },
            { icon: Siren, label: "On-Call", emerg: true },
          ].map((i) => (
            <div
              key={i.label}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
                i.active ? "bg-white/15 text-white" : ""
              } ${i.emerg ? "text-white" : ""}`}
            >
              <i.icon className="h-3.5 w-3.5" /> {i.label}
            </div>
          ))}
        </div>

        {/* content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <div className="flex h-7 flex-1 items-center gap-2 rounded-full border border-border bg-card px-2 text-[10px] text-muted-foreground">
              <Search className="h-3 w-3" /> Search modules, toolkits, red flags…
            </div>
            <div className="emergency-gradient flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white">
              <Siren className="h-3 w-3" /> On-Call
            </div>
          </div>

          <div className="p-3">
            <div className="hero-gradient rounded-lg p-3 text-white">
              <div className="text-[9px] uppercase tracking-widest text-white/60">Good evening, Dr Jones</div>
              <div className="mt-0.5 font-serif text-sm font-semibold">Continue reading</div>
              <div className="mt-2 rounded bg-white/10 p-2">
                <div className="text-[11px] font-medium">Facial Swelling</div>
                <div className="mt-1 h-1 rounded-full bg-white/20">
                  <div className="h-1 w-2/3 rounded-full bg-brand-gold" />
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { t: "Ludwig's Angina", u: "Emergency", c: "bg-destructive" },
                { t: "Post-Extraction Bleed", u: "Urgent", c: "bg-brand-gold" },
                { t: "Mandibular Fractures", u: "Urgent", c: "bg-brand-gold" },
                { t: "Clerking a Patient", u: "Foundation", c: "bg-muted-foreground" },
              ].map((card) => (
                <div key={card.t} className="rounded-lg border border-border bg-card p-2">
                  <div className="text-[10px] font-semibold leading-tight">{card.t}</div>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${card.c}`} />
                    <span className="text-[8px] uppercase tracking-wide text-muted-foreground">
                      {card.u}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
