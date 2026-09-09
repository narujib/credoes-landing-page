import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
          aria-label={isEn ? "Back to Home" : "Kembali ke Beranda"}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isEn ? "Back to Home" : "Kembali ke Beranda"}</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-border pb-8 mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{isEn ? "Legal & Compliance" : "Legalitas & Kepatuhan"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {isEn ? "Privacy Policy" : "Kebijakan Privasi"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEn
              ? "Last Updated: September 2026 • Version 2.4"
              : "Terakhir Diperbarui: September 2026 • Versi 2.4"}
          </p>
        </div>

        {/* Legal Content */}
        <div className="space-y-10 text-foreground/90 leading-relaxed text-base sm:text-lg">
          {/* Section 1 */}
          <section className="space-y-3" aria-labelledby="section-overview">
            <h2
              id="section-overview"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn ? "1. Overview & Commitment" : "1. Ringkasan & Komitmen"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "Acme Corp Ltd. ('we', 'us', or 'our') is deeply committed to protecting the privacy, confidentiality, and security of our clients, partners, and visitors. This Privacy Policy details how we handle, process, and safeguard personal and business data in compliance with GDPR, ISO 27001, and applicable data privacy regulations."
                : "Acme Corp Ltd. ('kami') berkomitmen penuh untuk melindungi privasi, kerahasiaan, dan keamanan data klien, mitra, serta pengunjung kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, memproses, dan menjaga keamanan data pribadi dan bisnis sesuai standar GDPR, ISO 27001, dan peraturan perundang-undangan perlindungan data yang berlaku."}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3" aria-labelledby="section-collection">
            <h2
              id="section-collection"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn
                ? "2. Information We Collect"
                : "2. Informasi yang Kami Kumpulkan"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "We only collect information strictly necessary to provide enterprise services and maintain business communication:"
                : "Kami hanya mengumpulkan informasi yang esensial untuk penyediaan layanan enterprise dan kelancaran komunikasi bisnis:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base pl-2">
              <li>
                <strong className="text-foreground">
                  {isEn ? "Direct Inquiries: " : "Komunikasi Langsung: "}
                </strong>
                {isEn
                  ? "Name, corporate email address, phone number, and project specifications provided via our contact forms."
                  : "Nama lengkap, alamat email perusahaan, nomor telepon, dan rincian kebutuhan proyek yang Anda kirimkan melalui formulir kontak."}
              </li>
              <li>
                <strong className="text-foreground">
                  {isEn
                    ? "Technical & Diagnostic Data: "
                    : "Data Teknis & Diagnostik: "}
                </strong>
                {isEn
                  ? "Anonymized IP address, browser type, operating system, and interaction timestamps to optimize platform delivery."
                  : "Alamat IP terenkripsi/anonim, tipe peramban, sistem operasi, dan log interaksi untuk optimalisasi performa platform."}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3" aria-labelledby="section-security">
            <h2
              id="section-security"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn
                ? "3. Data Security & Storage"
                : "3. Keamanan & Penyimpanan Data"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "All data in transit and at rest is secured with enterprise-grade encryption (TLS 1.3 and AES-256). We enforce strict role-based access control (RBAC), multi-factor authentication, and continuous automated vulnerability scans across our multi-region cloud infrastructure."
                : "Seluruh data dalam transmisi maupun penyimpanan diamankan dengan enkripsi standar enterprise (TLS 1.3 dan AES-256). Kami menerapkan kontrol akses berbasis peran (RBAC) yang ketat, autentikasi multi-faktor, serta pemindaian kerentanan otomatis berkala di seluruh infrastruktur cloud kami."}
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3" aria-labelledby="section-rights">
            <h2
              id="section-rights"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn
                ? "4. Your Rights & Data Ownership"
                : "4. Hak dan Kepemilikan Data Anda"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "You retain full ownership of your data. You have the explicit right to request data access, rectification, exportation, or complete erasure from our systems at any time by contacting our Data Protection Officer."
                : "Anda memiliki hak penuh atas kepemilikan data Anda. Anda berhak meminta salinan data, perbaikan, pemindahan data (portabilitas), maupun penghapusan permanen dari sistem kami kapan saja dengan menghubungi Petugas Perlindungan Data kami."}
            </p>
          </section>

          {/* Section 5: Contact DPO */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Lock className="h-4 w-4" />
              <span>
                {isEn
                  ? "Data Protection Officer (DPO)"
                  : "Petugas Perlindungan Data (DPO)"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isEn
                ? "For inquiries regarding our compliance or data processing practices, please reach out directly to:"
                : "Untuk pertanyaan terkait kepatuhan privasi atau pemrosesan data, silakan hubungi:"}
            </p>
            <p className="text-sm font-mono font-medium text-foreground">
              privacy@acmecorp.example • Sudirman Central Business District
              (SCBD), Jakarta
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
