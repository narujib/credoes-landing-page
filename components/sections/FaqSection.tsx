"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections";
import { useSessionStorage } from "@/hooks/use-session-storage";
import { FaqAccordionItem, FaqItemType } from "./FaqAccordionItem";
import { CtaBanner } from "@/components/sections/faq/CtaBanner";

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
          title={t.rich("title", {
            primary: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
          description={t("description")}
        />

        {/* Accordion List */}
        <div className="space-y-2.5">
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

      {/* Full-width CTA Banner */}
      <CtaBanner />
    </section>
  );
}
