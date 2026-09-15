import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  return {
    title: `${t("title")} | ${siteConfig.name}`,
    description: t("title"),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  // Use the current date and show only month and year
  const lastUpdated = new Date().toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    { year: "numeric", month: "long" },
  );

  return (
    <main className="flex flex-1 flex-col py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mb-10 border-b border-border/40 pb-6">
          {t("lastUpdated")}: {lastUpdated}
        </p>

        <div className="space-y-8 text-foreground/90">
          {t
            .raw("sections")
            .map(
              (section: { heading: string; text: string }, index: number) => {
                const lines = section.text.split("\n");
                const elements = [];
                let currentList: string[] = [];

                lines.forEach((line, lineIdx) => {
                  if (line.trim().startsWith("- ")) {
                    currentList.push(line.trim().substring(2));
                  } else {
                    if (currentList.length > 0) {
                      elements.push(
                        <ul
                          key={`ul-${lineIdx}`}
                          className="list-disc pl-6 space-y-2 mt-2 mb-3"
                        >
                          {currentList.map((item, idx) => (
                            <li
                              key={idx}
                              className="pl-1 text-[15px] md:text-base text-muted-foreground leading-relaxed"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>,
                      );
                      currentList = [];
                    }
                    if (line.trim() !== "") {
                      elements.push(
                        <p
                          key={`p-${lineIdx}`}
                          className="text-[15px] md:text-base text-muted-foreground leading-relaxed mb-2"
                        >
                          {line}
                        </p>,
                      );
                    }
                  }
                });

                if (currentList.length > 0) {
                  elements.push(
                    <ul
                      key={`ul-end`}
                      className="list-disc pl-6 space-y-2 mt-2 mb-3"
                    >
                      {currentList.map((item, idx) => (
                        <li
                          key={idx}
                          className="pl-1 text-[15px] md:text-base text-muted-foreground leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>,
                  );
                }

                return (
                  <div key={index} className="space-y-3">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                      {section.heading}
                    </h2>
                    <div className="text-left">{elements}</div>
                  </div>
                );
              },
            )}
        </div>

        <div className="mt-16 p-6 md:p-8 bg-muted/30 rounded-2xl border border-border/60 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
            {locale === "id" ? "Hubungi Kami" : "Contact Us"}
          </h2>
          <p className="mb-6 text-muted-foreground">
            {locale === "id"
              ? `Jika Anda memiliki pertanyaan lebih lanjut mengenai ${t("title")} kami, jangan ragu untuk menghubungi kami melalui kontak di bawah ini:`
              : `If you have further questions about our ${t("title")}, please do not hesitate to contact us at:`}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground min-w-[100px]">
                Email:
              </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-primary hover:underline transition-all"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground min-w-[100px]">
                WhatsApp:
              </span>
              <a
                href={`https://wa.me/628118076807?text=${encodeURIComponent(
                  locale === "id"
                    ? "Halo CREdoes, saya memiliki pertanyaan mengenai Kebijakan Privasi."
                    : "Hello CREdoes, I have a question regarding the Privacy Policy.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline transition-all"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
