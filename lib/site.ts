/**
 * Centralized site configuration.
 * Single source of truth for all site-level constants.
 */
export const siteConfig = {
  name: "CREdoes",
  legalName: "CREdoes",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://credoes.id",
  contact: {
    email: "admin@credoes.id",
    phone: "+62 811-8076-807",
    whatsappUrl:
      "https://wa.me/628118076807?text=Halo%20CREdoes,%20saya%20ingin%20berkonsultasi",
  },
  social: {
    instagram: "https://www.instagram.com/solusicredoes/",
    linkedin: "https://www.linkedin.com/company/credoes/",
  },
} as const;
