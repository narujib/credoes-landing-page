/**
 * Centralized site configuration.
 * Single source of truth for all site-level constants.
 */
export const siteConfig = {
  name: "CREdoes",
  legalName: "Acme Corp Ltd.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://acmecorp.example",
  contact: {
    email: "admin@credoes.id",
    phone: "+62 811-8076-807",
    whatsappUrl:
      "https://wa.me/628118076807?text=Halo%20CREdoes,%20saya%20ingin%20berkonsultasi",
  },
  social: {
    instagram: "https://www.instagram.com/solusicredoes/",
    linkedin: "https://www.linkedin.com/company/credoes/",
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
} as const;
