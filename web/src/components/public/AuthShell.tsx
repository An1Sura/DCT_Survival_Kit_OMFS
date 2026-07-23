import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { PRODUCT } from "@/data/meta";

/** Split-screen auth shell used by login / register / reset. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hero-gradient relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 font-serif text-xl font-bold">D</span>
          <span className="font-serif text-lg font-semibold">{PRODUCT.name}</span>
        </Link>
        <div>
          <h2 className="font-serif text-5xl font-semibold leading-[1.05]">
            Recognise.<br />Assess.<br /><span className="text-brand-gold">Escalate.</span>
          </h2>
          <p className="mt-4 max-w-sm text-white/70">
            Your personal OMFS survival resource — ready before the bleep goes.
          </p>
        </div>
        <p className="text-xs text-white/50">
          Educational aid only. Not a substitute for senior advice, local policy
          or emergency escalation.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green font-serif text-lg font-bold text-white">D</span>
            <span className="font-serif text-base font-semibold">{PRODUCT.name}</span>
          </Link>
          <h1 className="font-serif text-3xl font-semibold">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
