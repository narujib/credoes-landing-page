import * as React from "react";
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

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-hidden"
      >
        {t("skipToContent")}
      </a>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground transition-opacity hover:opacity-90"
            aria-label="Acme Corp Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-sm">
              CO
            </div>
            <span>Acme Corp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
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
