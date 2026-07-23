import { Link, NavLink } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT } from "@/data/meta";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "Clinical Author" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { isAuthed } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green font-serif text-lg font-bold text-white">
              D
            </span>
            <div className="leading-tight">
              <div className="font-serif text-base font-semibold">{PRODUCT.name}</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {PRODUCT.tagline}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-brand-green"
                      : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthed ? (
              <Link
                to="/app"
                className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-mid"
              >
                Open app
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-mid"
                >
                  Get the kit
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="rounded-lg p-2 hover:bg-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  {n.label}
                </NavLink>
              ))}
              <div className="mt-2 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-semibold"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-brand-green px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get the kit
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-brand-green text-white/80">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 font-serif font-bold text-white">
                D
              </span>
              <span className="font-serif text-lg font-semibold text-white">{PRODUCT.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              {PRODUCT.tagline} A personal clinical reference and induction
              resource for OMFS trainees.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">Clinical author</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact &amp; support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy policy</Link></li>
              <li><Link to="/legal-disclaimer" className="hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-white/50 md:px-6">
            <p className="mb-1">
              <strong className="text-white/70">Educational aid only.</strong> Not a
              substitute for senior clinical advice, local trust policies, professional
              judgment, or emergency escalation. All legal &amp; regulatory text is a
              placeholder pending final approval.
            </p>
            <p>© {new Date().getFullYear()} {PRODUCT.name}. Clinical content by {PRODUCT.clinicalAuthor.name}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
