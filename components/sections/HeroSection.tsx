"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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
      className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-background"
      aria-label="Hero"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center lg:items-stretch">
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 animate-fade-in-up">
            {/* Main Headline (H1) */}
            <h1 className="max-w-2xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight">
              {t("titlePart1")}
              <span className="text-[#0e7452] dark:text-[#20b284]">
                {t("titleHighlight")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="https://wa.me/6281234567890?text=Halo%20CREdoes,%20saya%20ingin%20berdiskusi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ctaContact")}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto text-xl px-8 h-12 shadow-xs cursor-pointer transition-colors duration-200 font-bold font-agency tracking-wider hover:bg-primary/90 active:translate-y-0 active:transform-none active:scale-100",
                )}
              >
                <span>{t("ctaContact")}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link
                href={`/${locale}#services`}
                onClick={(e) => handleNavClick(e, "services")}
                aria-label={t("ctaServices")}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto text-xl px-8 h-12 cursor-pointer transition-colors duration-200 font-bold font-agency tracking-wider hover:bg-muted active:translate-y-0 active:transform-none active:scale-100",
                )}
              >
                <span>{t("ctaServices")}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto min-h-[300px] sm:min-h-[360px] lg:min-h-0 flex items-center justify-center animate-fade-in-up">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                alt="Business Professionals"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Logo Banner */}
        <div className="mt-20 pt-10 border-t border-border/40">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-xl font-serif font-bold tracking-tighter">
              WALL STREET JOURNAL
            </span>
            <span className="text-xl font-sans font-bold">Forbes</span>
            <span className="text-xl font-sans font-bold tracking-widest">
              FAST OMPANY
            </span>
            <span className="text-2xl font-sans font-extrabold text-green-700 dark:text-green-500">
              TC
            </span>
            <span className="text-xl font-sans font-bold">TechCrunch</span>
            <span className="text-lg font-serif italic text-gray-500">
              THE HUFFINGTON POST
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
