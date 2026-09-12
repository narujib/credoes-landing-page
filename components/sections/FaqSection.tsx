"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/sections";
import { siteConfig } from "@/lib/site";
import { useSessionStorage } from "@/hooks/use-session-storage";
import { FaqAccordionItem, FaqItemType } from "./FaqAccordionItem";

export function FaqSection() {
  const t = useTranslations("Faq");
  const [openIndex, setOpenIndex] = useSessionStorage<number | null>(
    "faq-open-index",
    0,
  );

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqItems: FaqItemType[] = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
    { question: t("q6"), answer: t("a6") },
  ];

  return (
    <section
      id="faq"
      className="pt-12 md:pt-16 bg-muted/20 border-t border-border/40 scroll-mt-16 overflow-hidden"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <SectionHeader
          titlePart1={t("titlePart1")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FaqAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>

      {/* Full-width CTA Banner (Alignable-style tailored to CREdoes brand) */}
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
    </section>
  );
}
