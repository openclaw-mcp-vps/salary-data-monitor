# Build Task: salary-data-monitor

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: salary-data-monitor
HEADLINE: Monitor what Equifax sells about your salary
WHAT: None
WHY: None
WHO PAYS: None
NICHE: privacy-tools
PRICE: $$9/mo

ARCHITECTURE SPEC:
A Next.js web app that monitors Equifax's Work Number database for salary data exposure by automating periodic checks and alerting users when their employment/salary information appears in data broker reports. Users authenticate, provide employment details, and receive notifications when their data is found being sold.

PLANNED FILES:
- app/page.tsx
- app/dashboard/page.tsx
- app/api/auth/[...nextauth]/route.ts
- app/api/monitor/route.ts
- app/api/webhooks/lemonsqueezy/route.ts
- components/MonitorSetup.tsx
- components/AlertsList.tsx
- components/PricingCard.tsx
- lib/equifax-monitor.ts
- lib/email-alerts.ts
- lib/lemonsqueezy.ts
- lib/db.ts

DEPENDENCIES: next, tailwindcss, next-auth, prisma, @prisma/client, resend, @lemonsqueezy/lemonsqueezy.js, cheerio, puppeteer, cron, zod

REQUIREMENTS:
- Next.js 15 with App Router (app/ directory)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (npx shadcn@latest init, then add needed components)
- Dark theme ONLY — background #0d1117, no light mode
- Lemon Squeezy checkout overlay for payments
- Landing page that converts: hero, problem, solution, pricing, FAQ
- The actual tool/feature behind a paywall (cookie-based access after purchase)
- Mobile responsive
- SEO meta tags, Open Graph tags
- /api/health endpoint that returns {"status":"ok"}

ENVIRONMENT VARIABLES (create .env.example):
- NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID
- NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID
- LEMON_SQUEEZY_WEBHOOK_SECRET

After creating all files:
1. Run: npm install
2. Run: npm run build
3. Fix any build errors
4. Verify the build succeeds with exit code 0

Do NOT use placeholder text. Write real, helpful content for the landing page
and the tool itself. The tool should actually work and provide value.


PREVIOUS ATTEMPT FAILED WITH:
Codex exited 1: Reading additional input from stdin...
OpenAI Codex v0.121.0 (research preview)
--------
workdir: /tmp/openclaw-builds/salary-data-monitor
model: gpt-5.3-codex
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: none
reasoning summaries: none
session id: 019d94b6-d7f4-7261-a4ca-12eecdab905c
--------
user
# Build Task: salary-data-monitor

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: salary-data-monitor
HEADLINE: Monitor what Equifax s
Please fix the above errors and regenerate.