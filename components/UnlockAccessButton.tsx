"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UnlockAccessButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function activate() {
    setMessage(null);

    startTransition(async () => {
      const response = await fetch("/api/access/activate", {
        method: "POST",
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(data.message ?? "Access is not active yet.");
        return;
      }

      setMessage("Access activated. Loading dashboard...");
      router.refresh();
    });
  }

  return (
    <div className="space-y-2">
      <Button onClick={activate} disabled={isPending}>
        <ShieldCheck className="mr-2 h-4 w-4" />
        {isPending ? "Verifying..." : "I Purchased, Unlock Dashboard"}
      </Button>
      {message ? <p className="text-sm text-slate-300">{message}</p> : null}
    </div>
  );
}
