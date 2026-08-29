export type Confidence = "High" | "Medium" | "Low";

export type ReasoningContext = {
  objective: string;
  activity: string;
  steps: string[];
  agents: { name: string; status: string; progress: number; confidence: Confidence }[];
  evidence: { label: string; type: string; detail: string }[];
  confidence: { level: Confidence; score: number; why: string };
  recommendations: { title: string; impact: string; rationale: string; confidence: Confidence }[];
  governance: string[];
  nextActions: string[];
};

const baseAgents = [
  { name: "Deal Calibration", status: "Complete", progress: 100, confidence: "High" as Confidence },
  { name: "Negotiation Support", status: "Running", progress: 72, confidence: "Medium" as Confidence },
  { name: "Communication Drafting", status: "Idle", progress: 0, confidence: "Medium" as Confidence },
  { name: "Plan Review", status: "Complete", progress: 100, confidence: "High" as Confidence },
  { name: "Expertise Signal", status: "Complete", progress: 100, confidence: "High" as Confidence },
];

const baseSteps = [
  "Understanding Request",
  "Reading Business Plan",
  "Retrieving Historical Deals",
  "Reading Leadership Knowledge",
  "Applying Business Rules",
  "Evaluating Financial Assumptions",
  "Assessing Risk",
  "Generating Recommendations",
];

export const reasoningByRoute: Record<string, ReasoningContext> = {
  "/": {
    objective: "Awaiting Business Opportunity",
    activity: "Listening for promoter intent",
    steps: baseSteps,
    agents: baseAgents.map((a) => ({ ...a, status: "Standby", progress: 0 })),
    evidence: [
      { label: "1,284 historical deals indexed", type: "Deal Repository", detail: "2016–2026 ABC Events North America tours, arena and amphitheatre inventory." },
      { label: "48 codified leadership principles", type: "Leadership Expertise", detail: "Captured from 12 senior promoters and regional VP deal reviews." },
      { label: "36 active business rules", type: "Business Rules", detail: "Guarantee ceilings, margin floors, marketing spend ratios, venue risk gates." },
    ],
    confidence: { level: "High", score: 92, why: "Knowledge base is fully synced and grounded on verified settlement data through Q2 2026." },
    recommendations: [
      { title: "Start with Prince XYZ · Chicago opportunity", impact: "Fastest path to a leadership-ready plan", rationale: "3 highly comparable Chicago arena deals available with settled financials.", confidence: "High" },
    ],
    governance: ["Evidence Grounded", "Human Review Required"],
    nextActions: ["Generate Business Plan", "Find Similar Deals"],
  },
  "/plans": {
    objective: "Preparing Business Plan",
    activity: "Validating revenue and expense assumptions against comparable deals",
    steps: baseSteps,
    agents: baseAgents,
    evidence: [
      { label: "Coldplay · United Center 2024", type: "Historical Deal", detail: "Guarantee $1.35M · Attendance 18,240 · Net margin 14.8% · Settled." },
      { label: "Imagine Dragons · Allstate Arena 2025", type: "Historical Deal", detail: "Guarantee $780K · Attendance 12,900 · Net margin 11.2% · Settled." },
      { label: "Principle: Protect the 12% margin floor", type: "Leadership Expertise", detail: "Regional VP guidance — never submit a plan below a 12% projected net margin without a strategic rationale." },
      { label: "Rule BR-14 · Marketing spend ceiling", type: "Business Rule", detail: "Marketing budget must remain ≤ 9% of projected gross ticket revenue." },
    ],
    confidence: { level: "Medium", score: 74, why: "Ticket scaling is grounded in 3 close comparables, but the ancillary revenue assumption is 18% above the Chicago market median." },
    recommendations: [
      { title: "Reduce guarantee from $1.10M to $980K", impact: "+2.4 pts projected net margin", rationale: "Median guarantee for comparable Chicago arena deals at this capacity is $955K.", confidence: "High" },
      { title: "Re-scale VIP tier from $395 to $349", impact: "+640 projected paid attendance", rationale: "VIP sell-through stalled at 61% in the two most recent Chicago comparables at $395.", confidence: "Medium" },
      { title: "Trim marketing spend to 8.5% of gross", impact: "Clears Business Rule BR-14", rationale: "Current plan is at 10.3%, breaching the marketing spend ceiling.", confidence: "High" },
    ],
    governance: ["Business Rule Breach Detected", "Leadership Approval Required", "Evidence Grounded"],
    nextActions: ["Apply Guarantee Recommendation", "Run Plan Review"],
  },
  "/copilot": {
    objective: "Analyzing Deal Opportunity",
    activity: "Synthesizing comparable deals and leadership expertise into a draft plan",
    steps: baseSteps,
    agents: baseAgents,
    evidence: [
      { label: "3 comparable Chicago arena deals", type: "Comparable Venues", detail: "United Center, Allstate Arena, Wintrust Arena — 2024–2026 settlements." },
      { label: "Artist tier match: Stadium/Arena A-tier", type: "Comparable Artists", detail: "Prince XYZ mapped to the A-tier arena cohort by draw and merch index." },
      { label: "Principle: Anchor first, concede on ancillaries", type: "Leadership Expertise", detail: "Open below median guarantee and trade production or marketing support instead." },
    ],
    confidence: { level: "High", score: 88, why: "Three settled comparables within the same market, capacity band, and 24-month window." },
    recommendations: [
      { title: "Open at a $920K guarantee", impact: "Preserves 15.6% projected margin", rationale: "Leaves $60K of negotiation headroom below the $980K walk-up point.", confidence: "High" },
      { title: "Model a Thursday date instead of Sunday", impact: "-$42K venue and staffing cost", rationale: "Chicago Sunday arena dates carry a 9% staffing premium in the last 8 settlements.", confidence: "Medium" },
    ],
    governance: ["Evidence Grounded", "Human Review Required"],
    nextActions: ["Generate Business Plan", "Review Negotiation"],
  },
  "/deal-intelligence": {
    objective: "Retrieving Deal Intelligence",
    activity: "Ranking historical deals by similarity to the Prince XYZ · Chicago opportunity",
    steps: baseSteps,
    agents: baseAgents,
    evidence: [
      { label: "Similarity model v4.2", type: "Business Rule", detail: "Weights market (30%), capacity (25%), artist tier (25%), recency (20%)." },
      { label: "4 settled comparables retrieved", type: "Historical Deal", detail: "All within 24 months and the 10K–20K capacity band." },
    ],
    confidence: { level: "High", score: 91, why: "All retrieved comparables are settled deals with audited financials — no modelled estimates used." },
    recommendations: [
      { title: "Benchmark guarantee at $955K median", impact: "Aligns plan with market reality", rationale: "Median of the four retrieved comparables, weighted by similarity score.", confidence: "High" },
    ],
    governance: ["Evidence Grounded"],
    nextActions: ["Apply Benchmark to Plan", "Review Negotiation"],
  },
  "/negotiation": {
    objective: "Evaluating Counter Offer",
    activity: "Assessing counterparty behaviour and drafting a negotiation strategy",
    steps: baseSteps,
    agents: baseAgents.map((a) => (a.name === "Negotiation Support" ? { ...a, status: "Running", progress: 88 } : a)),
    evidence: [
      { label: "Counterparty: Meridian Artist Group", type: "Historical Deal", detail: "6 prior deals — settles 4.8% below opening ask on average, never walks before round 3." },
      { label: "Principle: Never concede guarantee and marketing together", type: "Leadership Expertise", detail: "Trade one lever per round to preserve negotiating capital." },
      { label: "Rule BR-07 · Guarantee ceiling", type: "Business Rule", detail: "Guarantee must not exceed 68% of projected gross ticket revenue." },
    ],
    confidence: { level: "Medium", score: 69, why: "Counterparty pattern is strong, but the $1.25M counter sits 12% above every retrieved comparable." },
    recommendations: [
      { title: "Counter at $1.02M with tiered bonus at 90% sell-through", impact: "Caps downside, shares upside", rationale: "Meridian accepted bonus-structured terms in 4 of 6 prior deals.", confidence: "High" },
      { title: "Hold marketing support at $180K", impact: "Protects BR-14 compliance", rationale: "Conceding marketing this round breaches the spend ceiling.", confidence: "High" },
    ],
    governance: ["Human Review Required", "Leadership Approval Required"],
    nextActions: ["Approve Counter Strategy", "Draft Artist Communication"],
  },
  "/plan-review": {
    objective: "Pre-Submission Plan Review",
    activity: "Validating the plan against business rules and completeness checks",
    steps: baseSteps,
    agents: baseAgents,
    evidence: [
      { label: "12 validation checks executed", type: "Business Rule", detail: "Revenue, guarantee, venue risk, completeness, and margin gates." },
      { label: "Principle: No submission with open assumptions", type: "Leadership Expertise", detail: "Every financial assumption must cite a comparable or an explicit promoter rationale." },
    ],
    confidence: { level: "Medium", score: 78, why: "Two warnings and one critical finding remain open; the rest of the plan is fully grounded." },
    recommendations: [
      { title: "Resolve the marketing spend breach", impact: "Readiness score 78 → 91", rationale: "The only critical finding blocking leadership submission.", confidence: "High" },
    ],
    governance: ["Critical Finding Open", "Leadership Approval Required"],
    nextActions: ["Improve Guarantee", "Submit for Leadership Review"],
  },
  "/leadership-review": {
    objective: "Leadership Review",
    activity: "Presenting the executive summary with grounded evidence and audit trail",
    steps: baseSteps,
    agents: baseAgents,
    evidence: [
      { label: "Every figure traced to a settled deal", type: "Historical Deal", detail: "4 comparables cited across guarantee, attendance, and ancillary assumptions." },
      { label: "3 leadership principles applied", type: "Leadership Expertise", detail: "Margin floor, anchor-first negotiation, no open assumptions." },
    ],
    confidence: { level: "High", score: 86, why: "Plan is fully grounded, all critical findings resolved, and margin sits above the 12% floor." },
    recommendations: [
      { title: "Approve with guarantee cap at $1.02M", impact: "Protects 14.1% projected net margin", rationale: "Matches the AI-calibrated walk-up point and the counterparty settlement pattern.", confidence: "High" },
    ],
    governance: ["Leadership Approval Required", "Evidence Grounded", "Audit Trail Recorded"],
    nextActions: ["Approve Plan", "Request Revision"],
  },
  "/knowledge": {
    objective: "Curating Organizational Knowledge",
    activity: "Indexing new settlements and leadership feedback signals",
    steps: baseSteps,
    agents: baseAgents,
    evidence: [
      { label: "9 knowledge updates this week", type: "Leadership Expertise", detail: "6 settled deals ingested, 2 principles revised, 1 business rule updated." },
      { label: "Feedback loop active", type: "Business Rule", detail: "Leadership decisions feed back into calibration weights within 24 hours." },
    ],
    confidence: { level: "High", score: 94, why: "All knowledge entries carry a named owner, source deal, and review date." },
    recommendations: [
      { title: "Review the revised Chicago staffing premium", impact: "Improves cost accuracy for 14 open plans", rationale: "Updated from 6% to 9% based on the last 8 settlements.", confidence: "High" },
    ],
    governance: ["Human Review Required", "Evidence Grounded"],
    nextActions: ["Review Knowledge Update", "Search Deal Repository"],
  },
  "/analytics": {
    objective: "Measuring Organizational Impact",
    activity: "Aggregating adoption, approval, and grounding metrics",
    steps: baseSteps,
    agents: baseAgents,
    evidence: [
      { label: "184 plans submitted in FY26", type: "Historical Deal", detail: "Across 6 regions and 41 promoters." },
      { label: "Leadership agreement tracked per decision", type: "Business Rule", detail: "Compares the AI recommendation to the final leadership decision." },
    ],
    confidence: { level: "High", score: 90, why: "Metrics are computed from system-of-record decisions, not self-reported inputs." },
    recommendations: [
      { title: "Expand rollout to the EMEA promoter group", impact: "Projected 21% cycle-time reduction", rationale: "North America revision cycles fell from 3.1 to 1.6 after adoption.", confidence: "Medium" },
    ],
    governance: ["Evidence Grounded"],
    nextActions: ["Export Executive Summary", "Review Adoption Detail"],
  },
};

export const comparableDeals = [
  { artist: "Coldplay", venue: "United Center", city: "Chicago, IL", date: "Jul 2024", similarity: 94, capacity: 20917, attendance: 18240, guarantee: "$1.35M", revenue: "$3.42M", margin: "14.8%", confidence: "High" as Confidence },
  { artist: "Imagine Dragons", venue: "Allstate Arena", city: "Rosemont, IL", date: "Mar 2025", similarity: 89, capacity: 18500, attendance: 12900, guarantee: "$780K", revenue: "$1.98M", margin: "11.2%", confidence: "High" as Confidence },
  { artist: "Taylor Swift", venue: "Soldier Field", city: "Chicago, IL", date: "Jun 2024", similarity: 71, capacity: 61500, attendance: 58900, guarantee: "$4.80M", revenue: "$12.6M", margin: "18.4%", confidence: "Medium" as Confidence },
  { artist: "Prince XYZ", venue: "Wintrust Arena", city: "Chicago, IL", date: "Nov 2025", similarity: 86, capacity: 10387, attendance: 9120, guarantee: "$610K", revenue: "$1.44M", margin: "12.9%", confidence: "High" as Confidence },
];

export const businessPlans = [
  { id: "BP-2041", artist: "Prince XYZ", venue: "United Center", city: "Chicago, IL", date: "14 Nov 2026", status: "In Review", readiness: 78, guarantee: "$1.10M" },
  { id: "BP-2038", artist: "Coldplay", venue: "MetLife Stadium", city: "East Rutherford, NJ", date: "02 Aug 2026", status: "Approved", readiness: 96, guarantee: "$3.20M" },
  { id: "BP-2035", artist: "Imagine Dragons", venue: "Moody Center", city: "Austin, TX", date: "19 Sep 2026", status: "Revision Requested", readiness: 64, guarantee: "$840K" },
  { id: "BP-2031", artist: "Taylor Swift", venue: "Levi's Stadium", city: "Santa Clara, CA", date: "11 Oct 2026", status: "Draft", readiness: 41, guarantee: "$5.10M" },
];

export const suggestedPrompts = [
  "Estimate Concert Budget",
  "Create Business Plan",
  "Find Similar Deals",
  "Analyze Counter Offer",
  "Review Existing Plan",
  "Estimate Artist Guarantee",
  "Generate Executive Summary",
  "Draft Leadership Note",
  "Draft Artist Communication",
];
