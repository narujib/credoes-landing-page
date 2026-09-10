import * as React from "react";
import { useTranslations } from "next-intl";
import {
  BrainCircuit,
  Cloud,
  Code2,
  LayoutGrid,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { ServiceCard, ServiceItem } from "./ServiceCard";

interface ServicesSectionProps {
  locale?: string;
}

export function ServicesSection({ locale = "id" }: ServicesSectionProps) {
  const t = useTranslations("Services");

  const services: ServiceItem[] = [
    {
      icon: Code2,
      tag: t("s1Tag"),
      title: t("s1Title"),
      description: t("s1Desc"),
      features: [t("s1F1"), t("s1F2"), t("s1F3")],
    },
    {
      icon: Cloud,
      tag: t("s2Tag"),
      title: t("s2Title"),
      description: t("s2Desc"),
      features: [t("s2F1"), t("s2F2"), t("s2F3")],
    },
    {
      icon: BrainCircuit,
      tag: t("s3Tag"),
      title: t("s3Title"),
      description: t("s3Desc"),
      features: [t("s3F1"), t("s3F2"), t("s3F3")],
    },
    {
      icon: ShieldCheck,
      tag: t("s4Tag"),
      title: t("s4Title"),
      description: t("s4Desc"),
      features: [t("s4F1"), t("s4F2"), t("s4F3")],
    },
    {
      icon: Smartphone,
      tag: t("s5Tag"),
      title: t("s5Title"),
      description: t("s5Desc"),
      features: [t("s5F1"), t("s5F2"), t("s5F3")],
    },
    {
      icon: LayoutGrid,
      tag: t("s6Tag"),
      title: t("s6Title"),
      description: t("s6Desc"),
      features: [t("s6F1"), t("s6F2"), t("s6F3")],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-28 scroll-mt-16"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs transition-all duration-300 ease-in-out hover:scale-105">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("titlePart1")}{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
