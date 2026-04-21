import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { acknowledgeAlert, listAlerts } from "@/lib/database";

const acknowledgeSchema = z.object({
  alertId: z.string().min(1),
});

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const alerts = await listAlerts(session.user.email);
  return NextResponse.json({ alerts });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = acknowledgeSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const updated = await acknowledgeAlert(session.user.email, parsed.data.alertId);
  return NextResponse.json({ alert: updated });
}
