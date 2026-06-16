import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().max(120).optional().default(""),
  email: z.string().min(1).max(180).email(),
  subject: z.string().max(180).optional().default(""),
  message: z.string().min(5).max(2000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  page_url: z.string().optional().default(""),
  language: z.string().optional().default(""),
});

function mapZodIssue(issue: z.ZodIssue): string {
  const path = issue.path.join(".");
  switch (issue.code) {
    case "invalid_format":
      if (path === "email") return "email_invalid";
      break;
    case "invalid_type":
      if (path === "rating") return "rating_invalid";
      break;
    case "too_small":
      if (path === "email") return "email_required";
      if (path === "message") return "message_too_short";
      if (path === "rating") return "rating_invalid";
      break;
    case "too_big":
      if (path === "name") return "name_too_long";
      if (path === "email") return "email_too_long";
      if (path === "subject") return "subject_too_long";
      if (path === "message") return "message_too_long";
      if (path === "rating") return "rating_invalid";
      break;
  }
  return "send_error";
}

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return "127.0.0.1";
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(ip);
    }
  }
}, 60_000);

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "rate_limited" },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const code = mapZodIssue(parsed.error.issues[0]);
      return NextResponse.json({ error: code }, { status: 400 });
    }

    const { name, email, subject, message, rating, page_url, language } = parsed.data;

    const sanitizedName = sanitize(name);
    const sanitizedSubject = sanitize(subject);
    const sanitizedMessage = sanitize(message);

    let finalMessage = sanitizedMessage;
    if (sanitizedSubject) {
      finalMessage = `Subject: ${sanitizedSubject}\n\n${sanitizedMessage}`;
    }

    const userAgent = request.headers.get("user-agent") || "";

    const maskedEmail = email.length > 3 ? email[0] + "***@" + email.split("@").pop() : "***";
    console.log(
      "[Contact] Inserting: name=%s email=%s rating=%s message_len=%d lang=%s ip=%s",
      sanitizedName || "(empty)",
      maskedEmail,
      rating ?? "null",
      finalMessage.length,
      language || "(empty)",
      ip,
    );

    await query(
      `INSERT INTO public.community_feedback
        (name, email, rating, feedback_type, message, page_url, language, user_agent, ip_address, status)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        sanitizedName || null,
        email,
        rating ?? null,
        "contact",
        finalMessage,
        page_url || null,
        language || null,
        userAgent,
        ip,
        "new",
      ],
    );

    console.log("[Contact] Feedback saved successfully");
    return NextResponse.json(
      { success: true },
      { status: 201 },
    );
  } catch (error) {
    const err = error as Error & { code?: string; detail?: string };
    console.error("[Contact] Error:", err.message, err.code || "", err.detail || "");
    return NextResponse.json(
      { error: "send_error" },
      { status: 500 },
    );
  }
}
