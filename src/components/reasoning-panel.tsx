import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BadgeCheck,
  Brain,
  ChevronRight,
  CircleCheck,
  FileSearch,
  Gavel,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { reasoningByRoute, type ReasoningContext } from "@/lib/demo-data";
import { Badge, Button, ConfidencePill, Meter } from "@/components/kit";
import { cn } from "@/lib/utils";

function SectionTitle({ icon: Icon, children }: { icon: typeof Brain; children: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{children}</h3>
    </div>
  );
}

export function ReasoningPanel() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ctx = (reasoningByRoute[pathname] ?? reasoningByRoute["/"]) as ReasoningContext;
  const [done, setDone] = useState(0);
  const [openEvidence, setOpenEvidence] = useState<number | null>(0);

  useEffect(() => {
    setDone(0);
    setOpenEvidence(0);
    const id = setInterval(() => {
      setDone((d) => (d >= ctx.steps.length ? d : d + 1));
    }, 420);
    return () => clearInterval(id);
  }, [pathname, ctx.steps.length]);

  return (
    <aside className="hidden w-[360px] shrink-0 border-l border-border bg-sidebar xl:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-border bg-card px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">AI Reasoning</p>
              <p className="text-[11px] text-muted-foreground">Always-on decision advisor</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-primary-soft px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground/70">
              Current objective
            </p>
            <p className="mt-1 text-sm font-medium text-accent-foreground">{ctx.objective}</p>
          </div>
          <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Activity className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-pulse text-primary" />
            {ctx.activity}
          </p>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <section>
            <SectionTitle icon={Brain}>Live AI workflow</SectionTitle>
            <ol className="space-y-2">
              {ctx.steps.map((step, i) => {
                const complete = i < done;
                const active = i === done;
                return (
                  <li
                    key={step}
                    className={cn(
                      "flex items-center gap-2 text-xs transition-colors duration-300",
                      complete ? "text-foreground" : active ? "text-primary" : "text-muted-foreground/60",
                    )}
                  >
                    {complete ? (
                      <CircleCheck className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <span
                        className={cn(
                          "h-3.5 w-3.5 rounded-full border",
                          active ? "animate-pulse border-primary bg-primary/20" : "border-border",
                        )}
                      />
                    )}
                    {step}
                  </li>
                );
              })}
            </ol>
          </section>

          <section>
            <SectionTitle icon={Sparkles}>Active AI agents</SectionTitle>
            <div className="space-y-3">
              {ctx.agents.map((a) => (
                <div key={a.name} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-foreground">{a.name}</p>
                    <span className="text-[10px] text-muted-foreground">{a.status}</span>
                  </div>
                  <div className="mt-2">
                    <Meter value={a.progress} />
                  </div>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">Confidence · {a.confidence}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle icon={FileSearch}>Evidence</SectionTitle>
            <div className="space-y-2">
              {ctx.evidence.map((e, i) => (
                <button
                  key={e.label}
                  onClick={() => setOpenEvidence(openEvidence === i ? null : i)}
                  className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/30 hover:bg-accent/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{e.type}</p>
                      <p className="mt-1 text-xs font-medium text-foreground">{e.label}</p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                        openEvidence === i && "rotate-90",
                      )}
                    />
                  </div>
                  {openEvidence === i ? (
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{e.detail}</p>
                  ) : null}
                </button>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle icon={BadgeCheck}>Confidence</SectionTitle>
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <ConfidencePill level={ctx.confidence.level} />
                <span className="font-display text-lg font-semibold text-foreground">{ctx.confidence.score}%</span>
              </div>
              <div className="mt-3">
                <Meter
                  value={ctx.confidence.score}
                  tone={ctx.confidence.level === "High" ? "primary" : ctx.confidence.level === "Medium" ? "warning" : "danger"}
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Why: </span>
                {ctx.confidence.why}
              </p>
            </div>
          </section>

          <section>
            <SectionTitle icon={Lightbulb}>Recommendations</SectionTitle>
            <div className="space-y-2">
              {ctx.recommendations.map((r) => (
                <div key={r.title} className="rounded-lg border border-border bg-card p-3">
                  <p className="text-xs font-semibold text-foreground">{r.title}</p>
                  <p className="mt-1 text-[11px] text-primary">{r.impact}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{r.rationale}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <Button size="sm">Apply</Button>
                    <Button size="sm" variant="outline">
                      View evidence
                    </Button>
                    <Button size="sm" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle icon={ShieldCheck}>Governance</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {ctx.governance.map((g) => (
                <Badge
                  key={g}
                  tone={
                    g.toLowerCase().includes("critical") || g.toLowerCase().includes("breach")
                      ? "danger"
                      : g.toLowerCase().includes("grounded") || g.toLowerCase().includes("audit")
                        ? "success"
                        : "warning"
                  }
                >
                  {g}
                </Badge>
              ))}
            </div>
          </section>

          <section className="pb-4">
            <SectionTitle icon={Gavel}>Suggested next action</SectionTitle>
            <div className="space-y-2">
              {ctx.nextActions.map((n, i) => (
                <Button key={n} variant={i === 0 ? "primary" : "outline"} className="w-full justify-between">
                  {n}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
