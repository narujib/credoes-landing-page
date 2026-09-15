import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limiter";
import { verifyCaptchaToken } from "@/lib/captcha";
import { sanitizeString } from "@/lib/sanitize";

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
      "contact",
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
            "Failed to send message. Please try again later.",
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
