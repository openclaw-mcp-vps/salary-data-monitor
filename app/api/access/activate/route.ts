import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { hasPaidEntitlement } from "@/lib/database";

export async function POST() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isPaid = await hasPaidEntitlement(session.user.email);

  if (!isPaid) {
    return NextResponse.json(
      {
        message:
          "Payment was not found for this account yet. Complete checkout with your sign-in email and try again.",
      },
      { status: 402 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: "salary_monitor_access",
    value: "granted",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
