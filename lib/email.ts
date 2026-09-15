import type { ContactFormData } from "@/lib/validations/contact";

/**
 * Generate a responsive HTML email template for new contact form inquiries
 */
export function renderContactEmailHtml({
  name,
  email,
  subject,
  message,
}: ContactFormData): string {
  const timestamp = new Date().toUTCString();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry: ${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #18181b; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; border-top: 4px solid #7AE127; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background-color: #006D5B; color: #ffffff; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    .content { padding: 32px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #09090b; font-weight: 500; }
    .message-box { background-color: #f8faf9; border-radius: 8px; border: 1px solid #e5f0ee; padding: 16px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap; }
    .footer { background-color: #fafafa; border-top: 1px solid #e4e4e7; padding: 16px 32px; font-size: 12px; color: #71717a; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Enterprise Inquiry Received</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Sender Name</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${email}" style="color: #006D5B; font-weight: 600; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Subject</div>
        <div class="field-value">${subject}</div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${message}</div>
      </div>
    </div>
    <div class="footer">
      Received via CREdoes Contact Portal • ${timestamp}
    </div>
  </div>
</body>
</html>
  `.trim();
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send contact inquiry email via Resend API or server logger
 */
export async function sendContactEmail(
  data: ContactFormData,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL_TO || "admin@credoes.id";
  const fromEmail =
    process.env.CONTACT_EMAIL_FROM || "CREdoes <onboarding@resend.dev>";

  const htmlContent = renderContactEmailHtml(data);

  // If Resend API key is configured, send via Resend API
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: data.email,
          subject: `[Contact Form] ${data.subject} - from ${data.name}`,
          html: htmlContent,
        }),
      });

      if (!res.ok) {
        let errorData: Record<string, unknown> = {};
        try {
          errorData = (await res.json()) as Record<string, unknown>;
        } catch {
          // ignore
        }
        const errorMsg =
          (errorData?.message as string | undefined) ||
          (errorData?.name as string | undefined) ||
          `HTTP ${res.status} ${res.statusText}`;
        console.error(
          `[Email Service Error] ${res.status} ${res.statusText}:`,
          JSON.stringify(errorData),
        );
        return {
          success: false,
          error: `Resend API Error: ${errorMsg}`,
        };
      }

      const responseData = (await res.json()) as { id?: string };
      return {
        success: true,
        messageId: responseData.id,
      };
    } catch (err) {
      console.error("[Email Service Network Error]:", err);
      return {
        success: false,
        error: "Network error while connecting to email service provider.",
      };
    }
  }

  // Development fallback: Log email details safely on the server
  console.info(
    `[Email Service (Dev Mode)] Email simulated:\nTo: ${toEmail}\nFrom: ${data.name} <${data.email}>\nSubject: ${data.subject}\nMessage:\n${data.message}`,
  );

  return {
    success: true,
    messageId: `dev-simulated-${Date.now()}`,
  };
}
