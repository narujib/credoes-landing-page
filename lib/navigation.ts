/**
 * Centralized navigation link definitions.
 * Used by Navbar, MobileMenu, and Footer.
 */
export interface NavLinkDef {
  labelKey: string;
  href: string;
}

export const mainNavLinks: NavLinkDef[] = [
  { labelKey: "home", href: "" },
  { labelKey: "about", href: "/#about" },
  { labelKey: "services", href: "/#services" },
  { labelKey: "contact", href: "/#contact" },
];

export const serviceNavLinks: NavLinkDef[] = [
  { labelKey: "webEngineering", href: "/#services" },
  { labelKey: "cloudDevOps", href: "/#services" },
  { labelKey: "enterpriseAi", href: "/#services" },
  { labelKey: "cybersecurity", href: "/#services" },
];

export const legalNavLinks: NavLinkDef[] = [
  { labelKey: "privacyPolicy", href: "/privacy-policy" },
  { labelKey: "termsOfService", href: "/terms-of-service" },
];
