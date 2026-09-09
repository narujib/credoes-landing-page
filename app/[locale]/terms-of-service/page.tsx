import * as React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Scale } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

export default async function TermsOfServicePage({
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
            <Scale className="h-3.5 w-3.5" />
            <span>
              {isEn ? "Legal & Governance" : "Legalitas & Tata Kelola"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {isEn ? "Terms of Service" : "Syarat & Ketentuan Layanan"}
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
          <section className="space-y-3" aria-labelledby="section-acceptance">
            <h2
              id="section-acceptance"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn ? "1. Acceptance of Terms" : "1. Penerimaan Ketentuan"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "By accessing or utilizing any digital services, software products, or consulting provided by Acme Corp Ltd., you agree to be bound by these Terms of Service, applicable Master Services Agreements (MSA), and Statements of Work (SOW)."
                : "Dengan mengakses atau menggunakan layanan digital, produk perangkat lunak, atau konsultasi yang disediakan oleh Acme Corp Ltd., Anda menyatakan setuju untuk terikat oleh Syarat & Ketentuan Layanan ini, Perjanjian Layanan Utama (MSA), dan Rincian Kerja (SOW) yang berlaku."}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3" aria-labelledby="section-ip">
            <h2
              id="section-ip"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn
                ? "2. Intellectual Property & Ownership"
                : "2. Hak Kekayaan Intelektual"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "Unless explicitly agreed otherwise in a written project agreement, all custom deliverables developed specifically for the client become the proprietary property of the client upon full settlement of contract fees. Acme Corp retains proprietary rights to its foundational tools, reusable components, and core libraries."
                : "Kecuali dinyatakan lain secara tertulis dalam kontrak kerja, seluruh hasil kerja yang dikembangkan khusus untuk klien menjadi hak milik klien setelah penyelesaian pembayaran kontrak secara penuh. Acme Corp tetap mempertahankan hak kepemilikan atas modul dasar, komponen pakai ulang, dan pustaka inti miliknya."}
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3" aria-labelledby="section-sla">
            <h2
              id="section-sla"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn
                ? "3. Service Level Agreements & Reliability"
                : "3. Standar Layanan (SLA) & Keandalan"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "We guarantee 99.9% uptime for cloud-managed infrastructures governed by our enterprise SLA packages. Scheduled maintenance windows are announced at least 72 hours in advance and executed during off-peak hours to minimize business disruption."
                : "Kami menjamin uptime 99.9% untuk infrastruktur terkelola cloud di bawah paket SLA enterprise kami. Pemeliharaan terjadwal akan diumumkan minimal 72 jam sebelumnya dan dilakukan pada jam dengan lalu lintas terendah untuk mencegah gangguan operasional."}
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3" aria-labelledby="section-liability">
            <h2
              id="section-liability"
              className="text-xl sm:text-2xl font-bold text-foreground"
            >
              {isEn
                ? "4. Limitation of Liability"
                : "4. Batasan Tanggung Jawab"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {isEn
                ? "To the maximum extent permitted by law, Acme Corp shall not be held liable for indirect, incidental, or consequential damages resulting from third-party vendor downtime, force majeure events, or unauthorized customer credential compromises."
                : "Sepanjang diizinkan oleh hukum yang berlaku, Acme Corp tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang diakibatkan oleh gangguan vendor pihak ketiga, peristiwa kahar (force majeure), atau kelalaian kredensial oleh pengguna."}
            </p>
          </section>

          {/* Section 5: Governing Law */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <FileText className="h-4 w-4" />
              <span>
                {isEn ? "Governing Jurisdiction" : "Yurisdiksi Hukum"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isEn
                ? "These terms are governed by and construed in accordance with the laws of the Republic of Indonesia and international commercial arbitration standards."
                : "Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia dan standar arbitrase komersial internasional."}
            </p>
            <p className="text-sm font-mono font-medium text-foreground">
              legal@acmecorp.example • Legal Counsel Office, SCBD, Jakarta
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
