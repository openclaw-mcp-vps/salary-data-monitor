import crypto from "node:crypto";

interface StripeEvent<T = Record<string, unknown>> {
  id: string;
  type: string;
  data: {
    object: T;
  };
}

const STRIPE_TOLERANCE_SECONDS = 300;

function secureCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export function verifyStripeWebhookSignature(
  rawPayload: string,
  signatureHeader: string | null,
  secret: string,
) {
  if (!signatureHeader) {
    return false;
  }

  const pieces = signatureHeader.split(",").map((entry) => entry.trim());
  const timestamp = pieces.find((entry) => entry.startsWith("t="))?.replace("t=", "");
  const signatures = pieces
    .filter((entry) => entry.startsWith("v1="))
    .map((entry) => entry.replace("v1=", ""));

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (!Number.isFinite(age) || Math.abs(age) > STRIPE_TOLERANCE_SECONDS) {
    return false;
  }

  const signedPayload = `${timestamp}.${rawPayload}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");

  return signatures.some((signature) => secureCompare(signature, expected));
}

export function parseStripeEvent(rawPayload: string): StripeEvent | null {
  try {
    return JSON.parse(rawPayload) as StripeEvent;
  } catch {
    return null;
  }
}
