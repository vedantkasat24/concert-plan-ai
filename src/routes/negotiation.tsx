import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, PageHeader, Stat } from "@/components/kit";

export const Route = createFileRoute("/negotiation")({
  head: () => ({
    meta: [
      { title: "Negotiation Support — Counter Offer Analysis | Promoter AI" },
      {
        name: "description",
        content: "Analyze counter offers with counterparty behaviour history, negotiation strategy suggestions and mandatory human approval before any response is sent.",
      },
      { property: "og:title", content: "Negotiation Support — Promoter AI" },
      { property: "og:description", content: "AI-suggested negotiation strategy, fully editable and approved by a human before use." },
    ],
  }),
  component: Negotiation,
});

const history = [
  { round: "Round 1", who: "ABC Events", detail: "Opened at $920K guarantee plus $180K marketing support.", date: "12 Aug 2026" },
  { round: "Round 2", who: "Meridian Artist Group", detail: "Countered at $1.25M guarantee, requested production upgrade.", date: "18 Aug 2026" },
  { round: "Round 3", who: "Promoter AI", detail: "Recommends $1.02M with a 90% sell-through bonus tier.", date: "Draft" },
];

function Negotiation() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Negotiation Support"
        title="Counter offer analysis · Meridian Artist Group"
        description="Promoter AI reads the negotiation history and counterparty behaviour, then proposes a strategy you can edit before approving."
        actions={<Button variant="outline">Draft artist communication</Button>}
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <Stat label="Counter offer" value="$1.25M" delta="12% above every comparable" />
        <Stat label="Recommended counter" value="$1.02M" delta="Within BR-07 guarantee ceiling" />
        <Stat label="Walk-up point" value="$1.08M" delta="Margin floor breached beyond this" />
        <Stat label="Prior deals with counterparty" value="6" delta="Settles 4.8% below opening ask" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm font-semibold text-foreground">Negotiation history</h2>
          <div className="mt-4 space-y-4">
            {history.map((h) => (
              <div key={h.round} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span className="mt-1 w-px flex-1 bg-border" />
                </div>
                <div className="pb-1">
                  <p className="text-xs font-semibold text-foreground">
                    {h.round} · {h.who}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{h.detail}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{h.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Counterparty behaviour</h2>
            <Badge tone="primary">Learned from 6 settled deals</Badge>
          </div>
          <ul className="mt-4 space-y-2.5">
            {[
              "Never walks away before round 3 — time pressure is low risk.",
              "Accepted bonus-structured terms in 4 of 6 prior deals.",
              "Responds better to production concessions than marketing concessions.",
              "Average settlement lands 4.8% below their opening ask.",
            ].map((b) => (
              <li key={b} className="flex gap-2 rounded-lg bg-accent/40 px-3 py-2.5 text-xs text-accent-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-foreground">Suggested negotiation strategy · editable</h2>
          <Badge tone="warning">Human approval required</Badge>
        </div>
        <textarea
          rows={6}
          defaultValue={`Counter at a $1.02M guarantee with a performance bonus of $60K triggered at 90% paid sell-through.

Hold marketing support at $180K this round — conceding both guarantee and marketing together breaches business rule BR-14 and removes our lever for round 4.

If Meridian holds above $1.10M, offer a production upgrade of up to $45K instead of guarantee movement. Our walk-up point is $1.08M, beyond which projected net margin falls below the 12% leadership floor.`}
          className="mt-3 w-full resize-none rounded-lg border border-input bg-background px-3 py-3 text-sm leading-relaxed text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button>Approve strategy</Button>
          <Button variant="outline">Regenerate with AI</Button>
          <Link to="/plan-review">
            <Button variant="ghost">Send plan to review</Button>
          </Link>
        </div>
      </Card>
    </AppShell>
  );
}
