import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, name, replyEmail, website } = body;

    // Honeypot — silently accept bot submissions, do nothing
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // Validation
    if (typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "訊息不能空白" },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "訊息太長" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName =
      typeof name === "string" && name.trim() ? name.trim() : "Anonymous";
    const safeReplyEmail =
      typeof replyEmail === "string" && replyEmail.trim()
        ? replyEmail.trim()
        : undefined;

    const { error } = await resend.emails.send({
      from: "hanayukii.dev <onboarding@resend.dev>",
      to: "islu245777@gmail.com",
      subject: `[hanayukii.dev] feedback from ${safeName}`,
      text: [
        `Name: ${safeName}`,
        `Reply email: ${safeReplyEmail ?? "—"}`,
        "",
        "─────────",
        "",
        message,
      ].join("\n"),
      replyTo: safeReplyEmail,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "送出失敗" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
