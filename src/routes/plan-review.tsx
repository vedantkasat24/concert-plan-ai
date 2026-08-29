import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Meter, PageHeader } from "@/components/kit";

export const Route = createFileRoute("/plan-review")({
  head: () => ({
    meta: [
      { title: "Plan Review — Pre-Submission Validation | Promoter AI" },
      {
        name: "description",
        content: "AI validates revenue, guarantee, venue risk, business rules and missing information, producing a readiness score before leadership submission.",
      },
      { property: "og:title", content: "Plan Review — Promoter AI" },
      { property: "og:description", content: "Pass, warning and critical findings with a readiness score before leadership sees the plan." },
    ],
  }),
  component: PlanReview,
});

type Status = "Pass" | "Warning" | "Critical";

const checks: { area: string; status: Status; finding: string; evidence: string }[] = [
  { area: "Ticket revenue assumption", status: "Pass", finding: "Scaling matches 3 comparable Chicago arena deals.", evidence: "Coldplay · United Center 2024" },
  { area: "Ancillary revenue", status: "Warning", finding: "18% above the Chicago market median per head.", evidence: "4 settled Chicago comparables" },
  { area: "Artist guarantee", status: "Warning", finding: "$1.10M sits above the $955K similarity-weighted benchmark.", evidence: "Deal Intelligence benchmark" },
  { area: "Marketing budget", status: "Critical", finding: "10.3% of gross exceeds the 9% ceiling in rule BR-14.", evidence: "Business rule BR-14" },
  { area: "Venue risk", status: "Pass", finding: "United Center November availability and staffing confirmed.", evidence: "Venue operations record" },
  { area: "Net margin floor", status: "Warning", finding: "11.6% projected, below the 12% leadership floor.", evidence: "Leadership principle LP-03" },
  { area: "Completeness", status: "Pass", finding: "All required fields captured with a cited rationale.", evidence: "Leadership principle LP-11" },
];

const meta = {
  Pass: { tone: "success" as const, icon: CheckCircle2 },
  Warning: { tone: "warning" as const, icon: AlertTriangle },
  Critical: { tone: "danger" as const, icon: XCircle },
};

function PlanReview() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Plan Review"
        title="Pre-submission validation · BP-2041"
        description="Twelve automated checks across revenue, guarantee, venue risk, business rules and completeness."
        actions={
          <Link to="/leadership-review">
            <Button>Submit for leadership review</Button>
          </Link>
        }
      />

      <div className="mb-4 grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Readiness score</p>
          <p className="mt-2 font-display text-4xl font-semibold text-foreground">78</p>
          <div className="mt-3">
            <Meter value={78} tone="warning" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Resolving the marketing spend breach lifts readiness to <span className="font-medium text-primary">91</span>.
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge tone="success">3 pass</Badge>
            <Badge tone="warning">3 warnings</Badge>
            <Badge tone="danger">1 critical</Badge>
          </div>
        </Card>

        <div className="space-y-2">
          {checks.map((c) => {
            const M = meta[c.status];
            return (
              <div
                key={c.area}
                className="flex flex-wrap items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <M.icon
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    c.status === "Pass" ? "text-success" : c.status === "Warning" ? "text-warning" : "text-destructive"
                  }`}
                />
                <div className="min-w-[220px] flex-1">
                  <p className="text-sm font-medium text-foreground">{c.area}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.finding}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-wide text-primary">Evidence · {c.evidence}</p>
                </div>
                <Badge tone={M.tone}>{c.status}</Badge>
              </div>
            );
          })}
        </div>
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Resolve findings before submission</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Apply the AI recommendations to clear the critical finding and lift the plan above the margin floor.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/plans">
              <Button variant="outline">Improve guarantee</Button>
            </Link>
            <Button>Apply all recommendations</Button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
