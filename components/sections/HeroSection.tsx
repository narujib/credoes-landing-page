"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { siteConfig } from "@/lib/site";

const LOGOS = [
  { src: "/images/logos/carsome.png", alt: "Carsome" },
  { src: "/images/logos/DUF.png", alt: "DUF" },
  { src: "/images/logos/infinID.png", alt: "infinID" },
  { src: "/images/logos/moladin.png", alt: "Moladin" },
];

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("Hero");
  const { handleNavClick } = useSmoothScroll();

  return (
    <section
      className="relative overflow-hidden pt-12 md:pt-20 bg-background"
      aria-label="Hero"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-stretch">
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 animate-fade-in-up">
            {/* Main Headline (H1) */}
            <h1 className="max-w-2xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight">
              {t.rich("title", {
                primary: (chunks) => (
                  <span className="text-[#0e7452] dark:text-[#20b284]">
                    {chunks}
                  </span>
                ),
              })}
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href={`${siteConfig.contact.whatsappUrl.split("?")[0]}?text=${encodeURIComponent(t("ctaContactWa"))}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ctaContact")}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto text-xl px-8 h-12 shadow-xs cursor-pointer transition-colors duration-200 hover:bg-primary/90",
                )}
              >
                <span>{t("ctaContact")}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link
                href={`/${locale}#services`}
                onClick={(e) => handleNavClick(e, "/#services")}
                aria-label={t("ctaServices")}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto text-xl px-8 h-12 cursor-pointer transition-colors duration-200 hover:bg-muted",
                )}
              >
                <span>{t("ctaServices")}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-1 relative w-full lg:w-11/12 ml-auto aspect-[4/3] lg:aspect-auto min-h-[300px] sm:min-h-[360px] lg:min-h-[500px] animate-fade-in-up">
            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-tr-[100px] rounded-bl-[100px] rounded-tl-2xl rounded-br-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Hero.svg"
                alt="Ilustrasi Layanan Pendanaan dan Investasi CREdoes"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Trusted By Banner */}
        <div className="mt-16 pt-8 border-t border-border/40 overflow-hidden w-full relative">
          <div className="relative flex max-w-full overflow-hidden group">
            <div className="flex shrink-0 animate-marquee items-center justify-around gap-8 md:gap-16 pr-8 md:pr-16 group-hover:[animation-play-state:paused]">
              {Array.from({ length: 3 }).map((_, i) => (
                <React.Fragment key={i}>
                  {LOGOS.map((logo, idx) => (
                    <Image
                      key={`logo-1-${i}-${idx}`}
                      src={logo.src}
                      alt={logo.alt}
                      width={180}
                      height={60}
                      className="object-contain h-12 md:h-16 w-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div
              className="flex shrink-0 animate-marquee items-center justify-around gap-8 md:gap-16 pr-8 md:pr-16 group-hover:[animation-play-state:paused]"
              aria-hidden="true"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <React.Fragment key={i}>
                  {LOGOS.map((logo, idx) => (
                    <Image
                      key={`logo-2-${i}-${idx}`}
                      src={logo.src}
                      alt={logo.alt}
                      width={180}
                      height={60}
                      className="object-contain h-12 md:h-16 w-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
            {/* Gradient Mask for fading edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-linear-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-linear-to-l from-background to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
