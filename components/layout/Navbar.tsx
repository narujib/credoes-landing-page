"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "./MobileMenu";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { mainNavLinks } from "@/lib/navigation";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const { handleNavClick } = useSmoothScroll();

  const handleLogoClick = () => {
    if (
      typeof window !== "undefined" &&
      (window.location.pathname === `/${locale}` ||
        window.location.pathname === `/${locale}/`)
    ) {
      window.location.reload();
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-hidden"
      >
        {t("skipToContent")}
      </a>
      <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-primary text-primary-foreground shadow-sm transition-all duration-300">
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <a
            href={`/${locale}`}
            onClick={handleLogoClick}
            className="flex items-center gap-2 py-1"
            aria-label="CREdoes Home"
          >
            <Image
              src="/images/logo-full.svg"
              alt="CREdoes"
              width={220}
              height={64}
              className="h-11 md:h-13 w-auto object-contain"
              priority
              loading="eager"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-7 font-heading text-base md:text-lg font-bold tracking-wider uppercase"
            aria-label="Main navigation"
          >
            {mainNavLinks.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-primary-foreground/80 transition-colors duration-300 ease-linear hover:text-secondary"
                aria-label={t(item.labelKey)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
