"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  locale?: string;
}

export function Navbar({ locale = "id" }: NavbarProps) {
  const t = useTranslations("Navbar");

  const navItems = [
    { label: t("home"), href: "" },
    { label: t("about"), href: "/#about" },
    { label: t("services"), href: "/#services" },
    { label: t("contact"), href: "/#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (typeof window === "undefined") return;

    const isHomePage =
      window.location.pathname === `/${locale}` ||
      window.location.pathname === `/${locale}/` ||
      window.location.pathname === "/";

    if (!isHomePage) return;

    if (href === "") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", `/${locale}`);
      return;
    }

    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const targetId = href.slice(hashIndex + 1);
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/${locale}${href}`);
      }
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
          <Link
            href={`/${locale}`}
            onClick={(e) => handleNavClick(e, "")}
            className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:opacity-90 py-1"
            aria-label="CREdoes Home"
          >
            <Image
              src="/images/logo-full.svg"
              alt="CREdoes"
              width={220}
              height={64}
              className="h-11 md:h-13 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-7 font-heading text-base md:text-lg font-bold tracking-wider uppercase"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-primary-foreground/80 transition-colors duration-300 ease-linear hover:text-secondary"
                aria-label={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <MobileMenu items={navItems} locale={locale} />
          </div>
        </div>
      </header>
    </>
  );
}
