import * as React from "react";
import { useTranslations } from "next-intl";
import { Award, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { SectionHeader } from "@/components/sections";

export function AboutSection() {
  const t = useTranslations("About");

  const stats = [
    {
      value: t("stat1Value"),
      label: t("stat1Label"),
      description: t("stat1Desc"),
    },
    {
      value: t("stat2Value"),
      label: t("stat2Label"),
      description: t("stat2Desc"),
    },
    {
      value: t("stat3Value"),
      label: t("stat3Label"),
      description: t("stat3Desc"),
    },
    {
      value: t("stat4Value"),
      label: t("stat4Label"),
      description: t("stat4Desc"),
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: t("pillar1Title"),
      description: t("pillar1Desc"),
    },
    {
      icon: TrendingUp,
      title: t("pillar2Title"),
      description: t("pillar2Desc"),
    },
    {
      icon: Users,
      title: t("pillar3Title"),
      description: t("pillar3Desc"),
    },
    {
      icon: Award,
      title: t("pillar4Title"),
      description: t("pillar4Desc"),
    },
  ];

  return (
    <section
      id="about"
      className="py-12 md:py-16 bg-muted/30 border-y border-border/40 scroll-mt-16"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeader
          titlePart1={t("titlePart1")}
          titleHighlight={t("titleHighlight")}
          description={t("description")}
        />

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 md:mb-12">
          {values.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/40"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Company Stats Banner */}
        <div className="rounded-2xl border border-border bg-background/80 p-6 sm:p-8 shadow-xs backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx !== 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""
                }`}
              >
                <span className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  {stat.value}
                </span>
                <span className="text-base font-semibold text-foreground mt-2">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
