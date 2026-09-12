"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { mainNavLinks, serviceNavLinks, legalNavLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { TwitterIcon, LinkedInIcon, GitHubIcon } from "@/components/icons";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();
  const { handleNavClick } = useSmoothScroll();

  const socialLinks = [
    {
      icon: TwitterIcon,
      href: siteConfig.social.twitter,
      label: "Twitter / X",
    },
    {
      icon: LinkedInIcon,
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
    },
    {
      icon: GitHubIcon,
      href: siteConfig.social.github,
      label: "GitHub",
    },
    {
      icon: Globe,
      href: `/${locale}`,
      label: "Global Website",
    },
  ];

  return (
    <footer
      className="border-t border-border/40 bg-card/50 backdrop-blur-xs text-card-foreground"
      aria-label={t("navTitle")}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Brand & Mission (Spans 2 cols on desktop) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link
              href={`/${locale}`}
              onClick={(e) => handleNavClick(e, "")}
              className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:opacity-90 inline-flex py-1"
              aria-label="CREdoes Home"
            >
              <Image
                src="/images/logo-full.svg"
                alt="CREdoes"
                width={140}
                height={40}
                className="h-8 md:h-9 w-auto object-contain"
                priority
                loading="eager"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t("brandDesc")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground transition-all duration-300 ease-in-out hover:bg-primary/10 hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("navTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {mainNavLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="inline-block text-muted-foreground transition-all duration-300 ease-in-out hover:text-foreground hover:translate-x-0.5"
                    aria-label={t(link.labelKey)}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("capTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {serviceNavLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="inline-block text-muted-foreground transition-all duration-300 ease-in-out hover:text-foreground hover:translate-x-0.5"
                    aria-label={t(link.labelKey)}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("legalTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {legalNavLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="inline-block text-muted-foreground transition-all duration-300 ease-in-out hover:text-foreground hover:translate-x-0.5"
                    aria-label={t(link.labelKey)}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 md:mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} CREdoes. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t("systemsOperational")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
