"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLocalizedContactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export function ContactSection() {
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

  const contactDetails = [
    {
      icon: MapPin,
      title: t("headOffice"),
      value: t("headOfficeVal"),
      href: "https://maps.google.com/?q=Assati+Garden+House+BSD",
    },
    {
      icon: MapPin,
      title: t("salesOffice"),
      value: t("salesOfficeVal"),
      href: "https://maps.google.com/?q=SOHO+Brooklyn+Alam+Sutera",
    },
    {
      icon: Mail,
      title: t("emailLabel"),
      value: t("emailVal"),
      href: `mailto:${t("emailVal")}`,
    },
    {
      icon: WhatsAppIcon,
      title: t("phoneLabel"),
      value: t("phoneVal"),
      href: "https://wa.me/628118076807",
    },
  ];

  return (
    <section
      id="contact"
      className="py-8 md:py-12 bg-muted/20 border-t border-border/40 scroll-mt-16"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 h-full">
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-foreground leading-tight">
                  {t("infoTitlePart1")}{" "}
                  <span className="text-primary">
                    {t("infoTitleHighlight")}
                  </span>
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-2">
                  {t("infoDesc")}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {contactDetails.map((detail, idx) => {
                  const Icon = detail.icon;
                  const content = (
                    <div className="flex items-start gap-3.5 p-3 rounded-lg border border-border/60 bg-card hover:bg-muted/40 hover:border-primary/40 transition-colors duration-200 ease-in-out">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground mt-0.5">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {detail.title}
                        </span>
                        <span className="text-sm font-medium text-foreground break-words mt-0.5 whitespace-pre-line leading-relaxed">
                          {detail.value}
                        </span>
                      </div>
                    </div>
                  );

                  return detail.href ? (
                    <a
                      key={idx}
                      href={detail.href}
                      target={
                        detail.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        detail.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block group"
                      aria-label={`${detail.title}: ${detail.value}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs">
              {/* Submission Feedback Alert */}
              {status === "success" && (
                <div
                  role="status"
                  className="mb-4 flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-800 dark:text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    {responseMessage}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="mb-4 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-destructive"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    {responseMessage}
                  </p>
                </div>
              )}

              <form onSubmit={onFormSubmit} className="space-y-3.5" noValidate>
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-name"
                      className="text-[11px] font-semibold uppercase tracking-wider text-foreground"
                    >
                      {t("nameLabel")}
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder={t("namePlaceholder")}
                      className="h-9 text-xs sm:text-sm"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="text-[11px] text-destructive mt-0.5"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="contact-email"
                      className="text-[11px] font-semibold uppercase tracking-wider text-foreground"
                    >
                      {t("emailInputLabel")}
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="h-9 text-xs sm:text-sm"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-[11px] text-destructive mt-0.5"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-subject"
                    className="text-[11px] font-semibold uppercase tracking-wider text-foreground"
                  >
                    {t("subjectLabel")}
                  </label>
                  <Input
                    id="contact-subject"
                    type="text"
                    placeholder={t("subjectPlaceholder")}
                    className="h-9 text-xs sm:text-sm"
                    aria-invalid={!!errors.subject}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p
                      id="subject-error"
                      className="text-[11px] text-destructive mt-0.5"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-message"
                    className="text-[11px] font-semibold uppercase tracking-wider text-foreground"
                  >
                    {t("messageLabel")}
                  </label>
                  <Textarea
                    id="contact-message"
                    rows={3}
                    placeholder={t("messagePlaceholder")}
                    className="text-xs sm:text-sm resize-none"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-[11px] text-destructive mt-0.5"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

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
        </div>
      </div>
    </section>
  );
}
