# Active Context: Next.js Starter Template

## Current State

**Project Status**: ✅ Callix AI — SaaS landing page built and deployed

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Callix AI — full SaaS landing page (voice receptionist, <$0.09/min)
  - Navbar (sticky, scroll-aware, mobile hamburger)
  - Hero with interactive call simulation demo + wave visualizer
  - Features (6-card grid: voice quality, latency, intake, scheduling, routing, analytics)
  - How It Works (4-step process)
  - Testimonials (masonry grid, 6 reviews)
  - Pricing (3 tiers + cost comparison bar chart)
  - CTA (email capture form)
  - Footer (4-column links, social, compliance badges)
  - Dark theme: #080810 bg, brand-purple/sky-blue gradient system, glow effects, grid-bg
- [x] Add more recipes (auth, email, testing)
  - `.kilocode/recipes/add-auth.md` — NextAuth.js v5 authentication
  - `.kilocode/recipes/add-email.md` — Resend transactional email
  - `.kilocode/recipes/add-testing.md` — Vitest + React Testing Library
- [x] Add example UI components
  - `src/components/ui/Button.tsx` — Variants: primary, secondary, ghost, danger; sizes: sm, md, lg
  - `src/components/ui/Card.tsx` — With optional hover glow and border effects
  - `src/components/ui/Badge.tsx` — Variants: default, success, warning, danger, info
  - `src/components/ui/Input.tsx` — With optional label and error state

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/components/` | Landing page sections | ✅ Ready |
| `src/components/ui/` | Reusable UI components (Button, Card, Badge, Input) | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The template is ready. Next steps depend on user requirements:

1. What type of application to build
2. What features are needed
3. Design/branding preferences

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |
| Add Auth | `.kilocode/recipes/add-auth.md` | Authentication with NextAuth.js v5 |
| Add Email | `.kilocode/recipes/add-email.md` | Transactional email with Resend |
| Add Testing | `.kilocode/recipes/add-testing.md` | Unit/component testing with Vitest |

## Pending Improvements

None — all initial pending items have been completed.

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-03-22 | Built Callix AI SaaS landing page — full 8-section marketing site for AI voice receptionist product |
| 2026-04-23 | Added 3 new recipes (auth, email, testing) + 4 example UI components (Button, Card, Badge, Input) |
