import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  "Real-time alerts when Work Number requests happen",
  "Detailed requester logs with purpose and source",
  "Risk scoring for lenders, landlords, and screeners",
  "Export-ready history for dispute documentation",
  "Monthly monitoring summary with access trends",
];

export function PricingCard({ className }: { className?: string }) {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  return (
    <Card className={cn("border-sky-800/70 bg-slate-900/80", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">Salary Data Monitor</CardTitle>
        <CardDescription>Complete Work Number visibility for professionals in active hiring, renting, or borrowing cycles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-4xl font-bold text-slate-100">$9<span className="text-base font-medium text-slate-400">/month</span></p>
          <p className="mt-1 text-sm text-slate-400">Cancel anytime. Hosted Stripe checkout.</p>
        </div>

        <ul className="space-y-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-slate-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={stripePaymentLink}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full")}
        >
          Buy Access With Stripe
        </a>
      </CardContent>
    </Card>
  );
}
