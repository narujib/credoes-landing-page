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
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { SectionHeader } from "@/components/sections";

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
      title: t("headquarters"),
      value: t("headquartersVal"),
      href: "https://maps.google.com",
    },
    {
      icon: Mail,
      title: t("emailLabel"),
      value: t("emailVal"),
      href: `mailto:${t("emailVal")}`,
    },
    {
      icon: Phone,
      title: t("phoneLabel"),
      value: t("phoneVal"),
      href: `tel:${t("phoneVal").replace(/[^0-9+]/g, "")}`,
    },
    {
      icon: Clock,
      title: t("hoursLabel"),
      value: t("hoursVal"),
      href: undefined,
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 md:py-16 bg-muted/20 border-t border-border/40 scroll-mt-16"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeader
          titlePart1={t("titlePart1")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                {t("infoTitle")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("infoDesc")}
              </p>

              <div className="space-y-4 pt-2">
                {contactDetails.map((detail, idx) => {
                  const Icon = detail.icon;
                  const content = (
                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/60 bg-card hover:bg-muted/40 hover:border-primary/40 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xs">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {detail.title}
                        </span>
                        <span className="text-sm font-medium text-foreground break-words mt-0.5">
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

            {/* Privacy note */}
            <div className="rounded-xl bg-background border border-border p-4 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {t("ndaTitle")}{" "}
              </span>
              {t("ndaDesc")}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              {/* Submission Feedback Alert */}
              {status === "success" && (
                <div
                  role="status"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">
                    {responseMessage}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">
                    {responseMessage}
                  </p>
                </div>
              )}

              <form onSubmit={onFormSubmit} className="space-y-5" noValidate>
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      {t("nameLabel")}
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder={t("namePlaceholder")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="text-xs text-destructive mt-1"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      {t("emailInputLabel")}
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-xs text-destructive mt-1"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    {t("subjectLabel")}
                  </label>
                  <Input
                    id="contact-subject"
                    type="text"
                    placeholder={t("subjectPlaceholder")}
                    aria-invalid={!!errors.subject}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p
                      id="subject-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    {t("messageLabel")}
                  </label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder={t("messagePlaceholder")}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-xs text-destructive mt-1"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Turnstile CAPTCHA Security Verification */}
                <div className="pt-1">
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
                      className="text-xs text-destructive mt-1.5 text-center sm:text-left"
                    >
                      {errors.captchaToken.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting" || !captchaToken}
                  className="w-full h-11 text-base font-semibold shadow-xs cursor-pointer transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
                      <Send className="ml-2 h-4 w-4" />
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
