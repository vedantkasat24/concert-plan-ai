import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Send, Sparkles, ShieldCheck, Brain, Database } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card } from "@/components/kit";
import { suggestedPrompts } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Promoter AI — Enterprise AI Decision Intelligence | ABC Events" },
      {
        name: "description",
        content:
          "Promoter AI helps concert promoters build leadership-ready business plans using historical deal intelligence, codified leadership expertise and explainable AI.",
      },
      { property: "og:title", content: "Promoter AI — Enterprise AI Decision Intelligence" },
      {
        property: "og:description",
        content: "Institutionalizing senior negotiation expertise through explainable AI, with leadership always in control.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  { icon: Database, title: "Historical Deal Intelligence", body: "1,284 settled deals indexed with audited financials and similarity scoring." },
  { icon: Brain, title: "Codified Leadership Expertise", body: "48 principles captured from senior promoters and regional VP deal reviews." },
  { icon: ShieldCheck, title: "Human Governance", body: "Every recommendation is evidence-grounded and approved by leadership." },
];

function Home() {
  return (
    <AppShell>
      <div className="rise-in mx-auto max-w-4xl">
        <div
          className="rounded-3xl border border-border p-8 md:p-10"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <Badge tone="primary">
            <Sparkles className="h-3 w-3" /> Enterprise AI Decision Intelligence
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            ABC EVENTS <span className="text-primary">Promoter AI</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Institutionalizing senior negotiation expertise through explainable AI. Leadership always remains the final
            decision maker — Promoter AI augments human expertise, it never replaces it.
          </p>

          <div className="mt-9">
            <p className="font-display text-xl font-semibold text-foreground">Good morning, Vedant.</p>
            <p className="mt-1 text-sm text-muted-foreground">What business opportunity would you like to evaluate today?</p>
          </div>

          <Link to="/copilot" className="mt-5 block">
            <div className="surface-card flex items-center gap-3 p-4 transition-shadow duration-200 hover:shadow-[var(--shadow-panel)]">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <p className="flex-1 truncate text-sm text-muted-foreground">
                We have an opportunity to organize Prince XYZ&apos;s concert in Chicago…
              </p>
              <Button size="sm">
                <Send className="h-3.5 w-3.5" /> Ask Promoter AI
              </Button>
            </div>
          </Link>

          <div className="mt-5 flex flex-wrap gap-2">
            {suggestedPrompts.map((p) => (
              <Link key={p} to="/copilot">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-accent">
                  {p}
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="transition-shadow duration-200 hover:shadow-[var(--shadow-panel)]">
              <p.icon className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-sm font-semibold text-foreground">{p.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">The promoter journey, end to end</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Create plan → AI analyzes → evidence retrieved → recommendations → leadership approves.
              </p>
            </div>
            <Link to="/plans">
              <Button>Open business plan workspace</Button>
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px]">
            {[
              "Business Plan",
              "AI Analysis",
              "Historical Deals",
              "Leadership Expertise",
              "Business Rules",
              "Recommendations",
              "Plan Review",
              "Leadership Approval",
            ].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-accent-foreground">{s}</span>
                {i < 7 ? <span className="text-muted-foreground">›</span> : null}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
