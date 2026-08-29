import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, ConfidencePill, Meter, PageHeader } from "@/components/kit";
import { comparableDeals } from "@/lib/demo-data";

export const Route = createFileRoute("/leadership-review")({
  head: () => ({
    meta: [
      { title: "Leadership Review — Executive Decision Workspace | Promoter AI" },
      {
        name: "description",
        content: "Leadership reviews the executive summary, AI recommendation, confidence, evidence and audit trail, then approves or requests a revision.",
      },
      { property: "og:title", content: "Leadership Review — Promoter AI" },
      { property: "og:description", content: "Leadership always remains the final decision maker, with a full audit trail of every AI input." },
    ],
  }),
  component: LeadershipReview,
});

const audit = [
  { t: "18 Aug 2026 · 14:20", e: "Plan BP-2041 created by Vedant Kasat" },
  { t: "18 Aug 2026 · 14:38", e: "Promoter AI retrieved 4 comparable deals (similarity ≥ 71%)" },
  { t: "19 Aug 2026 · 09:02", e: "Guarantee recommendation applied — $1.10M reduced to $1.02M" },
  { t: "19 Aug 2026 · 09:14", e: "Marketing budget corrected to 8.5% of gross — BR-14 cleared" },
  { t: "19 Aug 2026 · 10:01", e: "Plan submitted for leadership review · readiness 91" },
];

function LeadershipReview() {
  const [decision, setDecision] = useState<string | null>(null);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Leadership Review"
        title="Prince XYZ · United Center, Chicago · 14 Nov 2026"
        description="Executive summary with every figure traced to settled deals. Leadership makes the final call."
        actions={
          <>
            <Button variant="outline" onClick={() => setDecision("Revision requested")}>
              Request revision
            </Button>
            <Button onClick={() => setDecision("Approved")}>Approve plan</Button>
          </>
        }
      />

      {decision ? (
        <div className="rise-in mb-4 rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-accent-foreground">
          Decision recorded: <span className="font-semibold">{decision}</span> · logged to the audit trail and fed back
          into the expertise signal.
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Executive summary</h2>
              <ConfidencePill level="High" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A November arena date for Prince XYZ in Chicago is supported by four settled comparables. After AI
              calibration the guarantee is set at <span className="font-medium text-foreground">$1.02M</span> with a
              performance bonus at 90% sell-through, producing a projected net margin of{" "}
              <span className="font-medium text-foreground">14.1%</span> — above the 12% leadership floor. All business
              rules pass and no assumptions remain open.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                { k: "Guarantee", v: "$1.02M" },
                { k: "Projected revenue", v: "$3.61M" },
                { k: "Net margin", v: "14.1%" },
                { k: "Readiness", v: "91" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg bg-accent/50 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-accent-foreground/70">{s.k}</p>
                  <p className="mt-0.5 font-display text-base font-semibold text-accent-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-foreground">AI recommendation &amp; evidence</h2>
            <div className="mt-3 rounded-lg border border-border bg-background p-4">
              <p className="text-sm font-medium text-foreground">Approve with the guarantee capped at $1.02M</p>
              <p className="mt-1 text-xs text-primary">Protects a 14.1% projected net margin</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Matches the similarity-weighted benchmark of $955K plus the Chicago November premium, and sits below the
                $1.08M walk-up point implied by the margin floor.
              </p>
            </div>
            <div className="mt-3 space-y-2">
              {comparableDeals.slice(0, 3).map((d) => (
                <div key={d.artist} className="flex flex-wrap items-center gap-3 rounded-lg border border-border px-3 py-2.5">
                  <p className="min-w-[160px] flex-1 text-xs font-medium text-foreground">
                    {d.artist} · {d.venue}
                  </p>
                  <span className="text-[11px] text-muted-foreground">Guarantee {d.guarantee}</span>
                  <span className="text-[11px] text-muted-foreground">Margin {d.margin}</span>
                  <div className="w-24">
                    <Meter value={d.similarity} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-foreground">Leadership comments</h2>
            <textarea
              rows={3}
              placeholder="Add a comment for the promoter…"
              className="mt-3 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
            />
            <div className="mt-3 flex gap-2">
              <Button size="sm">Post comment</Button>
              <Link to="/analytics">
                <Button size="sm" variant="ghost">
                  View organizational impact
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="text-sm font-semibold text-foreground">Governance</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge tone="warning">Leadership approval required</Badge>
              <Badge tone="success">Evidence grounded</Badge>
              <Badge tone="success">Audit trail recorded</Badge>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Promoter AI never approves a plan. It prepares, explains and evidences the decision — leadership decides.
            </p>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-foreground">Audit trail</h2>
            <div className="mt-3 space-y-3">
              {audit.map((a) => (
                <div key={a.t} className="border-l border-border pl-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{a.t}</p>
                  <p className="mt-0.5 text-xs text-foreground">{a.e}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
