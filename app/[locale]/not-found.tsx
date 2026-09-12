"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  const locale = useLocale();

  return (
    <section className="relative flex-1 flex flex-col items-center justify-center min-h-[70vh] py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* Background Decorative Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 animate-fade-in-up">
        {/* 404 Display */}
        <div className="relative select-none py-1">
          <span className="font-heading font-black text-8xl sm:text-9xl tracking-widest text-foreground/15 dark:text-white/10">
            404
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground -mt-6">
          {t("titlePart1")}{" "}
          <span className="text-[#0e7452] dark:text-[#20b284]">
            {t("titleHighlight")}
          </span>
        </h1>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 w-full sm:w-auto">
          <Link
            href={`/${locale}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto text-xl px-8 h-12 shadow-xs cursor-pointer transition-colors duration-200 hover:bg-primary/90 gap-2",
            )}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t("backHome")}</span>
          </Link>
          <Link
            href={`/${locale}#contact`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto text-xl px-8 h-12 shadow-xs cursor-pointer transition-colors duration-200 gap-2",
            )}
          >
            <MessageSquare className="h-5 w-5" />
            <span>{t("contact")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
