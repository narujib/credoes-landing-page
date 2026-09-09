import * as React from "react";

interface StructuredDataProps {
  locale?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://acmecorp.example";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Acme Corp Ltd.",
    alternateName: "Acme Corp",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-21-555-0199",
        contactType: "customer support",
        email: "hello@acmecorp.example",
        areaServed: ["ID", "SG", "US", "GB"],
        availableLanguage: ["Indonesian", "English"],
      },
    ],
    sameAs: [
      "https://github.com",
      "https://twitter.com",
      "https://linkedin.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd({ locale = "id" }: StructuredDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Acme Corp",
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
    name: "Acme Corp Headquarters",
    image: `${siteUrl}/favicon.ico`,
    telephone: "+62-21-555-0199",
    email: "hello@acmecorp.example",
    url: siteUrl,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Sudirman Central Business District (SCBD), Jl. Jend. Sudirman Kav. 52-53",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12190",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.225588,
      longitude: 106.809706,
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
