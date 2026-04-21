"use client";

import { useMemo, useState } from "react";
import { parseISO, format } from "date-fns";
import { Search } from "lucide-react";
import type { DataAccessLogEntry } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Props = {
  logs: DataAccessLogEntry[];
};

export function DataAccessLog({ logs }: Props) {
  const [query, setQuery] = useState("");

  const filteredLogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return logs;
    }

    return logs.filter((entry) => {
      const target = [
        entry.requesterName,
        entry.requesterType,
        entry.purpose,
        entry.location,
        entry.fieldsAccessed.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return target.includes(normalizedQuery);
    });
  }, [logs, query]);

  return (
    <Card className="border-slate-800 bg-slate-900/80">
      <CardHeader>
        <CardTitle className="text-lg">Detailed Access Log</CardTitle>
        <CardDescription>
          Every known request against your Work Number profile with timestamp, purpose, and outcome.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search requester, purpose, location, or fields accessed"
            className="pl-9"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 pr-4">When</th>
                <th className="pb-3 pr-4">Requester</th>
                <th className="pb-3 pr-4">Purpose</th>
                <th className="pb-3 pr-4">Fields Accessed</th>
                <th className="pb-3 pr-4">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {filteredLogs.map((entry) => (
                <tr key={entry.id} className="align-top text-slate-200">
                  <td className="py-3 pr-4 whitespace-nowrap text-slate-400">
                    <div>{format(parseISO(entry.requestedAt), "MMM d, yyyy")}</div>
                    <div className="text-xs">{format(parseISO(entry.requestedAt), "h:mm a")}</div>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="font-medium text-slate-100">{entry.requesterName}</p>
                    <p className="text-xs text-slate-400">{entry.requesterType}</p>
                    <p className="text-xs text-slate-500">{entry.location}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <p>{entry.purpose}</p>
                    <p className="text-xs text-slate-500">{entry.permissiblePurpose}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {entry.fieldsAccessed.map((field) => (
                        <Badge key={`${entry.id}-${field}`} variant="outline" className="text-[11px]">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <Badge variant={entry.outcome === "denied" ? "high" : "low"}>{entry.outcome}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLogs.length === 0 ? (
            <p className="pt-4 text-sm text-slate-400">No log rows match your search.</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
