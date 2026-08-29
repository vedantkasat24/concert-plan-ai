import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { Card, PageHeader, Stat } from "@/components/kit";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Adoption, Approval and Grounding KPIs | Promoter AI" },
      {
        name: "description",
        content: "Executive dashboard covering plans submitted, approval rate, revision cycles, leadership review time, grounded recommendations and promoter adoption.",
      },
      { property: "og:title", content: "Analytics — Promoter AI" },
      { property: "og:description", content: "How Promoter AI changes approval rates, revision cycles and leadership review time." },
    ],
  }),
  component: Analytics,
});

const cycleData = [
  { month: "Feb", cycles: 3.1, review: 6.4 },
  { month: "Mar", cycles: 2.8, review: 5.6 },
  { month: "Apr", cycles: 2.4, review: 4.8 },
  { month: "May", cycles: 2.1, review: 4.1 },
  { month: "Jun", cycles: 1.8, review: 3.4 },
  { month: "Jul", cycles: 1.6, review: 2.9 },
];

const approvalData = [
  { month: "Feb", rate: 61 },
  { month: "Mar", rate: 66 },
  { month: "Apr", rate: 72 },
  { month: "May", rate: 78 },
  { month: "Jun", rate: 83 },
  { month: "Jul", rate: 87 },
];

function Analytics() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Analytics"
        title="Organizational impact"
        description="How codified expertise and explainable AI change plan quality, decision speed and leadership agreement."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Plans submitted (FY26)" value="184" delta="+38% vs FY25" />
        <Stat label="Approval rate" value="87%" delta="+26 pts since rollout" />
        <Stat label="Revision cycles" value="1.6" delta="Down from 3.1" />
        <Stat label="Leadership review time" value="2.9 days" delta="Down from 6.4 days" />
        <Stat label="Grounded recommendations" value="96%" delta="Traced to settled deals" />
        <Stat label="Leadership agreement" value="87%" delta="AI vs final decision" />
        <Stat label="Promoter adoption" value="41 / 46" delta="North America" />
        <Stat label="Margin floor compliance" value="93%" delta="At submission" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm font-semibold text-foreground">Revision cycles &amp; leadership review time</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cycleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                    background: "var(--card)",
                  }}
                />
                <Line type="monotone" dataKey="cycles" stroke="var(--chart-1)" strokeWidth={2} dot={false} name="Revision cycles" />
                <Line type="monotone" dataKey="review" stroke="var(--chart-2)" strokeWidth={2} dot={false} name="Review days" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-foreground">Approval rate trend</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={approvalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--accent)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                    background: "var(--card)",
                  }}
                />
                <Bar dataKey="rate" fill="var(--chart-1)" radius={[6, 6, 0, 0]} name="Approval %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
