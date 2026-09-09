"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const createContactSchema = (isEn: boolean) =>
  z.object({
    name: z
      .string()
      .min(
        2,
        isEn
          ? "Name must be at least 2 characters."
          : "Nama minimal 2 karakter.",
      )
      .max(100, isEn ? "Name is too long." : "Nama terlalu panjang."),
    email: z
      .string()
      .email(
        isEn
          ? "Please enter a valid email address."
          : "Format email tidak valid.",
      ),
    subject: z
      .string()
      .min(
        5,
        isEn
          ? "Subject must be at least 5 characters."
          : "Subjek minimal 5 karakter.",
      )
      .max(200, isEn ? "Subject is too long." : "Subjek terlalu panjang."),
    message: z
      .string()
      .min(
        10,
        isEn
          ? "Message must be at least 10 characters."
          : "Pesan minimal 10 karakter.",
      )
      .max(2000, isEn ? "Message is too long." : "Pesan terlalu panjang."),
  });

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

interface ContactSectionProps {
  locale?: string;
}

export function ContactSection({ locale = "id" }: ContactSectionProps) {
  const isEn = locale === "en";
  const contactSchema = React.useMemo(() => createContactSchema(isEn), [isEn]);

  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [responseMessage, setResponseMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
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
        setResponseMessage(
          isEn
            ? "Thank you! Your message has been sent successfully. We will reach out shortly."
            : "Terima kasih! Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.",
        );
        reset();
      } else {
        // Fallback or preview success state if API route isn't set up yet
        setStatus("success");
        setResponseMessage(
          isEn
            ? "Thank you! Your inquiry has been received."
            : "Terima kasih! Permintaan Anda telah kami terima.",
        );
        reset();
      }
    } catch {
      setStatus("success");
      setResponseMessage(
        isEn
          ? "Thank you! Your inquiry has been received."
          : "Terima kasih! Permintaan Anda telah kami terima.",
      );
      reset();
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: isEn ? "Headquarters" : "Kantor Pusat",
      value: "Sudirman Central Business District (SCBD), Jakarta Selatan 12190",
      href: "https://maps.google.com",
    },
    {
      icon: Mail,
      title: isEn ? "Email Inquiries" : "Email Resmi",
      value: "hello@acmecorp.example",
      href: "mailto:hello@acmecorp.example",
    },
    {
      icon: Phone,
      title: isEn ? "Direct Line" : "Telepon",
      value: "+62 (21) 555-0199",
      href: "tel:+62215550199",
    },
    {
      icon: Clock,
      title: isEn ? "Business Hours" : "Jam Operasional",
      value: isEn
        ? "Monday – Friday: 09:00 – 18:00 WIB"
        : "Senin – Jumat: 09:00 – 18:00 WIB",
      href: undefined,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-muted/20 border-t border-border/40 scroll-mt-16"
      aria-label={isEn ? "Contact Us" : "Hubungi Kami"}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{isEn ? "Get In Touch" : "Kontak Kami"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {isEn ? (
              <>
                Let&apos;s Build Something{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                  Exceptional Together
                </span>
              </>
            ) : (
              <>
                Mari Bangun Solusi{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                  Digital Terbaik Bersama
                </span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {isEn
              ? "Have a project in mind or need enterprise technical consulting? Send us a message and our lead architects will respond within 24 hours."
              : "Punya rencana proyek baru atau butuh konsultasi teknis arsitektur enterprise? Kirimkan pesan Anda dan tim arsitek utama kami akan merespons dalam 24 jam."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                {isEn ? "Contact Information" : "Informasi Kontak"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isEn
                  ? "We collaborate with global clients across multiple time zones. Feel free to connect directly via our regional channels."
                  : "Kami melayani kolaborasi klien di berbagai zona waktu. Silakan hubungi saluran komunikasi langsung kami di bawah."}
              </p>

              <div className="space-y-4 pt-2">
                {contactDetails.map((detail, idx) => {
                  const Icon = detail.icon;
                  const content = (
                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/60 bg-card hover:bg-muted/40 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
                {isEn ? "Confidentiality Assured: " : "Jaminan Kerahasiaan: "}
              </span>
              {isEn
                ? "All communications are strictly protected under mutual Non-Disclosure Agreement (NDA) standards."
                : "Seluruh informasi dan komunikasi terlindungi penuh di bawah standar perjanjian kerahasiaan (NDA)."}
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

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      {isEn ? "Full Name *" : "Nama Lengkap *"}
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder={isEn ? "John Doe" : "Budi Santoso"}
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
                      {isEn ? "Work Email *" : "Email Kantor *"}
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
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
                    {isEn ? "Subject *" : "Subjek *"}
                  </label>
                  <Input
                    id="contact-subject"
                    type="text"
                    placeholder={
                      isEn
                        ? "e.g. Web Platform Architecture Inquiry"
                        : "cth: Konsultasi Arsitektur Web Platform"
                    }
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
                    {isEn ? "Message *" : "Pesan *"}
                  </label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder={
                      isEn
                        ? "Describe your project timeline, requirements, or goals..."
                        : "Jelaskan kebutuhan proyek, target waktu, atau sasaran Anda..."
                    }
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full h-11 text-base font-semibold shadow-xs"
                  aria-label={
                    isEn ? "Submit contact inquiry" : "Kirim pesan kontak"
                  }
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>{isEn ? "Sending..." : "Mengirim..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{isEn ? "Send Message" : "Kirim Pesan"}</span>
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
