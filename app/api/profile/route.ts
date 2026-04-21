import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { updateEmploymentProfile } from "@/lib/database";

const profileSchema = z.object({
  primaryEmployer: z.string().min(2).max(120),
  workEmail: z.string().email(),
  employmentTypes: z.array(z.string().min(2).max(50)).min(1),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = profileSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid employment profile payload" }, { status: 400 });
  }

  const profile = await updateEmploymentProfile(session.user.email, parsed.data);

  return NextResponse.json({ profile });
}
