"use client";

import { useState, useTransition } from "react";
import { Building2, BriefcaseBusiness } from "lucide-react";
import type { EmploymentProfile as EmploymentProfileModel } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  profile: EmploymentProfileModel;
};

export function EmploymentProfile({ profile }: Props) {
  const [primaryEmployer, setPrimaryEmployer] = useState(profile.primaryEmployer);
  const [workEmail, setWorkEmail] = useState(profile.workEmail);
  const [employmentTypes, setEmploymentTypes] = useState(profile.employmentTypes.join(", "));
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function connectProfile() {
    setStatusMessage(null);

    startTransition(async () => {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primaryEmployer,
          workEmail,
          employmentTypes: employmentTypes
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      if (!response.ok) {
        setStatusMessage("Profile update failed. Verify your fields and try again.");
        return;
      }

      setStatusMessage("Employment profile connected. Monitoring thresholds were recalculated.");
    });
  }

  return (
    <Card className="border-slate-800 bg-slate-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5 text-sky-400" />
          Employment Profile
        </CardTitle>
        <CardDescription>
          Connect the profile you want watched so suspicious salary pulls are easier to spot.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant={profile.isProfileConnected ? "low" : "medium"}>
            {profile.isProfileConnected ? "Connected" : "Needs setup"}
          </Badge>
          <Badge variant={profile.riskLevel}>{profile.riskLevel} risk</Badge>
          <Badge variant="outline">Monitoring since {profile.monitorSince}</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="primaryEmployer">Primary employer</Label>
            <Input
              id="primaryEmployer"
              value={primaryEmployer}
              onChange={(event) => setPrimaryEmployer(event.target.value)}
              placeholder="Example: Blue Ridge Labs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workEmail">Work email</Label>
            <Input
              id="workEmail"
              type="email"
              value={workEmail}
              onChange={(event) => setWorkEmail(event.target.value)}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employmentTypes">Employment types</Label>
          <Input
            id="employmentTypes"
            value={employmentTypes}
            onChange={(event) => setEmploymentTypes(event.target.value)}
            placeholder="Full-time, Contractor, Remote"
          />
          <p className="text-xs text-slate-500">
            Separate entries with commas. Example: Full-time, Contractor.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="button" onClick={connectProfile} disabled={isPending}>
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            {isPending ? "Saving..." : "Connect Employment Profile"}
          </Button>
          {statusMessage ? <p className="text-sm text-slate-300">{statusMessage}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
