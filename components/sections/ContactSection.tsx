"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ContactInfoPanel } from "@/components/sections/contact/ContactInfoPanel";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      className="py-8 md:py-12 bg-muted/20 border-t border-border/40 scroll-mt-16"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full items-start">
          <ContactInfoPanel />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
