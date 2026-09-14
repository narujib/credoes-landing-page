"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Wallet, TrendingUp, ShieldCheck, Globe } from "lucide-react";
import { SectionHeader } from "@/components/sections";

export function AboutSection() {
  const t = useTranslations("About");

  const bullets = [
    { text: t("bullet1"), icon: Wallet },
    { text: t("bullet2"), icon: TrendingUp },
    { text: t("bullet3"), icon: ShieldCheck },
    { text: t("bullet4"), icon: Globe },
  ];

  return (
    <section
      id="about"
      className="py-12 md:py-16 bg-muted/30 border-y border-border/40 scroll-mt-16 overflow-hidden"
      aria-label={t("badge")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Features */}
          <div className="lg:col-span-7 animate-fade-in-up">
            <SectionHeader
              title={t.rich("title", {
                primary: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
              description={t("description")}
              align="left"
              className="mb-6 md:mb-8"
            />

            <ul className="space-y-3">
              {bullets.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-base text-muted-foreground pt-2 leading-relaxed font-medium">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Decorative Image */}
          <div
            className="lg:col-span-5 relative w-full max-w-[380px] mx-auto aspect-square md:aspect-[4/5] animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            {/* Solid Background Shape */}
            <div className="absolute top-4 -right-4 md:top-6 md:-right-6 w-full h-full bg-primary/5 rounded-tl-[80px] rounded-2xl -z-10 border border-primary/10" />

            {/* Dot Pattern Decoration */}
            <svg
              className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-32 h-32 md:w-40 md:h-40 text-primary/40 -z-10"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              <pattern
                id="dots"
                x="0"
                y="0"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="2.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>

            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-tl-[80px] rounded-2xl overflow-hidden shadow-xl border border-border/50">
              <Image
                src="/images/Business-bg.svg"
                alt="Tim Konsultan Profesional CREdoes"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute bottom-6 -left-4 md:-left-8 bg-background rounded-xl p-3 md:p-4 shadow-xl border border-border/60 flex items-center gap-3 z-10">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground font-bold text-xl md:text-2xl font-agency tracking-wider">
                20+
              </div>
              <div className="flex flex-col pr-1 md:pr-2">
                <span className="text-sm md:text-base font-bold text-foreground leading-none mb-1">
                  {t("badgeExpTitle")}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground">
                  {t("badgeExpSubtitle")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
