"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { mainNavLinks } from "@/lib/navigation";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const { handleNavClick } = useSmoothScroll();

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    handleNavClick(e, href);
  };

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="md:hidden text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 ease-in-out cursor-pointer"
        aria-label={t("menu")}
      >
        <div className="relative h-6 w-6 flex items-center justify-center">
          <Menu
            className={`h-6 w-6 transition-all duration-300 ease-in-out absolute ${
              open
                ? "rotate-90 opacity-0 scale-75"
                : "rotate-0 opacity-100 scale-100"
            }`}
          />
          <X
            className={`h-6 w-6 transition-all duration-300 ease-in-out absolute ${
              open
                ? "rotate-0 opacity-100 scale-100"
                : "-rotate-90 opacity-0 scale-75"
            }`}
          />
        </div>
        <span className="sr-only">{t("menu")}</span>
      </Button>

      {/* Backdrop overlay with blur */}
      <div
        className={`fixed inset-0 top-20 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity duration-300 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Dropdown Menu with slide-down & fade entrance animation */}
      <div
        className={`fixed inset-x-0 top-20 w-full z-50 bg-primary text-primary-foreground border-b border-primary-foreground/15 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top md:hidden ${
          open
            ? "translate-y-0 opacity-100 pointer-events-auto visible"
            : "-translate-y-4 opacity-0 pointer-events-none invisible"
        }`}
      >
        <div className="px-6 pt-3 pb-7 overflow-y-auto max-h-[calc(100dvh-5rem)]">
          {/* Navigation Links */}
          <nav
            className="flex flex-col items-start space-y-4 pt-2 pb-5"
            aria-label="Mobile navigation"
          >
            {mainNavLinks.map((item, index) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={(e) => onNavClick(e, item.href)}
                style={{
                  transitionDelay: open ? `${index * 60}ms` : "0ms",
                }}
                className={`w-fit inline-block font-heading text-lg sm:text-xl font-bold tracking-wider uppercase text-white/90 hover:text-secondary py-1.5 transition-all duration-300 ease-out transform ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-3 opacity-0"
                }`}
                aria-label={t(item.labelKey)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions (Language Switcher & Theme Toggle) */}
          <div
            style={{
              transitionDelay: open ? `${mainNavLinks.length * 60}ms` : "0ms",
            }}
            className={`border-t border-white/15 pt-5 flex items-center justify-center gap-4 transition-all duration-300 ease-out transform ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <LanguageSwitcher onToggle={() => setOpen(false)} />
            <ThemeToggle onToggle={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
