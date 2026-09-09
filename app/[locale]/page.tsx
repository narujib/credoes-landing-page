import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Company Landing Page
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Landing page starter with Next.js 16, Tailwind CSS v4, next-themes,
          and next-intl.
        </p>
      </div>
    </main>
  );
}
