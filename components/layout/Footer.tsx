"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { mainNavLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { LinkedInIcon, InstagramIcon } from "@/components/icons";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();
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

  const socialLinks = [
    {
      icon: LinkedInIcon,
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
    },
    {
      icon: InstagramIcon,
      href: siteConfig.social.instagram,
      label: "Instagram",
    },
  ];

  // Combine links for horizontal layout
  const allNavLinks = [...mainNavLinks];

  return (
    <footer
      className="bg-background border-t border-border/60 pt-10 pb-8 text-foreground"
      aria-label={t("navTitle")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Top Row: Logo & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <a
            href={`/${locale}`}
            onClick={handleLogoClick}
            className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
            aria-label="CREdoes Home"
          >
            <Image
              src="/images/logo-full.svg"
              alt="CREdoes"
              width={260}
              height={75}
              className="h-12 md:h-15 w-auto object-contain"
              priority
            />
          </a>

          <div className="flex items-center gap-5 w-full sm:w-auto justify-center sm:justify-end">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Middle Row: Navigation Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3 mb-6">
          {allNavLinks.map((link, idx) => (
            <Link
              key={idx}
              href={`/${locale}${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-t-2 border-dotted border-border/80 w-full mb-6" />

        {/* Bottom Row: Copyright */}
        <div className="flex items-center justify-center sm:justify-start text-sm text-muted-foreground">
          <p className="font-medium">&copy; {currentYear} CREdoes</p>
        </div>
      </div>
    </footer>
  );
}
