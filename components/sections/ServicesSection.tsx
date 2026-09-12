import * as React from "react";
import { useTranslations } from "next-intl";
import {
  BrainCircuit,
  Cloud,
  Code2,
  LayoutGrid,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { ServiceCard, type ServiceItem } from "./ServiceCard";
import { SectionHeader } from "@/components/sections";

export function ServicesSection() {
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
      className="py-12 md:py-16 scroll-mt-16"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeader
          titlePart1={t("titlePart1")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
