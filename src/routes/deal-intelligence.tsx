import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, ConfidencePill, Meter, PageHeader, Stat } from "@/components/kit";
import { comparableDeals } from "@/lib/demo-data";

export const Route = createFileRoute("/deal-intelligence")({
  head: () => ({
    meta: [
      { title: "Deal Intelligence — Comparable Historical Deals | Promoter AI" },
      {
        name: "description",
        content: "Ranked comparable concert deals with similarity scores, guarantee benchmarks, attendance and margin evidence from settled ABC Events deals.",
      },
      { property: "og:title", content: "Deal Intelligence — Promoter AI" },
      { property: "og:description", content: "Every recommendation traced back to settled deals with audited financials." },
    ],
  }),
  component: DealIntelligence,
});

function DealIntelligence() {
  const [open, setOpen] = useState<string | null>("Coldplay");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Deal Intelligence"
        title="Comparable deals for Prince XYZ · Chicago"
        description="Similarity is weighted by market, capacity band, artist tier and recency. Only settled deals with audited financials are used."
        actions={
          <Link to="/plans">
            <Button>Apply benchmark to plan</Button>
          </Link>
        }
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <Stat label="Median guarantee" value="$955K" delta="Weighted by similarity" />
        <Stat label="Median attendance" value="14,090" delta="72% of capacity" />
        <Stat label="Median net margin" value="13.4%" delta="Above the 12% floor" />
        <Stat label="Comparables used" value="4" delta="All settled deals" />
      </div>

      <div className="space-y-2">
        {comparableDeals.map((d) => (
          <Card key={d.artist} className="p-0">
            <button onClick={() => setOpen(open === d.artist ? null : d.artist)} className="w-full p-5 text-left">
              <div className="flex flex-wrap items-center gap-4">
                <div className="min-w-[200px] flex-1">
                  <p className="text-sm font-semibold text-foreground">{d.artist}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {d.venue} · {d.city} · {d.date}
                  </p>
                </div>
                <div className="w-32">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Similarity</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Meter value={d.similarity} />
                    <span className="text-xs font-semibold text-foreground">{d.similarity}%</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Guarantee</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{d.guarantee}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Revenue</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{d.revenue}</p>
                </div>
                <ConfidencePill level={d.confidence} />
              </div>
            </button>
            {open === d.artist ? (
              <div className="rise-in grid gap-3 border-t border-border bg-accent/25 px-5 py-4 sm:grid-cols-4">
                {[
                  { k: "Capacity", v: d.capacity.toLocaleString() },
                  { k: "Attendance", v: d.attendance.toLocaleString() },
                  { k: "Net margin", v: d.margin },
                  { k: "Evidence", v: "Settled · audited" },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.k}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{s.v}</p>
                  </div>
                ))}
                <div className="sm:col-span-4 flex flex-wrap items-center gap-2 pt-1">
                  <Badge tone="success">Evidence grounded</Badge>
                  <Badge tone="primary">Used in guarantee benchmark</Badge>
                  <Button size="sm" variant="outline">
                    View full settlement
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
