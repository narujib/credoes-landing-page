/**
 * Cloudflare Turnstile CAPTCHA verification.
 */

export interface CaptchaVerifyResult {
  success: boolean;
  error?: string;
}

/**
 * Verify a Cloudflare Turnstile CAPTCHA token against the Cloudflare API.
 */
export async function verifyCaptchaToken(
  token: string,
  ip: string,
): Promise<CaptchaVerifyResult> {
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
