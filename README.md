# Economic Intent Content Architecture — Microsite

Interactive single-page microsite presenting the Economic Intent content translation framework for Salesforce ISV partner marketing.

## What this is

A content strategy tool that reframes existing platform content around three economic decision pillars:

- **Revenue Expansion** — Will this create durable, compounding revenue?
- **Innovation at Enterprise Speed** — Can I ship fast without increasing risk or debt?
- **Strategic Credibility & Ecosystem Gravity** — Will this reduce friction internally and externally?

Each asset is translated through two editorial angles (Access Advantage / Expertise Advantage) using an Extract → Reframe → Repackage workflow.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui (Radix primitives)
- Framer Motion
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui primitives
│   └── MicrositeEconomicIntent.tsx  # Main microsite component
├── lib/utils.ts         # cn() utility
├── App.tsx
├── main.tsx
└── index.css            # Tailwind + theme tokens
```
