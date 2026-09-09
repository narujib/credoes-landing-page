"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";

interface FooterProps {
  locale?: string;
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function Footer({ locale = "id" }: FooterProps) {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

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

  const navigationLinks = [
    { label: t("home"), href: "" },
    { label: t("about"), href: "/#about" },
    { label: t("services"), href: "/#services" },
    { label: t("contact"), href: "/#contact" },
  ];

  const serviceLinks = [
    { label: t("webEngineering"), href: "/#services" },
    { label: t("cloudDevOps"), href: "/#services" },
    { label: t("enterpriseAi"), href: "/#services" },
    { label: t("cybersecurity"), href: "/#services" },
  ];

  const legalLinks = [
    { label: t("privacyPolicy"), href: "/privacy-policy" },
    { label: t("termsOfService"), href: "/terms-of-service" },
  ];

  const socialLinks = [
    {
      icon: TwitterIcon,
      href: "https://twitter.com",
      label: "Twitter / X",
    },
    {
      icon: LinkedInIcon,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: GitHubIcon,
      href: "https://github.com",
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
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href={`/${locale}`}
              onClick={(e) => handleNavClick(e, "")}
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground transition-opacity hover:opacity-90 inline-flex"
              aria-label="Acme Corp Home"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-sm">
                CO
              </div>
              <span>Acme Corp</span>
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/40"
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
              {navigationLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={link.label}
                  >
                    {link.label}
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
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={link.label}
                  >
                    {link.label}
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
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} Acme Corp Ltd. {t("allRightsReserved")}
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
