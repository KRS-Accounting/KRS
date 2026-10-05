import { NextResponse } from "next/server";

type NewsletterRequest = {
  email?: unknown;
  consent?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  let payload: NewsletterRequest;

  try {
    payload = (await request.json()) as NewsletterRequest;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const validRequest = email.length <= 254 && /^\S+@\S+\.\S+$/.test(email) && payload.consent === true;

  if (!validRequest) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_WEBHOOK_SECRET
          ? { "X-KRS-Webhook-Secret": process.env.NEWSLETTER_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        source: "KRS Website newsletter",
        submittedAt: new Date().toISOString(),
        email,
        consent: true,
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
