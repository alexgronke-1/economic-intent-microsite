import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Sparkles, Compass, ArrowRight, Filter } from "lucide-react";

/**
 * Microsite: Economic Intent Content Architecture
 * - Salesforce-adjacent styling (no restricted brand dependencies)
 * - Tokenized palette based on provided swatches
 * - Built as a single-page scroll experience
 */

const TOKENS = {
  cloud95: "#EAF5FE",
  cloud80: "#90D0FE",
  cloud68: "#00B3FF",
  electric50: "#066AFE",
  electric30: "#022AC0",
  electric15: "#001E5B",
};

function SalesforceCloudMark({ className = "" }: { className?: string }) {
  // Simple inline mark so this is self-contained. Replace with an approved SVG/image if you have one.
  return (
    <svg
      viewBox="0 0 220 120"
      className={className}
      role="img"
      aria-label="Cloud mark"
    >
      <path
        d="M70 92c-16 0-29-12-29-27 0-13 10-24 23-27 6-18 23-31 43-31 18 0 34 10 41 25 2-1 5-1 8-1 16 0 29 12 29 27 0 15-13 27-29 27H70z"
        fill={TOKENS.cloud68}
      />
      <text
        x="110"
        y="70"
        textAnchor="middle"
        fill="white"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        fontSize="34"
        fontWeight="600"
      >
        salesforce
      </text>
    </svg>
  );
}

const Section = ({
  id,
  kicker,
  title,
  subtitle,
  children,
}: {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-8">
        {kicker ? (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: TOKENS.electric50 }}
            />
            <span className="text-slate-700">{kicker}</span>
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-3xl text-base text-slate-600 md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  </section>
);

const PillarCard = ({
  icon,
  name,
  decision,
  focus,
  track,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  decision: string;
  focus: string[];
  track: string;
  color: string;
}) => (
  <Card className="h-full overflow-hidden">
    <div className="h-2" style={{ background: color }} />
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
            style={{ background: TOKENS.cloud95 }}
          >
            <span style={{ color }}>{icon}</span>
          </span>
          <CardTitle className="text-lg">{name}</CardTitle>
        </div>
        <Badge variant="secondary" className="rounded-full">
          {track}
        </Badge>
      </div>
      <CardDescription className="mt-2">
        <span className="font-medium text-slate-700">Decision pressure:</span>{" "}
        {decision}
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-sm font-medium text-slate-700">Narrative focus</div>
      <ul className="mt-2 space-y-2">
        {focus.map((f) => (
          <li key={f} className="flex gap-2 text-sm text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const AngleCard = ({
  title,
  tagline,
  bullets,
  accent,
}: {
  title: string;
  tagline: string;
  bullets: string[];
  accent: string;
}) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{tagline}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-2">
        {bullets.map((b) => (
          <div
            key={b}
            className="flex items-start gap-2 rounded-2xl border bg-white px-3 py-2"
          >
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ background: accent }}
            />
            <div className="text-sm text-slate-700">{b}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const FlowChip = ({
  label,
  detail,
  color,
}: {
  label: string;
  detail: string;
  color: string;
}) => (
  <div className="rounded-2xl border bg-white p-4">
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <div className="text-sm font-semibold text-slate-800">{label}</div>
    </div>
    <div className="mt-2 text-sm text-slate-600">{detail}</div>
  </div>
);

type Asset = {
  title: string;
  date: string;
  format: string;
  product: string;
  access: "Ungated" | "Gated";
  stage: "Awareness" | "Familiarity" | "Consideration";
  // Reframing
  pillar: "Revenue Expansion" | "Innovation at Enterprise Speed" | "Strategic Credibility & Ecosystem Gravity";
  angle: "Access Advantage" | "Expertise Advantage";
  newHeadline: string;
  extracted: string[];
  repositionedAs: string[];
};

export default function MicrositeEconomicIntent() {
  const [query, setQuery] = useState("");
  const [pillar, setPillar] = useState<string>("all");
  const [stage, setStage] = useState<string>("all");
  const [angle, setAngle] = useState<string>("all");

  const pillars = useMemo(
    () => [
      {
        name: "Revenue Expansion",
        decision: "Will this create durable, compounding revenue?",
        track: "Revenue Architecture",
        focus: [
          "Consumption design and deal structure durability",
          "Packaging + pricing as a revenue surface",
          "Agentforce credits that compound over time",
          "Commercialization that aligns partner success with platform growth",
        ],
        color: TOKENS.electric50,
        icon: <Sparkles className="h-5 w-5" />,
      },
      {
        name: "Innovation at Enterprise Speed",
        decision: "Can I ship fast without increasing risk or debt?",
        track: "AI-Native Build Path",
        focus: [
          "Inherited compliance + enterprise-grade scaffolding",
          "Auth/RBAC/billing rails embedded, not rebuilt",
          "Zero-copy integration and governance-aligned data",
          "GA stability translated into time-to-revenue confidence",
        ],
        color: TOKENS.electric30,
        icon: <Compass className="h-5 w-5" />,
      },
      {
        name: "Strategic Credibility & Ecosystem Gravity",
        decision: "Will this reduce friction internally and externally?",
        track: "Ecosystem Advantage",
        focus: [
          "Marketplace visibility + field alignment",
          "Trust shortcuts that change buying dynamics",
          "Enterprise clearance and legitimacy signals",
          "Proof that travels: stories, benchmarks, and renewal-grade ROI",
        ],
        color: TOKENS.electric15,
        icon: <CheckCircle2 className="h-5 w-5" />,
      },
    ],
    []
  );

  const angles = useMemo(
    () => [
      {
        title: "Access Advantage",
        tagline: "You can build an agent. What matters most is where your agent can go.",
        bullets: [
          "Enterprise-cleared surface for agents to land and act",
          "Real customer data + systems of record + compliance frameworks",
          "Distribution via marketplaces and field alignment",
        ],
        accent: TOKENS.cloud68,
      },
      {
        title: "Expertise Advantage",
        tagline: "The build is less expensive. Your expertise increased in value.",
        bullets: [
          "AI collapses build cost; domain knowledge becomes the moat",
          "Infrastructure inherited so teams focus on differentiated IP",
          "Gap between what you know and what you can ship just closed",
        ],
        accent: TOKENS.electric50,
      },
    ],
    []
  );

  const assets: Asset[] = useMemo(
    () => [
      {
        title: "Build on Salesforce",
        date: "Dec 2025",
        format: "Webpage",
        product: "Agentforce 360",
        access: "Ungated",
        stage: "Familiarity",
        pillar: "Innovation at Enterprise Speed",
        angle: "Expertise Advantage",
        newHeadline: "Ship enterprise-grade agents without rebuilding infrastructure.",
        extracted: ["Auth + RBAC scaffolding", "Billing rails", "Compliance-ready foundation"],
        repositionedAs: [
          "Engineering leverage reclaimed",
          "Faster path from prototype to commercial",
          "Risk reduced without slowing velocity",
        ],
      },
      {
        title: "Flexible pricing and full provisioning control.",
        date: "Dec 2025",
        format: "Video (Vidyard)",
        product: "Agentforce 360",
        access: "Ungated",
        stage: "Familiarity",
        pillar: "Revenue Expansion",
        angle: "Access Advantage",
        newHeadline: "Design deal structures that compound Agentforce consumption.",
        extracted: ["Flexible pricing", "Provisioning controls", "Packaging mechanics"],
        repositionedAs: [
          "Revenue architecture (not features)",
          "Durable consumption design",
          "Commercial structures that scale without friction",
        ],
      },
      {
        title: "Agentforce for ISVs is GA: What You Need to Know",
        date: "Oct 2025",
        format: "Blog",
        product: "Agentforce for ISVs",
        access: "Ungated",
        stage: "Consideration",
        pillar: "Innovation at Enterprise Speed",
        angle: "Access Advantage",
        newHeadline: "What GA unlocks for your time-to-revenue—and why it matters.",
        extracted: ["Stability + support signal", "Commercial readiness", "Enterprise-readiness framing"],
        repositionedAs: [
          "Reduced diligence friction",
          "Faster internal approvals",
          "Confidence to invest in a build path",
        ],
      },
      {
        title: "Litify Cracked the Code with Agentforce",
        date: "Oct 2025",
        format: "Blog / Partner Story",
        product: "Agentforce for ISVs",
        access: "Ungated",
        stage: "Consideration",
        pillar: "Strategic Credibility & Ecosystem Gravity",
        angle: "Access Advantage",
        newHeadline: "Proof that travels: how Litify accelerated trust and adoption with Agentforce.",
        extracted: ["Partner outcome narrative", "Adoption momentum", "Enterprise trust"],
        repositionedAs: [
          "Credibility that shortens cycles",
          "Signals that unlock field engagement",
          "Renewal-grade proof points",
        ],
      },
      {
        title: "Data 360 for ISVs is GA: Everything You Need to Know",
        date: "Dec 2025",
        format: "Blog",
        product: "Data 360 for ISVs",
        access: "Ungated",
        stage: "Consideration",
        pillar: "Strategic Credibility & Ecosystem Gravity",
        angle: "Expertise Advantage",
        newHeadline: "Build agents where the business actually lives—without adding governance risk.",
        extracted: ["Data governance", "Systems-of-record alignment", "Integration posture"],
        repositionedAs: [
          "Enterprise defensibility",
          "Reduced buyer skepticism",
          "Credibility through architecture choices",
        ],
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((a) => {
      const matchesQuery =
        !q ||
        [
          a.title,
          a.newHeadline,
          a.format,
          a.product,
          a.stage,
          a.pillar,
          a.angle,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesPillar = pillar === "all" || a.pillar === pillar;
      const matchesStage = stage === "all" || a.stage === stage;
      const matchesAngle = angle === "all" || a.angle === angle;
      return matchesQuery && matchesPillar && matchesStage && matchesAngle;
    });
  }, [assets, query, pillar, stage, angle]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(1200px 800px at 10% 5%, rgba(144,208,254,.55), transparent 60%), radial-gradient(1200px 800px at 90% 0%, rgba(0,179,255,.20), transparent 60%), linear-gradient(180deg, rgba(234,245,254,1) 0%, rgba(234,245,254,.55) 35%, rgba(255,255,255,1) 100%)",
      }}
    >
      {/* Top Nav */}
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <SalesforceCloudMark className="h-10 w-auto" />
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-slate-900">
                Economic Intent Microsite
              </div>
              <div className="text-xs text-slate-600">
                Content translation model for partner marketing
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {["framework", "angles", "translation", "examples", "inventory"].map(
              (id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded-full px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              )
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              className="rounded-full"
              style={{ background: TOKENS.electric50 }}
            >
              Share <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pt-14">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl"
            >
              Repackage existing platform content around the decisions partners need to defend.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg"
            >
              Instead of organizing by product and launch moments, we translate the same facts into
              economic intent: revenue expansion, enterprise speed, and credibility that compounds.
            </motion.p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full" style={{ background: TOKENS.cloud80, color: "#0b2a4a" }}>
                Same facts
              </Badge>
              <Badge className="rounded-full" style={{ background: TOKENS.cloud95, color: "#0b2a4a" }}>
                New headlines
              </Badge>
              <Badge className="rounded-full" style={{ background: TOKENS.cloud68, color: "white" }}>
                Decision-led
              </Badge>
              <Badge className="rounded-full" style={{ background: TOKENS.electric15, color: "white" }}>
                Defensible ROI
              </Badge>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                className="rounded-2xl"
                style={{ background: TOKENS.electric30 }}
                asChild
              >
                <a href="#framework">
                  View the framework <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button className="rounded-2xl" variant="outline" asChild>
                <a href="#examples">See reswizzle examples</a>
              </Button>
            </div>
          </div>
          <div className="md:col-span-5">
            <Card className="overflow-hidden">
              <div
                className="p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,179,255,.20), rgba(6,106,254,.10))",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{ background: TOKENS.cloud95 }}
                  >
                    <Sparkles className="h-5 w-5" style={{ color: TOKENS.electric50 }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">What you get</div>
                    <div className="text-xs text-slate-600">
                      A content translation system, not a new content backlog
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  <FlowChip
                    label="1) Extract"
                    detail="Pull the platform fact and the proof point."
                    color={TOKENS.cloud68}
                  />
                  <FlowChip
                    label="2) Reframe"
                    detail="Translate into decision leverage and economic stakes."
                    color={TOKENS.electric50}
                  />
                  <FlowChip
                    label="3) Repackage"
                    detail="Ship as headline-led narratives across surfaces."
                    color={TOKENS.electric30}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Framework */}
      <Section
        id="framework"
        kicker="Strategic model"
        title="The Economic Intent Content Architecture"
        subtitle="Three pillars organize every asset around the decisions partners are trying to make—regardless of role or title."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <PillarCard
              key={p.name}
              icon={p.icon}
              name={p.name}
              decision={p.decision}
              focus={p.focus}
              track={p.track}
              color={p.color}
            />
          ))}
        </div>
      </Section>

      {/* Angles */}
      <Section
        id="angles"
        kicker="Editorial entry"
        title="Two Ways In"
        subtitle="Every piece of content can enter through one of two narrative angles—so the story feels consistent across channels."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {angles.map((a) => (
            <AngleCard
              key={a.title}
              title={a.title}
              tagline={a.tagline}
              bullets={a.bullets}
              accent={a.accent}
            />
          ))}
        </div>
      </Section>

      {/* Translation */}
      <Section
        id="translation"
        kicker="How it works"
        title="The Content Translation Mechanism"
        subtitle="For every existing asset: extract the capability, reframe as decision leverage, and repackage with a headline built around stakes."
      >
        <Card className="overflow-hidden">
          <div className="grid gap-4 p-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl"
                  style={{ background: TOKENS.cloud95 }}
                >
                  <CheckCircle2 className="h-5 w-5" style={{ color: TOKENS.cloud68 }} />
                </span>
                <div className="text-sm font-semibold">Extract</div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Pull the strongest platform fact and any “proof” elements (benchmarks,
                stories, GA readiness signals).
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full">
                  Capability
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Proof point
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Constraint
                </Badge>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl"
                  style={{ background: TOKENS.cloud95 }}
                >
                  <Sparkles className="h-5 w-5" style={{ color: TOKENS.electric50 }} />
                </span>
                <div className="text-sm font-semibold">Reframe</div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Translate into economic stakes: revenue compounding, speed without risk,
                or credibility that shortens cycles.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full" style={{ background: TOKENS.cloud80, color: "#0b2a4a" }}>
                  Revenue
                </Badge>
                <Badge className="rounded-full" style={{ background: TOKENS.cloud68, color: "white" }}>
                  Speed
                </Badge>
                <Badge className="rounded-full" style={{ background: TOKENS.electric15, color: "white" }}>
                  Credibility
                </Badge>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl"
                  style={{ background: TOKENS.cloud95 }}
                >
                  <ArrowRight className="h-5 w-5" style={{ color: TOKENS.electric30 }} />
                </span>
                <div className="text-sm font-semibold">Repackage</div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Rewrite headlines around decision pressure, then adapt the same substance
                into multiple surfaces.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-full">
                  Hero article
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  Email nurture
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  Enablement
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Output principle</CardTitle>
              <CardDescription>
                One asset becomes multiple strategic surfaces—without inventing new facts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {["Hero narrative piece", "Executive blog", "Nurture sequence", "Sales enablement snippet", "Scorecard input / maturity checkpoint"].map(
                  (x) => (
                    <div key={x} className="flex items-center gap-2 text-sm text-slate-700">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: TOKENS.electric50 }}
                      />
                      {x}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">What changes</CardTitle>
              <CardDescription>
                The narrative architecture—so it aligns to economic intent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {["Headlines lead with stakes, not features", "Proof is positioned as risk compression", "Outcomes are framed as time-bound wins", "Agentforce feels like an operating system—not a product"].map(
                  (x) => (
                    <div key={x} className="flex items-center gap-2 text-sm text-slate-700">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: TOKENS.cloud68 }}
                      />
                      {x}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Examples */}
      <Section
        id="examples"
        kicker="Tactical proof"
        title="Before & After: Reswizzle Examples"
        subtitle="Real examples showing how existing assets translate into economic intent—same facts, new headlines."
      >
        <Accordion type="single" collapsible className="w-full">
          {assets.map((a) => (
            <AccordionItem key={a.title} value={a.title}>
              <AccordionTrigger>
                <div className="flex w-full flex-col items-start gap-1 text-left md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                    <div className="text-xs text-slate-600">
                      {a.date} • {a.format} • {a.product}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 md:mt-0 md:justify-end">
                    <Badge className="rounded-full" variant="secondary">
                      {a.stage}
                    </Badge>
                    <Badge
                      className="rounded-full"
                      style={{
                        background:
                          a.pillar === "Revenue Expansion"
                            ? TOKENS.cloud80
                            : a.pillar === "Innovation at Enterprise Speed"
                            ? TOKENS.cloud68
                            : TOKENS.electric15,
                        color:
                          a.pillar === "Strategic Credibility & Ecosystem Gravity"
                            ? "white"
                            : "#0b2a4a",
                      }}
                    >
                      {a.pillar}
                    </Badge>
                    <Badge variant="outline" className="rounded-full">
                      {a.angle}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 md:grid-cols-12">
                  <Card className="md:col-span-5">
                    <CardHeader>
                      <CardTitle className="text-sm">New headline</CardTitle>
                      <CardDescription>
                        Reframed to decision pressure and economic stakes.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="rounded-2xl p-4 text-sm font-semibold"
                        style={{ background: TOKENS.cloud95, color: TOKENS.electric15 }}
                      >
                        “{a.newHeadline}”
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-4">
                    <CardHeader>
                      <CardTitle className="text-sm">What we extract</CardTitle>
                      <CardDescription>Pull the platform facts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {a.extracted.map((x) => (
                          <li key={x} className="flex gap-2 text-sm text-slate-700">
                            <span
                              className="mt-2 h-2 w-2 rounded-full"
                              style={{ background: TOKENS.cloud68 }}
                            />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-3">
                    <CardHeader>
                      <CardTitle className="text-sm">What it becomes</CardTitle>
                      <CardDescription>Decision leverage.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {a.repositionedAs.map((x) => (
                          <li key={x} className="flex gap-2 text-sm text-slate-700">
                            <span
                              className="mt-2 h-2 w-2 rounded-full"
                              style={{ background: TOKENS.electric50 }}
                            />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Inventory (optional) */}
      <Section
        id="inventory"
        kicker="Working view"
        title="Content Inventory (Sample)"
        subtitle="Use this as a living view: filter by pillar, stage, and angle. Replace the sample list with your full spreadsheet export."
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-600" />
                <div className="text-sm font-semibold">Filters</div>
              </div>
              <div className="grid w-full gap-3 md:grid-cols-4">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles, products, headlines…"
                  className="rounded-2xl"
                />
                <Select value={pillar} onValueChange={setPillar}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Pillar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All pillars</SelectItem>
                    <SelectItem value="Revenue Expansion">Revenue Expansion</SelectItem>
                    <SelectItem value="Innovation at Enterprise Speed">
                      Innovation at Enterprise Speed
                    </SelectItem>
                    <SelectItem value="Strategic Credibility & Ecosystem Gravity">
                      Strategic Credibility & Ecosystem Gravity
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={stage} onValueChange={setStage}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All stages</SelectItem>
                    <SelectItem value="Awareness">Awareness</SelectItem>
                    <SelectItem value="Familiarity">Familiarity</SelectItem>
                    <SelectItem value="Consideration">Consideration</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={angle} onValueChange={setAngle}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Angle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All angles</SelectItem>
                    <SelectItem value="Access Advantage">Access Advantage</SelectItem>
                    <SelectItem value="Expertise Advantage">Expertise Advantage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid gap-3">
                {filtered.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-2xl border bg-white p-4"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                        <div className="text-xs text-slate-600">
                          {a.date} • {a.format} • {a.product} • {a.access}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="rounded-full">
                          {a.stage}
                        </Badge>
                        <Badge variant="outline" className="rounded-full">
                          {a.angle}
                        </Badge>
                        <Badge
                          className="rounded-full"
                          style={{
                            background:
                              a.pillar === "Revenue Expansion"
                                ? TOKENS.cloud80
                                : a.pillar === "Innovation at Enterprise Speed"
                                ? TOKENS.cloud68
                                : TOKENS.electric15,
                            color:
                              a.pillar === "Strategic Credibility & Ecosystem Gravity"
                                ? "white"
                                : "#0b2a4a",
                          }}
                        >
                          {a.pillar}
                        </Badge>
                      </div>
                    </div>
                    <div
                      className="mt-3 rounded-2xl p-3 text-sm"
                      style={{ background: TOKENS.cloud95, color: TOKENS.electric15 }}
                    >
                      <span className="font-semibold">Reswizzled headline:</span> {a.newHeadline}
                    </div>
                  </div>
                ))}

                {filtered.length === 0 ? (
                  <div className="rounded-2xl border bg-white p-6 text-sm text-slate-600">
                    No matches. Try clearing filters.
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Tabs defaultValue="notes">
            <TabsList className="rounded-2xl">
              <TabsTrigger value="notes">Implementation notes</TabsTrigger>
              <TabsTrigger value="data">How to load your spreadsheet</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">How to use this with stakeholders</CardTitle>
                  <CardDescription>
                    This section is designed to make the leverage visible and non-threatening.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {["Lead with: ‘we’re not discarding your content—we’re upgrading its organizing logic.’", "Show 3–5 before/after examples first, then reveal the full inventory mapping.", "Use the pillars as navigation and the angles as consistent storytelling entry points.", "Keep product detail, but only after decision pressure is established."].map(
                      (x) => (
                        <li key={x} className="flex gap-2">
                          <span
                            className="mt-2 h-2 w-2 rounded-full"
                            style={{ background: TOKENS.electric50 }}
                          />
                          {x}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="data" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Loading your full inventory</CardTitle>
                  <CardDescription>
                    Export the spreadsheet to CSV, then replace the sample <code>assets</code> array.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-700">
                    Recommended columns:
                    <div className="mt-2 grid gap-2 md:grid-cols-2">
                      {["title", "date", "format", "product", "gated", "stage", "pillar", "angle", "newHeadline", "extracted", "repositionedAs"].map(
                        (x) => (
                          <div key={x} className="rounded-2xl border bg-white px-3 py-2">
                            <code className="text-xs">{x}</code>
                          </div>
                        )
                      )}
                    </div>
                    <div className="mt-4 rounded-2xl border bg-white p-4 text-xs text-slate-600">
                      Tip: If you want, we can add a CSV upload flow (client-side only) to keep
                      everything self-contained for reviews.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-2xl"
                style={{ background: TOKENS.cloud95 }}
              />
              <div>
                <div className="text-sm font-semibold">Built for narrative leverage</div>
                <div className="text-xs text-slate-600">
                  Economic intent → consistent editorial → repackaged content
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" className="rounded-2xl" asChild>
                <a href="#framework">Back to top</a>
              </Button>
              <Button
                className="rounded-2xl"
                style={{ background: TOKENS.electric50 }}
              >
                Export notes
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
