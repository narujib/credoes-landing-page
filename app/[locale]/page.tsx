import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

  const titleString =
    locale === "id"
      ? `Acme Corp — Solusi Digital & Rekayasa Web Enterprise`
      : `Acme Corp — Modern Digital Solutions & Enterprise Architecture`;
  const description = t("subtitle");

  return {
    title: {
      absolute: titleString,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
        "x-default": "/id",
      },
    },
    openGraph: {
      title: titleString,
      description,
      url: `/${locale}`,
      siteName: "Acme Corp",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleString,
      description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <HeroSection locale={locale} />
      <AboutSection />
      <ServicesSection locale={locale} />
      <ContactSection />
    </main>
  );
}
