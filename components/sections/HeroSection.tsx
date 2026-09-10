"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  locale?: string;
}

export function HeroSection({ locale = "id" }: HeroSectionProps) {
  const t = useTranslations("Hero");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (typeof window === "undefined") return;
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/${locale}#${targetId}`);
    }
  };

  return (
    <section
      className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32"
      aria-label="Hero"
    >
      {/* Background Decorative Gradients */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-accent/40 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm shadow-xs transition-all duration-300 ease-in-out hover:bg-muted hover:scale-105">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>{t("badge")}</span>
          </div>

          {/* Main Headline (H1) */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {t("titlePart1")}{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
              {t("titleHighlight")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              href={`/${locale}#contact`}
              onClick={(e) => handleNavClick(e, "contact")}
              aria-label={t("ctaContact")}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto text-base px-8 h-12 shadow-xs cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md",
              )}
            >
              <span>{t("ctaContact")}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}#services`}
              onClick={(e) => handleNavClick(e, "services")}
              aria-label={t("ctaServices")}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto text-base px-8 h-12 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md",
              )}
            >
              <span>{t("ctaServices")}</span>
            </Link>
          </div>

          {/* Highlights / Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-muted-foreground max-w-3xl w-full border-t border-border/40">
            <div className="flex flex-col items-center p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-muted/40">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                {t("uptimeValue")}
              </span>
              <span className="text-xs sm:text-sm mt-1">
                {t("uptimeLabel")}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-muted/40">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                {t("clientsValue")}
              </span>
              <span className="text-xs sm:text-sm mt-1">
                {t("clientsLabel")}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-muted/40">
              <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-bold text-foreground">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span>{t("supportValue")}</span>
              </div>
              <span className="text-xs sm:text-sm mt-1">
                {t("supportLabel")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
