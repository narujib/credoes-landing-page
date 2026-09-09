import * as React from "react";
import {
  BrainCircuit,
  Cloud,
  Code2,
  LayoutGrid,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { ServiceCard, ServiceItem } from "./ServiceCard";

interface ServicesSectionProps {
  locale?: string;
}

export function ServicesSection({ locale = "id" }: ServicesSectionProps) {
  const isEn = locale === "en";

  const services: ServiceItem[] = [
    {
      icon: Code2,
      tag: isEn ? "High Performance" : "Performa Tinggi",
      title: isEn ? "Custom Web Engineering" : "Pengembangan Web Kustom",
      description: isEn
        ? "High-performance full-stack web applications and micro-frontends architected with modern Next.js and React."
        : "Aplikasi web full-stack dan mikro-frontend performa tinggi yang dibangun dengan Next.js dan React modern.",
      features: isEn
        ? [
            "Next.js App Router & Server Components",
            "Scalable API and Edge Middleware",
            "SEO & Sub-second Page Load Speeds",
          ]
        : [
            "Next.js App Router & Server Components",
            "Arsitektur API dan Edge Middleware",
            "SEO & Waktu Muat Halaman Sub-detik",
          ],
    },
    {
      icon: Cloud,
      tag: isEn ? "Cloud Native" : "Cloud Native",
      title: isEn
        ? "Cloud Infrastructure & DevOps"
        : "Infrastruktur Cloud & DevOps",
      description: isEn
        ? "Automated deployment pipelines, container orchestration, and multi-region resilient cloud topologies."
        : "Pipeline otomasi CI/CD, orkestrasi container, dan topologi cloud multi-region yang tangguh.",
      features: isEn
        ? [
            "Infrastructure as Code (Terraform)",
            "Kubernetes & Docker Containerization",
            "Zero-Downtime Deployment Strategies",
          ]
        : [
            "Infrastructure as Code (Terraform)",
            "Kontainerisasi Kubernetes & Docker",
            "Strategi Deployment Zero-Downtime",
          ],
    },
    {
      icon: BrainCircuit,
      tag: isEn ? "AI Powered" : "Berbasis AI",
      title: isEn
        ? "Enterprise AI & Data Pipelines"
        : "Integrasi AI & Data Enterprise",
      description: isEn
        ? "Intelligent workflow automation, secure LLM integrations, and robust real-time data processing engines."
        : "Otomasi alur kerja cerdas, integrasi LLM yang aman, dan mesin pengolahan data real-time.",
      features: isEn
        ? [
            "Custom LLM & Retrieval Pipelines (RAG)",
            "Predictive Analytics & Dashboards",
            "Secure Enterprise Data Isolation",
          ]
        : [
            "Pipeline LLM & Pencarian Data (RAG)",
            "Analitik Prediktif & Dashboard Interaktif",
            "Isolasi Keamanan Data Perusahaan",
          ],
    },
    {
      icon: ShieldCheck,
      tag: isEn ? "Security First" : "Prioritas Keamanan",
      title: isEn ? "Cybersecurity & Compliance" : "Keamanan Siber & Kepatuhan",
      description: isEn
        ? "End-to-end security audits, identity governance, and adherence to international compliance frameworks."
        : "Audit keamanan menyeluruh, manajemen identitas, dan kepatuhan standar regulasi global.",
      features: isEn
        ? [
            "Vulnerability & Pen-testing Audits",
            "ISO 27001 & GDPR Compliance Checks",
            "Role-Based Access & OAuth2 Governance",
          ]
        : [
            "Audit Kerentanan & Penetration Testing",
            "Pemeriksaan Kepatuhan ISO 27001 & GDPR",
            "Tata Kelola Hak Akses Berbasis Peran",
          ],
    },
    {
      icon: Smartphone,
      tag: isEn ? "Multi-Platform" : "Multi-Platform",
      title: isEn
        ? "Mobile & Cross-Platform Apps"
        : "Aplikasi Mobile Multi-Platform",
      description: isEn
        ? "Native-grade mobile applications with intuitive offline capabilities and fluid native gesture handling."
        : "Aplikasi mobile berstandar native dengan dukungan offline dan responsivitas gestur yang mulus.",
      features: isEn
        ? [
            "Universal iOS & Android Codebase",
            "Real-time Push Notifications",
            "Biometric Authentication Integration",
          ]
        : [
            "Basis Kode Universal iOS & Android",
            "Notifikasi Push Real-time",
            "Integrasi Autentikasi Biometrik",
          ],
    },
    {
      icon: LayoutGrid,
      tag: isEn ? "Design Systems" : "Design System",
      title: isEn
        ? "Design Systems & UX Strategy"
        : "Design System & Strategi UX",
      description: isEn
        ? "Unified design tokens, accessible UI libraries, and user research tailored for conversion and delight."
        : "Token desain terpadu, pustaka UI aksesibel, dan riset UX untuk konversi dan kepuasan pengguna.",
      features: isEn
        ? [
            "WCAG AA Accessibility Compliance",
            "Figma-to-Code Token Synchronisation",
            "Interactive Component Documentation",
          ]
        : [
            "Kepatuhan Aksesibilitas WCAG AA",
            "Sinkronisasi Token Figma-ke-Kode",
            "Dokumentasi Komponen Interaktif",
          ],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-28 scroll-mt-16"
      aria-label={isEn ? "Our Services" : "Layanan Kami"}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isEn ? "Core Capabilities" : "Layanan Unggulan"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {isEn ? (
              <>
                Comprehensive Solutions Tailored for{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                  Modern Enterprise Needs
                </span>
              </>
            ) : (
              <>
                Solusi Komprehensif Dirancang untuk{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                  Kebutuhan Perusahaan Modern
                </span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {isEn
              ? "From architecture to deployment, our end-to-end engineering practices ensure your digital systems are secure, resilient, and primed for rapid market growth."
              : "Dari arsitektur hingga deployment, standar rekayasa menyeluruh kami menjamin sistem digital Anda aman, tangguh, dan siap untuk ekspansi pasar yang pesat."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
