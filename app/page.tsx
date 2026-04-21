import Link from "next/link";
import { ArrowRight, Eye, FileSearch, ShieldCheck, Siren } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const problems = [
  "Lenders can inspect your salary history in seconds, often before you know a decision is being made.",
  "Landlords and background check firms can pull long employment histories that include compensation details.",
  "Remote workers and contractors face more frequent verifications because income patterns look less predictable.",
];

const solutions = [
  {
    title: "Live Access Alerts",
    body: "Get notified when your Work Number profile is queried, including who requested your data and why.",
    icon: Siren,
  },
  {
    title: "Requester Intelligence",
    body: "See request purpose, entity type, and risk level so suspicious activity stands out immediately.",
    icon: FileSearch,
  },
  {
    title: "Defensible History",
    body: "Maintain an export-ready timeline of data pulls for disputes, security reviews, and compliance records.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "Is this connected directly to Equifax?",
    answer:
      "This app simulates a monitoring control center to help you understand and track Work Number-style access patterns before integrating any live bureau connection.",
  },
  {
    question: "How does access control work after I buy?",
    answer:
      "Payments run through a Stripe hosted checkout link. Once your payment event is received, your account is granted paid entitlement and a secure cookie unlocks the dashboard.",
  },
  {
    question: "Who benefits most from this?",
    answer:
      "Professionals in active loan, rental, or hiring cycles gain the most value because they face repeated employment verification pulls across different organizations.",
  },
  {
    question: "Can I cancel any time?",
    answer:
      "Yes. The plan is month-to-month at $9, with no annual commitment required.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="font-semibold tracking-wide text-slate-100">Salary Data Monitor</p>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/signin" className="hover:text-white">Sign in</Link>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-14 md:py-20">
        <section className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div className="space-y-6 animate-rise">
            <p className="inline-flex items-center rounded-full border border-sky-800/70 bg-sky-900/30 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-200">
              Privacy Tools
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Monitor what Equifax sells about your salary
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Salary Data Monitor gives you visibility into Work Number access requests so you can spot lender, landlord, and screening pulls before they become silent decisions about your financial life.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "justify-center") }>
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/signin" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "justify-center")}>
                Connect Employment Profile
              </Link>
            </div>
          </div>

          <Card className="border-slate-800 bg-[#111a24]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5 text-sky-400" />
                Why this matters now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <p>
                Salary and employment records are frequently sold into decision pipelines for credit, housing, insurance, and hiring.
              </p>
              <p>
                Most professionals only learn about these checks after a denial. Monitoring access in near real time closes that blind spot.
              </p>
              <p className="rounded-md border border-amber-800/60 bg-amber-900/20 p-3 text-amber-100">
                If your data is queried unexpectedly, you can document it quickly and challenge suspicious pulls before it compounds.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">The problem professionals underestimate</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {problems.map((problem) => (
              <Card key={problem} className="border-slate-800 bg-slate-900/70">
                <CardContent className="pt-6 text-sm leading-relaxed text-slate-300">
                  {problem}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">How Salary Data Monitor helps</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <Card key={solution.title} className="border-slate-800 bg-slate-900/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="h-4 w-4 text-sky-400" />
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-300">{solution.body}</CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="pricing" className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Simple monthly pricing</h2>
            <p className="text-slate-300">
              One plan for people who want transparency into salary data sharing. Built for professionals with complex, multi-employer histories.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Designed for remote workers and contractors</li>
              <li>Tracks recurring access patterns over time</li>
              <li>Highlights unusual requester behavior quickly</li>
            </ul>
          </div>
          <PricingCard />
        </section>

        <section className="space-y-5 pb-8">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300"
              >
                <summary className="cursor-pointer list-none font-medium text-slate-100">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-relaxed text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
