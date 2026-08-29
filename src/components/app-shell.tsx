import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Bot,
  ClipboardCheck,
  Database,
  FileText,
  Gavel,
  Handshake,
  Home,
  Search,
  Bell,
} from "lucide-react";
import { ReasoningPanel } from "@/components/reasoning-panel";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: null,
    items: [
      { to: "/", label: "Home", icon: Home, badge: null },
      { to: "/plans", label: "Business Plans", icon: FileText, badge: "3" },
    ],
  },
  {
    label: "AI Capabilities",
    items: [
      { to: "/copilot", label: "Promoter AI Copilot", icon: Bot, badge: null },
      { to: "/deal-intelligence", label: "Deal Intelligence", icon: Database, badge: null },
      { to: "/negotiation", label: "Negotiation Support", icon: Handshake, badge: null },
      { to: "/plan-review", label: "Plan Review", icon: ClipboardCheck, badge: null },
    ],
  },
  {
    label: "Governance",
    items: [
      { to: "/leadership-review", label: "Leadership Review", icon: Gavel, badge: "2" },
      { to: "/knowledge", label: "Knowledge Center", icon: BookOpen, badge: null },
      { to: "/analytics", label: "Analytics", icon: BarChart3, badge: null },
    ],
  },
] as const;

const allNav = navGroups.flatMap((g) => g.items);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = allNav.find((n) => n.to === pathname)?.label ?? "Home";

  return (
    <div className="flex min-h-screen bg-background">
      <nav className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-display text-sm font-semibold text-primary-foreground">
            AI
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-sidebar-foreground">PromoterAI</p>
            <p className="text-[11px] text-muted-foreground">ABC Events</p>
          </div>
        </div>
        <div className="flex-1 px-3 py-3">
          {navGroups.map((group, gi) => (
            <div key={group.label ?? `group-${gi}`} className={cn(gi > 0 && "mt-5")}>
              {group.label ? (
                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {group.label}
                </p>
              ) : null}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                      <span className="truncate">{item.label}</span>
                      {item.badge ? (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="m-3 rounded-xl border border-sidebar-border bg-card p-3">
          <p className="text-[11px] font-medium text-foreground">Vedant Kasat</p>
          <p className="text-[10px] text-muted-foreground">Promoter · North America</p>
        </div>
      </nav>


      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-card/85 px-6 py-3 backdrop-blur">
          <p className="text-[13px] font-medium text-foreground">{current}</p>
          <div className="ml-auto hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 lg:flex">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Search deals, plans, principles…</span>
          </div>
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-accent-foreground">
            VK
          </span>
        </header>
        <div className="flex gap-1.5 overflow-x-auto border-b border-border bg-card/60 px-4 py-2 md:hidden">
          {allNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                pathname === item.to
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <main className="flex-1 px-6 py-6">{children}</main>
      </div>

      <ReasoningPanel />
    </div>
  );
}
