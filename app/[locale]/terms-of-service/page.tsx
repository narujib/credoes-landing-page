import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Scale } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });

  const pageTitle = t("title");
  const fullTitle = `${pageTitle} | Acme Corp`;
  const description = t("s1Desc");

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `/${locale}/terms-of-service`,
      languages: {
        id: "/id/terms-of-service",
        en: "/en/terms-of-service",
        "x-default": "/id/terms-of-service",
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `/${locale}/terms-of-service`,
      siteName: "Acme Corp",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Terms" });

  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
          aria-label={t("backToHome")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("backToHome")}</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-border pb-8 mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-primary">
            <Scale className="h-3.5 w-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("lastUpdated")}</p>
        </div>

        {/* Legal Content */}
        <div className="space-y-10 text-foreground/90 leading-relaxed text-base sm:text-lg">
          {/* Section 1 */}
          <section className="space-y-3" aria-labelledby="section-acceptance">
            <h2
              id="section-acceptance"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {t("s1Title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("s1Desc")}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3" aria-labelledby="section-ip">
            <h2
              id="section-ip"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {t("s2Title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("s2Desc")}
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3" aria-labelledby="section-sla">
            <h2
              id="section-sla"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {t("s3Title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("s3Desc")}
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3" aria-labelledby="section-liability">
            <h2
              id="section-liability"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {t("s4Title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("s4Desc")}
            </p>
          </section>

          {/* Section 5: Governing Law */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <FileText className="h-4 w-4" />
              <span>{t("jurTitle")}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("jurDesc")}</p>
            <p className="text-sm font-mono font-medium text-foreground">
              {t("jurContact")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
