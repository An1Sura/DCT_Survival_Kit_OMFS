import { useState } from "react";
import { toast } from "sonner";
import { Building2, AlertTriangle, Save, RotateCcw } from "lucide-react";
import { PageContainer, PageHeading } from "@/components/app/PageContainer";
import { useTrust, type TrustSettings } from "@/context/TrustContext";

const FIELDS: {
  key: keyof TrustSettings;
  label: string;
  placeholder: string;
  type?: "textarea";
  group: string;
}[] = [
  { key: "trustName", label: "Trust name", placeholder: "e.g. Example NHS Foundation Trust", group: "Organisation" },
  { key: "hospitalName", label: "Hospital name", placeholder: "e.g. Example General Hospital", group: "Organisation" },
  { key: "switchboard", label: "Switchboard", placeholder: "e.g. 01234 567890", group: "Escalation contacts" },
  { key: "registrarContact", label: "On-call registrar", placeholder: "Bleep / number", group: "Escalation contacts" },
  { key: "consultantContact", label: "On-call consultant", placeholder: "Bleep / number", group: "Escalation contacts" },
  { key: "anaestheticsContact", label: "Anaesthetics", placeholder: "Bleep / number", group: "Escalation contacts" },
  { key: "entContact", label: "ENT", placeholder: "Bleep / number", group: "Escalation contacts" },
  { key: "ophthalmologyContact", label: "Ophthalmology", placeholder: "Bleep / number", group: "Escalation contacts" },
  { key: "airwayEquipmentLocation", label: "Emergency airway equipment location", placeholder: "e.g. Resus bay, theatre corridor…", type: "textarea", group: "Local information" },
  { key: "referralRoutes", label: "Local referral routes", placeholder: "How referrals reach OMFS, pathways…", type: "textarea", group: "Local information" },
  { key: "antibioticPolicy", label: "Local antibiotic policy", placeholder: "Paste or summarise your trust's guidance", type: "textarea", group: "Local information" },
  { key: "localPolicies", label: "Local policies", placeholder: "Links or notes on local protocols", type: "textarea", group: "Local information" },
  { key: "localNotes", label: "Personal notes", placeholder: "Anything else you want to hand — no patient data", type: "textarea", group: "Local information" },
];

const GROUPS = ["Organisation", "Escalation contacts", "Local information"];

export default function MyTrust() {
  const { trust, update, reset } = useTrust();
  const [draft, setDraft] = useState<TrustSettings>(trust);

  function save() {
    update(draft);
    toast.success("Trust settings saved on this device.");
  }

  function doReset() {
    reset();
    setDraft({ ...trust, ...Object.fromEntries(Object.keys(trust).map((k) => [k, ""])) } as TrustSettings);
    toast.success("Trust settings cleared.");
  }

  return (
    <PageContainer className="max-w-3xl">
      <PageHeading
        kicker="Local settings"
        title="My Trust"
        description="Store your local escalation contacts, referral routes and policies for instant recall on shift."
        actions={
          <div className="flex items-center gap-2 text-brand-green">
            <Building2 className="h-8 w-8" />
          </div>
        }
      />

      <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-brand-gold-ink">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <p className="text-sm">
          <strong>You are responsible for this information.</strong> Local details
          (contacts, policies, antibiotic guidance) must be confirmed by you and
          your employing organisation. Nothing here is prepopulated. Every trust
          has its own guidance — always verify before acting. Do not enter any
          patient-identifiable information.
        </p>
      </div>

      <div className="space-y-8">
        {GROUPS.map((group) => (
          <section key={group}>
            <h2 className="mb-3 font-serif text-lg font-semibold">{group}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.filter((f) => f.group === group).map((f) => (
                <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.key} className="mb-1.5 block text-sm font-medium">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      id={f.key}
                      rows={3}
                      value={draft[f.key]}
                      placeholder={f.placeholder}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                      className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <input
                      id={f.key}
                      value={draft[f.key]}
                      placeholder={f.placeholder}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                      className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="sticky bottom-20 mt-8 flex gap-3 md:bottom-4">
        <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 font-semibold text-white shadow-lg hover:bg-brand-green-mid">
          <Save className="h-4 w-4" /> Save settings
        </button>
        <button onClick={doReset} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 font-medium text-muted-foreground hover:bg-muted">
          <RotateCcw className="h-4 w-4" /> Clear all
        </button>
      </div>
    </PageContainer>
  );
}
