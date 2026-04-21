import { NextResponse } from "next/server";
import { parseStripeEvent, verifyStripeWebhookSignature } from "@/lib/lemonsqueezy";
import { setPaidEntitlement } from "@/lib/database";

export const runtime = "nodejs";

function resolveCustomerEmail(payload: Record<string, unknown>) {
  const directEmail = payload.customer_email;
  if (typeof directEmail === "string") {
    return directEmail;
  }

  const customerDetails = payload.customer_details;
  if (
    customerDetails &&
    typeof customerDetails === "object" &&
    "email" in customerDetails &&
    typeof customerDetails.email === "string"
  ) {
    return customerDetails.email;
  }

  return null;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { message: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  const rawPayload = await request.text();

  const isValid = verifyStripeWebhookSignature(rawPayload, signature, webhookSecret);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid webhook signature" }, { status: 400 });
  }

  const event = parseStripeEvent(rawPayload);
  if (!event) {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const objectPayload = event.data.object;

    if (objectPayload && typeof objectPayload === "object") {
      const email = resolveCustomerEmail(objectPayload as Record<string, unknown>);
      if (email) {
        await setPaidEntitlement(email, {
          source: "stripe_payment_link",
          lastEventId: event.id,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
