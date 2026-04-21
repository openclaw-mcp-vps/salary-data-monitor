import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { AlertsList } from "@/components/AlertsList";
import { DataAccessLog } from "@/components/DataAccessLog";
import { EmploymentProfile } from "@/components/EmploymentProfile";
import { PricingCard } from "@/components/PricingCard";
import { SignOutButton } from "@/components/SignOutButton";
import { UnlockAccessButton } from "@/components/UnlockAccessButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getDashboardData, hasPaidEntitlement } from "@/lib/database";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Review salary data access alerts and logs, and monitor who requests your Equifax Work Number records.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/signin?callbackUrl=/dashboard");
  }

  const email = session.user.email;
  const [dashboardData, isPaid] = await Promise.all([
    getDashboardData(email),
    hasPaidEntitlement(email),
  ]);

  const cookieStore = await cookies();
  const hasAccessCookie = cookieStore.get("salary_monitor_access")?.value === "granted";
  const canViewDashboard = isPaid && hasAccessCookie;

  if (!canViewDashboard) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard Access</h1>
            <p className="text-sm text-slate-400">Signed in as {email}</p>
          </div>
          <SignOutButton />
        </div>

        <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-amber-800/70 bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-100">
                <TriangleAlert className="h-5 w-5" />
                Dashboard Is Behind The Paid Monitoring Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-amber-50/90">
              <p>
                To protect alert data and audit history, full monitoring is available only after purchase verification.
              </p>
              <p>
                1. Complete checkout with the same email address used to sign in. 2. Click unlock to issue your secure access cookie.
              </p>

              <div className="rounded-md border border-amber-700/70 bg-amber-900/20 p-3 text-xs text-amber-100">
                {isPaid
                  ? "Payment detected. Finalize access by issuing your secure cookie."
                  : "No payment event found for this account yet. Finish checkout first, then return here."}
              </div>

              {isPaid ? <UnlockAccessButton /> : null}
            </CardContent>
          </Card>

          <PricingCard />
        </div>
      </main>
    );
  }

  const pendingAlerts = dashboardData.alerts.filter((alert) => !alert.acknowledged).length;
  const deniedRequests = dashboardData.accessLogs.filter((log) => log.outcome === "denied").length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 md:py-10">
      <header className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Salary Data Monitor Dashboard</h1>
          <p className="text-sm text-slate-400">Tracking Equifax Work Number access events for {email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={pendingAlerts > 0 ? "high" : "low"}>{pendingAlerts} pending alerts</Badge>
          <Badge variant={deniedRequests > 0 ? "medium" : "low"}>{deniedRequests} blocked requests</Badge>
          <SignOutButton />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/80">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total access events</p>
            <p className="mt-2 text-3xl font-semibold text-white">{dashboardData.accessLogs.length}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/80">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Unreviewed alerts</p>
            <p className="mt-2 text-3xl font-semibold text-white">{pendingAlerts}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/80">
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Connected employer</p>
            <p className="mt-2 text-xl font-semibold text-white">{dashboardData.employmentProfile.primaryEmployer}</p>
          </CardContent>
        </Card>
      </section>

      <EmploymentProfile profile={dashboardData.employmentProfile} />
      <AlertsList initialAlerts={dashboardData.alerts} />
      <DataAccessLog logs={dashboardData.accessLogs} />
    </main>
  );
}
