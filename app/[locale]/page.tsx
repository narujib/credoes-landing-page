import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";

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
    </main>
  );
}
