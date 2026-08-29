import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, PageHeader } from "@/components/kit";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Center — Deals, Expertise and Business Rules | Promoter AI" },
      {
        name: "description",
        content: "Search the historical deal repository, codified leadership expertise, business rules, knowledge updates and feedback signals powering Promoter AI.",
      },
      { property: "og:title", content: "Knowledge Center — Promoter AI" },
      { property: "og:description", content: "The grounded knowledge base behind every AI recommendation, with named owners and review dates." },
    ],
  }),
  component: Knowledge,
});

const tabs = ["Historical Deals", "Leadership Expertise", "Business Rules", "Knowledge Updates", "Feedback Signals"] as const;

const content: Record<string, { title: string; body: string; meta: string; tag: string }[]> = {
  "Historical Deals": [
    { title: "Coldplay · United Center · Jul 2024", body: "Guarantee $1.35M, attendance 18,240, net margin 14.8%. Settled and audited.", meta: "Owner: Chicago regional desk", tag: "Settled" },
    { title: "Prince XYZ · Wintrust Arena · Nov 2025", body: "Guarantee $610K, attendance 9,120, net margin 12.9%. Strong merch index.", meta: "Owner: Chicago regional desk", tag: "Settled" },
    { title: "Imagine Dragons · Allstate Arena · Mar 2025", body: "Guarantee $780K, attendance 12,900, net margin 11.2%. Below margin floor.", meta: "Owner: Midwest desk", tag: "Settled" },
  ],
  "Leadership Expertise": [
    { title: "LP-03 · Protect the 12% margin floor", body: "Never submit a plan below 12% projected net margin without an explicit strategic rationale.", meta: "Source: Regional VP deal reviews 2024–2026", tag: "Principle" },
    { title: "LP-07 · Anchor first, concede on ancillaries", body: "Open below the median guarantee and trade production or marketing support instead of guarantee.", meta: "Source: 12 senior promoters", tag: "Principle" },
    { title: "LP-11 · No submission with open assumptions", body: "Every financial assumption must cite a comparable deal or a written promoter rationale.", meta: "Source: Leadership review board", tag: "Principle" },
  ],
  "Business Rules": [
    { title: "BR-07 · Guarantee ceiling", body: "Guarantee must not exceed 68% of projected gross ticket revenue.", meta: "Last reviewed 04 Jul 2026", tag: "Active" },
    { title: "BR-14 · Marketing spend ceiling", body: "Marketing budget must remain at or below 9% of projected gross ticket revenue.", meta: "Last reviewed 21 Jun 2026", tag: "Active" },
    { title: "BR-22 · Venue risk gate", body: "Arena dates within 21 days of a competing A-tier event require leadership sign-off.", meta: "Last reviewed 12 May 2026", tag: "Active" },
  ],
  "Knowledge Updates": [
    { title: "Chicago staffing premium revised 6% → 9%", body: "Updated from the last eight Chicago arena settlements. Affects 14 open plans.", meta: "Ingested 26 Aug 2026", tag: "Updated" },
    { title: "6 settlements ingested this week", body: "Arena and amphitheatre deals across Midwest and West regions.", meta: "Ingested 24 Aug 2026", tag: "New" },
  ],
  "Feedback Signals": [
    { title: "Leadership agreed with guarantee calibration in 87% of decisions", body: "Calibration weights adjusted upward for recency in the Chicago market.", meta: "Rolling 90 days", tag: "Signal" },
    { title: "Ancillary revenue estimates trend optimistic", body: "Promoters override the AI ancillary estimate upward in 31% of plans; leadership reverses 2 of 3.", meta: "Rolling 90 days", tag: "Signal" },
  ],
};

function Knowledge() {
  const [tab, setTab] = useState<string>(tabs[0]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Knowledge Center"
        title="The grounded knowledge behind every recommendation"
        description="Historical deals, codified leadership expertise, business rules and the feedback loop that keeps them current."
        actions={<Button variant="outline">Propose knowledge update</Button>}
      />

      <Card className="mb-4 flex items-center gap-3 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search deals, principles, rules…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <Badge tone="primary">1,284 deals · 48 principles · 36 rules</Badge>
      </Card>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              tab === t
                ? "border-primary/30 bg-primary-soft text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {(content[tab] ?? []).map((c) => (
          <Card key={c.title} className="rise-in transition-shadow duration-200 hover:shadow-[var(--shadow-panel)]">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">{c.title}</h2>
              <Badge tone="primary">{c.tag}</Badge>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-foreground">{c.meta}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
