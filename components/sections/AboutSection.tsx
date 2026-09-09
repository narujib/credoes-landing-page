import * as React from "react";
import { Award, Globe2, ShieldCheck, TrendingUp, Users } from "lucide-react";

interface AboutSectionProps {
  locale?: string;
}

export function AboutSection({ locale = "id" }: AboutSectionProps) {
  const isEn = locale === "en";

  const stats = [
    {
      value: "10+",
      label: isEn ? "Years of Excellence" : "Tahun Pengalaman",
      description: isEn
        ? "Delivering battle-tested solutions since 2016"
        : "Menghadirkan solusi teruji sejak 2016",
    },
    {
      value: "150+",
      label: isEn ? "Enterprise Projects" : "Proyek Enterprise",
      description: isEn
        ? "Successfully launched across 12 countries"
        : "Berhasil diluncurkan di 12 negara",
    },
    {
      value: "99.4%",
      label: isEn ? "Client Retention" : "Kepuasan Klien",
      description: isEn
        ? "Long-term partnerships and trust"
        : "Kemitraan jangka panjang berkelanjutan",
    },
    {
      value: "24/7",
      label: isEn ? "Global SLA Support" : "Dukungan SLA Global",
      description: isEn
        ? "Continuous monitoring and incident response"
        : "Pemantauan dan respons insiden nonstop",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: isEn ? "Enterprise-Grade Security" : "Keamanan Tingkat Enterprise",
      description: isEn
        ? "Strict compliance with ISO 27001 and GDPR privacy standards."
        : "Kepatuhan ketat terhadap standar keamanan ISO 27001 dan GDPR.",
    },
    {
      icon: TrendingUp,
      title: isEn ? "Engineered for Scale" : "Arsitektur Skala Tinggi",
      description: isEn
        ? "Resilient cloud infrastructure optimized for massive transaction volume."
        : "Infrastruktur cloud tangguh dioptimalkan untuk volume transaksi masif.",
    },
    {
      icon: Users,
      title: isEn
        ? "Client-Centric Collaboration"
        : "Kolaborasi Berpusat Klien",
      description: isEn
        ? "Dedicated agile teams aligned seamlessly with your business milestones."
        : "Tim agile berdedikasi yang selaras dengan target bisnis Anda.",
    },
    {
      icon: Award,
      title: isEn ? "Proven Reliability" : "Keandalan Terbukti",
      description: isEn
        ? "Zero-compromise approach to code quality and system performance."
        : "Standar kualitas kode tanpa kompromi untuk performa optimal.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-muted/30 border-y border-border/40 scroll-mt-16"
      aria-label={isEn ? "About Company" : "Tentang Perusahaan"}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
            <Globe2 className="h-3.5 w-3.5" />
            <span>{isEn ? "About Acme Corp" : "Tentang Acme Corp"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {isEn ? (
              <>
                Building the Future of Digital Commerce with{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                  Integrity & Precision
                </span>
              </>
            ) : (
              <>
                Membangun Masa Depan Digital dengan{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                  Integritas & Presisi
                </span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {isEn
              ? "We are a trusted technology partner empowering high-growth companies and global institutions with resilient web platforms, modern cloud infrastructure, and transformative digital experiences."
              : "Kami adalah mitra teknologi tepercaya yang mendampingi perusahaan berkembang dan institusi global dengan platform web tangguh, infrastruktur cloud modern, dan pengalaman digital transformatif."}
          </p>
        </div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Company Stats Banner */}
        <div className="rounded-2xl border border-border bg-background/80 p-8 sm:p-10 shadow-xs backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx !== 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""
                }`}
              >
                <span className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  {stat.value}
                </span>
                <span className="text-base font-semibold text-foreground mt-2">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
