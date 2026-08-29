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
        content: "Describe an opportunity in plain language and Promoter AI retrieves comparable deals, applies leadership expertise and generates grounded recommendations.",
      },
      { property: "og:title", content: "Promoter AI Copilot" },
      { property: "og:description", content: "One natural-language request automatically invokes the right AI capabilities — no agent picking required." },
    ],
  }),
  component: Copilot;
});

function Copilot() {
  return null;
}
