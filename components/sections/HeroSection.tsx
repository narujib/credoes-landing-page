import * as React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  locale?: string;
}

export function HeroSection({ locale = "id" }: HeroSectionProps) {
  const isEn = locale === "en";

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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm shadow-xs transition-colors hover:bg-muted">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>
              {isEn
                ? "Next-Generation Enterprise Solutions"
                : "Solusi Enterprise Generasi Terbaru"}
            </span>
          </div>

          {/* Main Headline (H1) */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {isEn ? (
              <>
                Empowering Your Digital Transformation with{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
                  Reliability & Precision
                </span>
              </>
            ) : (
              <>
                Mentransformasi Bisnis Digital Anda dengan{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
                  Keandalan & Presisi
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
            {isEn
              ? "We build scalable, high-performance web systems and digital architecture designed to drive sustainable growth for modern companies."
              : "Kami membangun arsitektur digital dan sistem web berperforma tinggi yang dirancang untuk mendorong pertumbuhan berkelanjutan perusahaan modern."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href={`/${locale}#contact`}
              aria-label={isEn ? "Contact Us" : "Hubungi Kami"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto text-base px-8 h-12 shadow-xs cursor-pointer",
              )}
            >
              <span>{isEn ? "Get Started" : "Hubungi Kami"}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}#services`}
              aria-label={isEn ? "Explore Services" : "Pelajari Layanan"}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto text-base px-8 h-12 cursor-pointer",
              )}
            >
              <span>{isEn ? "Our Services" : "Pelajari Layanan"}</span>
            </Link>
          </div>

          {/* Highlights / Trust Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 text-muted-foreground max-w-3xl w-full border-t border-border/40">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                99.9%
              </span>
              <span className="text-xs sm:text-sm mt-1">
                {isEn ? "Uptime SLA" : "Jaminan Uptime"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                500+
              </span>
              <span className="text-xs sm:text-sm mt-1">
                {isEn ? "Enterprise Clients" : "Klien Korporat"}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-bold text-foreground">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span>24/7</span>
              </div>
              <span className="text-xs sm:text-sm mt-1">
                {isEn ? "Dedicated Support" : "Dukungan Teknis"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
