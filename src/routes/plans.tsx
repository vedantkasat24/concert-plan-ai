import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Meter, PageHeader } from "@/components/kit";
import { businessPlans } from "@/lib/demo-data";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Business Plan Workspace — Promoter AI | ABC Events" },
      {
        name: "description",
        content: "Build concert business plans with artist, venue, guarantee and financial assumptions, validated live by Promoter AI.",
      },
      { property: "og:title", content: "Business Plan Workspace — Promoter AI" },
      { property: "og:description", content: "Draft, validate and improve concert business plans with AI assistance throughout." },
    ],
  }),
  component: Plans,
});

const fields = [
  { label: "Artist", value: "Prince XYZ" },
  { label: "Venue", value: "United Center" },
  { label: "City / Market", value: "Chicago, IL" },
  { label: "Event Date", value: "14 Nov 2026" },
  { label: "Capacity", value: "20,917" },
  { label: "Artist Guarantee", value: "$1,100,000" },
];

const assumptions = [
  { label: "Ticket Revenue", value: "$3,120,000", note: "Grounded in 3 comparable Chicago arena deals" },
  { label: "Ancillary Revenue", value: "$486,000", note: "18% above the Chicago market median" },
  { label: "Production Expense", value: "$742,000", note: "Within the arena benchmark band" },
  { label: "Marketing Budget", value: "$321,000", note: "10.3% of gross — breaches rule BR-14 (≤9%)" },
  { label: "Operations Cost", value: "$268,000", note: "Includes 9% Chicago staffing premium" },
  { label: "Projected Net Margin", value: "11.6%", note: "Below the 12% leadership margin floor" },
];

function statusTone(s: string) {
  if (s === "Approved") return "success" as const;
  if (s === "Revision Requested") return "warning" as const;
  if (s === "In Review") return "primary" as const;
  return "neutral" as const;
}

function Plans() {
  const [selected, setSelected] = useState(businessPlans[0]!.id);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Business Plans"
        title="Business Plan Workspace"
        description="Every assumption is checked against historical deals, leadership expertise and business rules as you type."
        actions={
          <>
            <Button variant="outline">
              <Plus className="h-3.5 w-3.5" /> New plan
            </Button>
            <Link to="/plan-review">
              <Button>Run plan review</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="space-y-2">
          {businessPlans.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                selected === p.id ? "border-primary/40 bg-accent/50 shadow-[var(--shadow-card)]" : "border-border bg-card hover:border-primary/25"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{p.artist}</p>
                <span className="text-[10px] text-muted-foreground">{p.id}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {p.venue} · {p.date}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                <span className="text-[11px] text-muted-foreground">Readiness {p.readiness}</span>
              </div>
              <div className="mt-2">
                <Meter value={p.readiness} tone={p.readiness > 80 ? "primary" : p.readiness > 60 ? "warning" : "danger"} />
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Plan details</h2>
              <Badge tone="primary">
                <Sparkles className="h-3 w-3" /> AI assisted
              </Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fields.map((f) => (
                <label key={f.label} className="block">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{f.label}</span>
                  <input
                    defaultValue={f.value}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20"
                  />
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-foreground">Revenue &amp; expense assumptions</h2>
            <div className="mt-4 space-y-2">
              {assumptions.map((a) => {
                const flagged = a.note.includes("breaches") || a.note.includes("Below") || a.note.includes("above");
                return (
                  <div
                    key={a.label}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background px-4 py-3 transition-colors hover:border-primary/30"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.label}</p>
                      <p className={`mt-0.5 text-[11px] ${flagged ? "text-warning-foreground" : "text-muted-foreground"}`}>{a.note}</p>
                    </div>
                    <p className="font-display text-sm font-semibold text-foreground">{a.value}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-foreground">Leadership notes</h2>
            <textarea
              rows={3}
              defaultValue="Chicago is a priority market for FY27. Keep guarantee disciplined — we walked from a similar Meridian ask last quarter and re-signed 8% lower."
              className="mt-3 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to="/plan-review">
                <Button>Validate plan</Button>
              </Link>
              <Link to="/deal-intelligence">
                <Button variant="outline">Find similar deals</Button>
              </Link>
              <Link to="/leadership-review">
                <Button variant="ghost">Submit for leadership review</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
