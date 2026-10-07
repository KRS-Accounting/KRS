import { NextResponse } from "next/server";

type ConsultationRequest = {
  fullName?: unknown;
  workEmail?: unknown;
  phone?: unknown;
  company?: unknown;
  companyStage?: unknown;
  teamSize?: unknown;
  industry?: unknown;
  payroll?: unknown;
  services?: unknown;
  timeline?: unknown;
  callWindow?: unknown;
  notes?: unknown;
  privacy?: unknown;
  booking?: unknown;
  website?: unknown;
};

const isShortText = (value: unknown, maxLength = 250) =>
  typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;

export async function POST(request: Request) {
  let payload: ConsultationRequest;

  try {
    payload = (await request.json()) as ConsultationRequest;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const validRequest =
    isShortText(payload.fullName) &&
    isShortText(payload.workEmail) &&
    /^\S+@\S+\.\S+$/.test(payload.workEmail as string) &&
    typeof payload.phone === "string" &&
    /^\+30\d{6,15}$/.test(payload.phone.replace(/\s/g, "")) &&
    isShortText(payload.company) &&
    isShortText(payload.companyStage) &&
    isShortText(payload.teamSize) &&
    (payload.industry === undefined || payload.industry === "" || isShortText(payload.industry)) &&
    isShortText(payload.payroll) &&
    Array.isArray(payload.services) &&
    payload.services.length > 0 &&
    payload.services.length <= 5 &&
    payload.services.every((service) => isShortText(service, 80)) &&
    (payload.notes === undefined || payload.notes === "" || isShortText(payload.notes, 1000)) &&
    (payload.timeline === undefined || payload.timeline === "" || isShortText(payload.timeline)) &&
    (payload.callWindow === undefined || payload.callWindow === "" || isShortText(payload.callWindow)) &&
    (payload.booking === undefined || payload.booking === "" || isShortText(payload.booking, 80));

  if (!validRequest) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const webhookUrl = process.env.ONBOARDING_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ONBOARDING_WEBHOOK_SECRET
          ? { "X-KRS-Webhook-Secret": process.env.ONBOARDING_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        source: "KRS Website consultation flow",
        submittedAt: new Date().toISOString(),
        fullName: payload.fullName,
        workEmail: payload.workEmail,
        phone: typeof payload.phone === "string" ? payload.phone : "",
        company: payload.company,
        companyStage: payload.companyStage,
        teamSize: payload.teamSize,
        industry:
          typeof payload.industry === "string" && payload.industry.trim() ? payload.industry.trim() : "Other",
        payroll: payload.payroll,
        services: payload.services,
        timeline: payload.timeline ?? "",
        callWindow: payload.callWindow ?? "",
        booking: typeof payload.booking === "string" ? payload.booking : "",
        notes: typeof payload.notes === "string" ? payload.notes : "",
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
