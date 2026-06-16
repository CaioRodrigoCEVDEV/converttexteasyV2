import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";

const FEEDBACK_TYPES = ["suggestion", "bug", "feedback", "partnership", "other"] as const;

const contactSchema = z.object({
  feedback_type: z.enum(FEEDBACK_TYPES),
  name: z.string().max(120).optional().default(""),
  email: z.string().max(180).optional().default(""),
  message: z.string().min(5).max(2000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  page_url: z.string().optional().default(""),
  language: z.string().optional().default(""),
});

function mapZodIssue(issue: z.ZodIssue): string {
  const path = issue.path.join(".");
  const code = issue.code;
  if (code === "invalid_type" && path === "feedback_type") return "feedback_type_required";
  if (code === "invalid_type" && path === "rating") return "rating_invalid";
  if ((code as string) === "invalid_enum_value" && path === "feedback_type") return "feedback_type_invalid";
  if (code === "too_small" && path === "message") return "message_too_short";
  if (code === "too_small" && path === "rating") return "rating_invalid";
  if (code === "too_big" && path === "name") return "name_too_long";
  if (code === "too_big" && path === "email") return "email_too_long";
  if (code === "too_big" && path === "message") return "message_too_long";
  if (code === "too_big" && path === "rating") return "rating_invalid";
  if (code === "invalid_format" && path === "email") return "email_invalid";
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
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(ip);
  }
}, 60_000);

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const code = mapZodIssue(parsed.error.issues[0]);
      return NextResponse.json({ error: code }, { status: 400 });
    }

    const { feedback_type, name, email, message, rating, page_url, language } = parsed.data;

    const rawEmail = email.trim();
    if (rawEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
      return NextResponse.json({ error: "email_invalid" }, { status: 400 });
    }

    const sanitizedName = sanitize(name);
    const sanitizedMessage = sanitize(message);
    const userAgent = request.headers.get("user-agent") || "";

    console.log(
      "[Contact] Inserting: type=%s name=%s email=%s rating=%s message_len=%d lang=%s ip=%s",
      feedback_type,
      sanitizedName || "(empty)",
      rawEmail ? rawEmail[0] + "***@" + rawEmail.split("@").pop() : "(empty)",
      rating ?? "null",
      sanitizedMessage.length,
      language || "(empty)",
      ip,
    );

    await query(
      `INSERT INTO public.community_feedback
        (name, email, rating, feedback_type, message, page_url, language, user_agent, ip_address, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        sanitizedName || null,
        rawEmail || null,
        rating ?? null,
        feedback_type,
        sanitizedMessage,
        page_url || null,
        language || null,
        userAgent,
        ip,
        "new",
      ],
    );

    console.log("[Contact] Feedback saved successfully");
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const err = error as Error & { code?: string; detail?: string };
    console.error("[Contact] Error:", err.message, err.code || "", err.detail || "");
    return NextResponse.json({ error: "send_error" }, { status: 500 });
  }
}
