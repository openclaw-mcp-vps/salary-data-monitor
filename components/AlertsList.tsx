"use client";

import { useMemo, useState, useTransition } from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { BellRing, ShieldAlert } from "lucide-react";
import type { DataAccessAlert } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  initialAlerts: DataAccessAlert[];
};

export function AlertsList({ initialAlerts }: Props) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [isPending, startTransition] = useTransition();

  const pendingAlerts = useMemo(
    () => alerts.filter((alert) => !alert.acknowledged).length,
    [alerts],
  );

  async function acknowledge(alertId: string) {
    startTransition(async () => {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alertId }),
      });

      if (!response.ok) {
        return;
      }

      setAlerts((current) =>
        current.map((alert) =>
          alert.id === alertId ? { ...alert, acknowledged: true } : alert,
        ),
      );
    });
  }

  return (
    <Card className="border-slate-800 bg-slate-900/80">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BellRing className="h-5 w-5 text-sky-400" />
            Alert Feed
          </CardTitle>
          <CardDescription>
            Prioritized events from Work Number access activity.
          </CardDescription>
        </div>
        <Badge variant={pendingAlerts > 0 ? "high" : "low"}>
          {pendingAlerts} pending
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-sm text-slate-400">No access activity has been detected yet.</p>
        ) : null}

        {alerts.map((alert) => (
          <article
            key={alert.id}
            className="rounded-lg border border-slate-800 bg-[#0f1722] p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-100">{alert.title}</p>
                <p className="text-sm text-slate-300">{alert.message}</p>
                <p className="text-xs text-slate-500">
                  {formatDistanceToNowStrict(parseISO(alert.createdAt), { addSuffix: true })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={alert.severity}>{alert.severity}</Badge>
                {alert.acknowledged ? (
                  <Badge variant="low">acknowledged</Badge>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={() => acknowledge(alert.id)}
                    className="h-8"
                  >
                    <ShieldAlert className="mr-1 h-3.5 w-3.5" />
                    Mark reviewed
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
