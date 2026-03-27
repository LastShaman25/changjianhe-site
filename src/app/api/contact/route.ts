import { NextResponse } from "next/server";
import type { ContactPayload } from "@/lib/contact";
import { getContactConfig, validateContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let payload: ContactPayload;

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  if (payload.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const validationError = validateContactPayload(payload);

  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  const config = getContactConfig();

  if (!config.apiKey || !config.toEmail || !config.fromEmail) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, devMode: true });
    }

    return NextResponse.json(
      { ok: false, error: "service_unavailable" },
      { status: 503 }
    );
  }

  const subject =
    payload.subject?.trim() || `Website contact from ${payload.name.trim()}`;

  const text = [
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Organization: ${payload.organization?.trim() || "Not provided"}`,
    "",
    payload.message.trim()
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: config.toEmail,
      reply_to: payload.email.trim(),
      subject,
      text
    })
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
