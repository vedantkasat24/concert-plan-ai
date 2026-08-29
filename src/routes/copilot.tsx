import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, PageHeader } from "@/components/kit";
import { suggestedPrompts } from "@/lib/demo-data";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "Promoter AI Copilot — Natural Language Deal Analysis | ABC Events" },
      {
        name: "description",
        content:
          "Describe an opportunity in plain language and Promoter AI retrieves comparable deals, applies leadership expertise and generates grounded recommendations.",
      },
      { property: "og:title", content: "Promoter AI Copilot" },
      {
        property: "og:description",
        content: "One natural-language request automatically invokes the right AI capabilities — no agent picking required.",
      },
    ],
  }),
  component: Copilot,
});

const invoked = [
  "Read the business plan",
  "Retrieved 4 comparable deals",
  "Loaded historical settlement evidence",
  "Applied 3 leadership principles",
  "Validated 12 business rules",
  "Evaluated venue and financial risk",
  "Generated prioritized recommendations",
];

function Copilot() {
  const [draft, setDraft] = useState("");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Promoter AI Copilot"
        title="Ask in plain language. The right capabilities run automatically."
        description="You never choose an AI agent. Promoter AI interprets intent, selects capabilities, and shows its work in the reasoning panel."
      />

      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex justify-end">
          <div className="max-w-xl rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
            We have an opportunity to organize Prince XYZ&apos;s concert in Chicago.
          </div>
          <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
          </span>
        </div>

        <div className="flex gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </span>
          <Card className="rise-in flex-1 rounded-tl-sm">
            <p className="text-sm leading-relaxed text-foreground">
              I analyzed this opportunity against the Chicago arena market. A November arena date for an A-tier artist is
              viable, but the guarantee you are considering is above what comparable settled deals support.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                { k: "Calibrated guarantee", v: "$920K – $980K" },
                { k: "Projected net margin", v: "15.6%" },
                { k: "Grounding", v: "4 settled deals" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg bg-accent/60 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-accent-foreground/70">{s.k}</p>
                  <p className="mt-0.5 font-display text-sm font-semibold text-accent-foreground">{s.v}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Capabilities invoked automatically
            </p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {invoked.map((i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/plans">
                <Button size="sm">Generate business plan</Button>
              </Link>
              <Link to="/deal-intelligence">
                <Button size="sm" variant="outline">
                  View comparable deals
                </Button>
              </Link>
              <Link to="/negotiation">
                <Button size="sm" variant="ghost">
                  Review negotiation
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
              <Badge tone="success">Evidence grounded</Badge>
              <Badge tone="warning">Human review required</Badge>
            </div>
          </Card>
        </div>

        <Card className="sticky bottom-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask Promoter AI about a deal, a plan, or a counter offer…"
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <Button size="sm">
              <Send className="h-3.5 w-3.5" /> Send
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {suggestedPrompts.slice(0, 5).map((p) => (
              <button
                key={p}
                onClick={() => setDraft(p)}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
              >
                {p}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
