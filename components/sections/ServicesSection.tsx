"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import type { ServiceItem } from "@/types/services";
import { ServiceCard } from "./ServiceCard";
import { SectionHeader } from "@/components/sections";

export function ServicesSection() {
  const t = useTranslations("Services");

  const services: ServiceItem[] = [
    {
      iconSrc: "/icons/capital.svg",
      title: t("s1Title"),
      description: t("s1Desc"),
      ctaText: t("s1Cta"),
      waMessage: t("s1Wa"),
    },
    {
      iconSrc: "/icons/profit.svg",
      title: t("s2Title"),
      description: t("s2Desc"),
      ctaText: t("s2Cta"),
      waMessage: t("s2Wa"),
    },
    {
      iconSrc: "/icons/consultant.svg",
      title: t("s3Title"),
      description: t("s3Desc"),
      ctaText: t("s3Cta"),
      waMessage: t("s3Wa"),
    },
    {
      iconSrc: "/icons/cooperation.svg",
      title: t("s4Title"),
      description: t("s4Desc"),
      ctaText: t("s4Cta"),
      waMessage: t("s4Wa"),
    },
  ];

  return (
    <section
      id="services"
      className="py-12 md:py-16 scroll-mt-16"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeader
          title={t.rich("title", {
            primary: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
          description={t("description")}
          className="mb-10 md:mb-12"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
