import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Confidence } from "@/lib/demo-data";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("surface-card p-5", className)}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="rise-in mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

const toneMap = {
  primary: "bg-primary-soft text-accent-foreground border-primary/15",
  neutral: "bg-muted text-muted-foreground border-border",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof toneMap;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "soft";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    outline: "border border-border bg-card text-foreground hover:bg-accent hover:border-primary/30",
    ghost: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    soft: "bg-primary-soft text-accent-foreground hover:bg-primary-soft/70",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.985]",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Meter({ value, tone = "primary" }: { value: number; tone?: "primary" | "warning" | "danger" }) {
  const bg = tone === "danger" ? "bg-destructive" : tone === "warning" ? "bg-warning" : "bg-primary";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all duration-700", bg)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function ConfidencePill({ level }: { level: Confidence }) {
  const tone = level === "High" ? "success" : level === "Medium" ? "warning" : "danger";
  return <Badge tone={tone}>{level} confidence</Badge>;
}

export function Stat({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <Card className="transition-shadow duration-200 hover:shadow-[var(--shadow-panel)]">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-foreground">{value}</p>
      {delta ? <p className="mt-1 text-xs text-primary">{delta}</p> : null}
    </Card>
  );
}
