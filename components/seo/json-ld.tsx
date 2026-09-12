"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { siteConfig } from "@/lib/site";

const siteUrl = siteConfig.url;

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "CREdoes",
    alternateName: "CREdoes Indonesia",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-811-8076-807",
        contactType: "customer support",
        email: siteConfig.contact.email,
        areaServed: ["ID"],
        availableLanguage: ["Indonesian", "English"],
      },
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const locale = useLocale();
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "CREdoes",
    url: `${siteUrl}/${locale}`,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "ReadAction",
      target: [`${siteUrl}/${locale}`],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#localbusiness`,
    name: "CREdoes - Kantor Pusat",
    image: `${siteUrl}/favicon.ico`,
    telephone: "+62-811-8076-807",
    email: siteConfig.contact.email,
    url: siteUrl,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Assati Garden House, Green Tower 501",
      addressLocality: "BSD - Tangerang Selatan",
      addressRegion: "Banten",
      postalCode: "15345",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.30205,
      longitude: 106.65297,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
