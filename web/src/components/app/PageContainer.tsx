import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto min-w-0 w-full max-w-6xl overflow-x-clip px-4 py-6 md:px-6 md:py-8", className)}>
      {children}
    </div>
  );
}

export function PageHeading({
  kicker,
  title,
  description,
  actions,
}: {
  kicker?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {kicker && <div className="kicker mb-1">{kicker}</div>}
        <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[15px] text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
