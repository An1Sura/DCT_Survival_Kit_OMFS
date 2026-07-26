import { PublicLayout } from "@/components/public/PublicLayout";

const SECTIONS = [
  {
    h: "Essential storage",
    p: "The app uses essential cookies and local storage for sign-in, session security, billing handoff, saved preferences, bookmarks and progress.",
  },
  {
    h: "No advertising trackers",
    p: "The app does not use advertising trackers, marketing pixels, session-recording tools, or clinical-image tracking.",
  },
  {
    h: "Clinical data",
    p: "Do not enter patient-identifiable information anywhere in the app. The kit is designed as an educational reference, not a patient-record system.",
  },
  {
    h: "Managing storage",
    p: "You can clear browser storage in your browser settings. Signed-in users can also delete saved app data from the Account page.",
  },
];

export default function Cookies() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6">
        <div className="kicker">Cookie information</div>
        <h1 className="mt-2 font-serif text-4xl font-semibold">Cookies & local storage</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          This page explains the essential storage used before and after you access
          the DCT Survival Kit app.
        </p>
        <div className="mt-8 space-y-5">
          {SECTIONS.map((section) => (
            <section key={section.h} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-serif text-xl font-semibold">{section.h}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{section.p}</p>
            </section>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
