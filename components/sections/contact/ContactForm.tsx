"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLocalizedContactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { FormField } from "@/components/sections/contact/FormField";
import { SubmissionAlert } from "@/components/sections/contact/SubmissionAlert";

export function ContactForm() {
  const t = useTranslations("Contact");

  const contactValidationSchema = React.useMemo(
    () => createLocalizedContactSchema(t),
    [t],
  );

  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [responseMessage, setResponseMessage] = React.useState<string>("");
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const turnstileRef = React.useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactValidationSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      captchaToken: "",
    },
  });

  const handleCaptchaSuccess = React.useCallback(
    (token: string) => {
      setCaptchaToken(token);
      setValue("captchaToken", token, { shouldValidate: true });
    },
    [setValue],
  );

  const handleCaptchaExpire = React.useCallback(() => {
    setCaptchaToken(null);
    setValue("captchaToken", "", { shouldValidate: true });
  }, [setValue]);

  const handleCaptchaError = React.useCallback(() => {
    setCaptchaToken(null);
    setValue("captchaToken", "", { shouldValidate: true });
  }, [setValue]);

  const resetCaptcha = React.useCallback(() => {
    setCaptchaToken(null);
    setValue("captchaToken", "", { shouldValidate: false });
    turnstileRef.current?.reset();
  }, [setValue]);

  const onValidSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setResponseMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        setResponseMessage(t("successMsg"));
        reset();
        resetCaptcha();
      } else {
        const errorData = await response.json().catch(() => null);
        setStatus("error");
        setResponseMessage(errorData?.error || t("errorMsg"));
        resetCaptcha();
      }
    } catch {
      setStatus("error");
      setResponseMessage(t("errorMsg"));
      resetCaptcha();
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSubmit(onValidSubmit)(e);
  };

  return (
    <div className="lg:col-span-7">
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs">
        {/* Submission Feedback Alert */}
        {(status === "success" || status === "error") && (
          <SubmissionAlert status={status} message={responseMessage} />
        )}

        <form onSubmit={onFormSubmit} className="space-y-3.5" noValidate>
          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              id="contact-name"
              label={t("nameLabel")}
              error={errors.name?.message}
            >
              <Input
                id="contact-name"
                type="text"
                placeholder={t("namePlaceholder")}
                className="h-9 text-xs sm:text-sm"
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                {...register("name")}
              />
            </FormField>

            <FormField
              id="contact-email"
              label={t("emailInputLabel")}
              error={errors.email?.message}
            >
              <Input
                id="contact-email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className="h-9 text-xs sm:text-sm"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                {...register("email")}
              />
            </FormField>
          </div>

          {/* Subject Field */}
          <FormField
            id="contact-subject"
            label={t("subjectLabel")}
            error={errors.subject?.message}
          >
            <Input
              id="contact-subject"
              type="text"
              placeholder={t("subjectPlaceholder")}
              className="h-9 text-xs sm:text-sm"
              aria-invalid={!!errors.subject}
              aria-describedby={
                errors.subject ? "contact-subject-error" : undefined
              }
              {...register("subject")}
            />
          </FormField>

          {/* Message Field */}
          <FormField
            id="contact-message"
            label={t("messageLabel")}
            error={errors.message?.message}
          >
            <Textarea
              id="contact-message"
              rows={3}
              placeholder={t("messagePlaceholder")}
              className="text-xs sm:text-sm resize-none"
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              {...register("message")}
            />
          </FormField>

          {/* Turnstile CAPTCHA Security Verification */}
          <div className="pt-0.5">
            <Turnstile
              id="captcha-turnstile"
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              onSuccess={handleCaptchaSuccess}
              onExpire={handleCaptchaExpire}
              onError={handleCaptchaError}
              options={{
                theme: "auto",
                size: "flexible",
              }}
              className="w-full"
            />
            {errors.captchaToken && (
              <p
                id="captcha-error"
                className="text-[11px] text-destructive mt-1 text-center sm:text-left"
              >
                {errors.captchaToken.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="default"
            disabled={status === "submitting" || !captchaToken}
            className="w-full h-10 text-sm font-semibold shadow-xs cursor-pointer transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={t("submitBtn")}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>{t("sendingBtn")}</span>
              </>
            ) : (
              <>
                <span>{t("submitBtn")}</span>
                <Send className="ml-2 h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
