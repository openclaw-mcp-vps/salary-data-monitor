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
A Next.js web app that monitors Equifax's Work Number database for salary data changes by automating periodic checks and alerting users when their employment/salary information is accessed or updated. Users authenticate with their employment credentials, and the system runs scheduled background jobs to detect data changes.

PLANNED FILES:
- app/page.tsx
- app/dashboard/page.tsx
- app/api/auth/route.ts
- app/api/equifax/check/route.ts
- app/api/webhooks/lemonsqueezy/route.ts
- app/api/cron/monitor/route.ts
- components/EquifaxConnector.tsx
- components/AlertsPanel.tsx
- components/DataTimeline.tsx
- lib/equifax-client.ts
- lib/database.ts
- lib/email-service.ts
- prisma/schema.prisma

DEPENDENCIES: next, tailwindcss, prisma, @prisma/client, next-auth, @lemonsqueezy/lemonsqueezy.js, puppeteer, nodemailer, zod, lucide-react, recharts, cron

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
session id: 019d94c9-50ba-7c53-9877-1a429288dbe7
--------
user
# Build Task: salary-data-monitor

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: salary-data-monitor
HEADLINE: Monitor what Equifax s
Please fix the above errors and regenerate.