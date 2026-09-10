import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email";

// In-memory rate limiting map: ip -> timestamps of requests
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const CLEANUP_THRESHOLD = 100;

function cleanupExpiredRateLimits(now: number) {
  for (const [key, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(
      (time) => now - time < RATE_LIMIT_WINDOW_MS,
    );
    if (valid.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, valid);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Evict expired keys when map exceeds threshold to prevent unbounded memory growth
  if (rateLimitMap.size >= CLEANUP_THRESHOLD) {
    cleanupExpiredRateLimits(now);
  }

  const timestamps = rateLimitMap.get(ip) || [];

  // Remove timestamps outside the sliding window
  const validTimestamps = timestamps.filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

/**
 * Basic string sanitization to prevent XSS / malicious injections
 */
function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "") // Strip HTML angle brackets
    .trim();
}

/**
 * Verify Cloudflare Turnstile CAPTCHA token with Cloudflare API
 */
async function verifyCaptchaToken(
  token: string,
  ip: string,
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("[Contact API] TURNSTILE_SECRET_KEY is not configured.");
    return { success: false, error: "CAPTCHA service is not configured." };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip && ip !== "127.0.0.1") {
      formData.append("remoteip", ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      },
    );

    const result = (await response.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!result.success) {
      console.warn("[Turnstile Verification Failed]:", result["error-codes"]);
      return {
        success: false,
        error: "CAPTCHA verification failed. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[Turnstile Verification Network Error]:", err);
    return {
      success: false,
      error: "Unable to verify CAPTCHA due to network error.",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Content-Type. Expected application/json.",
        },
        { status: 415 },
      );
    }

    // 2. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : request.headers.get("x-real-ip") || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a moment before trying again.",
        },
        { status: 429 },
      );
    }

    // 3. Parse and Sanitize Input Body
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Malformed JSON payload.",
        },
        { status: 400 },
      );
    }

    if (typeof rawBody !== "object" || rawBody === null) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload.",
        },
        { status: 400 },
      );
    }

    const payload = rawBody as Record<string, unknown>;
    const sanitizedData = {
      name: sanitizeString(payload.name),
      email: sanitizeString(payload.email),
      subject: sanitizeString(payload.subject),
      message: sanitizeString(payload.message),
      captchaToken:
        typeof payload.captchaToken === "string"
          ? payload.captchaToken.trim()
          : "",
    };

    // 4. Server-side Zod Validation
    const validationResult = contactSchema.safeParse(sanitizedData);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed.",
          fieldErrors: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    const validatedData = validationResult.data;

    // 5. Verify CAPTCHA Token with Cloudflare Turnstile
    const captchaResult = await verifyCaptchaToken(
      validatedData.captchaToken,
      ip,
    );
    if (!captchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: captchaResult.error || "CAPTCHA verification failed.",
        },
        { status: 400 },
      );
    }

    // 6. Dispatch Email notification via secure server-side email service
    const emailResult = await sendContactEmail(validatedData);
    if (!emailResult.success) {
      console.error("[Contact API] Email dispatch failure:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error:
            emailResult.error ||
            "Failed to send message due to email service error. Please try again later.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Message received successfully. We will get back to you shortly.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An internal server error occurred.",
      },
      { status: 500 },
    );
  }
}
