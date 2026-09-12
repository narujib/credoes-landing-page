"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Full-width CTA banner displayed below the FAQ accordion.
 * Promotes consulting/support engagement.
 */
export function CtaBanner() {
  const t = useTranslations("Faq");

  return (
    <div className="mt-14 md:mt-18 w-full bg-primary text-primary-foreground py-10 md:py-14 shadow-md">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          <div className="max-w-2xl">
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground leading-snug">
              {t("bannerTitle")}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
              {t("bannerSubtitle")}
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={`${siteConfig.contact.whatsappUrl.split("?")[0]}?text=${encodeURIComponent(t("contactSupportWa"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3.5 text-lg font-bold font-agency tracking-wider text-primary-foreground backdrop-blur-xs transition-colors duration-200 hover:bg-primary-foreground hover:text-primary hover:border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <span>{t("contactSupport")}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
