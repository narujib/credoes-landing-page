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
  expectedAction: string,
): Promise<CaptchaVerifyResult> {
  const secretKey = process.env["TURNSTILE_SECRET_KEY"];
  if (!secretKey) {
    const availableKeys = Object.keys(process.env).filter(
      (k) =>
        !k.toLowerCase().includes("secret") && !k.toLowerCase().includes("key"),
    );
    console.error("[Contact API] TURNSTILE_SECRET_KEY is not configured.");
    console.error("Available process.env keys:", availableKeys);
    return { success: false, error: "CAPTCHA service is not configured." };
  }

  const expectedHostnames = new Set(
    (process.env["TURNSTILE_HOSTNAMES"] ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

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
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!result.success) {
      console.warn("[Turnstile Verification Failed]:", result["error-codes"]);
      return {
        success: false,
        error: "CAPTCHA verification failed. Please try again.",
      };
    }

    if (result.action !== expectedAction) {
      console.warn("[Turnstile Action Mismatch]:", {
        expected: expectedAction,
        received: result.action,
      });
      return {
        success: false,
        error: "CAPTCHA verification failed. Please try again.",
      };
    }

    if (
      expectedHostnames.size > 0 &&
      result.hostname &&
      !expectedHostnames.has(result.hostname)
    ) {
      console.warn("[Turnstile Hostname Mismatch]:", {
        expected: Array.from(expectedHostnames),
        received: result.hostname,
      });
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
