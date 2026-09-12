/**
 * Centralized site configuration.
 * Single source of truth for all site-level constants.
 */
export const siteConfig = {
  name: "CREdoes",
  legalName: "Acme Corp Ltd.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://acmecorp.example",
  contact: {
    email: "hello@acmecorp.example",
    phone: "+62-21-555-0199",
    whatsappUrl:
      "https://wa.me/6281234567890?text=Halo%20CREdoes,%20saya%20ingin%20berdiskusi",
  },
  social: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
} as const;
