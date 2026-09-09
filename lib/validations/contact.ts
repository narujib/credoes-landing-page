import { z } from "zod";

/**
 * Static contact form schema with standard fallback error messages
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long (max 100 characters)."),
  email: z.string().email("Please enter a valid email address."),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters.")
    .max(200, "Subject is too long (max 200 characters)."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long (max 2000 characters)."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Factory to create a localized Zod schema using next-intl translation function
 */
export function createLocalizedContactSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t("nameErrorMin")).max(100, t("nameErrorMax")),
    email: z.string().email(t("emailError")),
    subject: z
      .string()
      .min(5, t("subjectErrorMin"))
      .max(200, t("subjectErrorMax")),
    message: z
      .string()
      .min(10, t("messageErrorMin"))
      .max(2000, t("messageErrorMax")),
  });
}
