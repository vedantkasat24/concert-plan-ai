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

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/plans", label: "Business Plans", icon: FileText },
  { to: "/copilot", label: "Promoter AI Copilot", icon: Bot },
  { to: "/deal-intelligence", label: "Deal Intelligence", icon: Database },
  { to: "/negotiation", label: "Negotiation Support", icon: Handshake },
  { to: "/plan-review", label: "Plan Review", icon: ClipboardCheck },
  { to: "/leadership-review", label: "Leadership Review", icon: Gavel },
  { to: "/knowledge", label: "Knowledge Center", icon: BookOpen },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = nav.find((n) => n.to === pathname)?.label ?? "Home";

  return (
    <div className="flex min-h-screen bg-background">
      <nav className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-display text-sm font-semibold text-primary-foreground">
            AI
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-sidebar-foreground">Promoter AI</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">ABC Events</p>
          </div>
        </div>
        <div className="flex-1 space-y-0.5 px-3">
          {nav.map((item) => {
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
                <item.icon className={cn("h-4 w-4", active && "text-primary")} />
                {item.label}
              </Link>
            );
          })}
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
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>

      <ReasoningPanel />
    </div>
  );
}
