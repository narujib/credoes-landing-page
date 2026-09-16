import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import { siteConfig } from "@/lib/site";
import { getLocale } from "next-intl/server";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = siteConfig.url;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CREdoes - Aggregator Bisnis, Pendanaan & Konsultasi Investasi",
    template: "%s | CREdoes",
  },
  description:
    "CREdoes adalah aggregator bisnis yang menyediakan solusi pendanaan, modal kerja, investasi, dan konsultasi strategis untuk mengakselerasi pertumbuhan perusahaan Anda.",
  keywords: [
    "CREdoes",
    "aggregator bisnis",
    "pendanaan",
    "modal kerja",
    "konsultasi investasi",
    "bisnis indonesia",
  ],
  authors: [{ name: "CREdoes" }],
  creator: "CREdoes",
  publisher: "CREdoes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "CREdoes - Aggregator Bisnis, Pendanaan & Konsultasi Investasi",
    description:
      "Solusi pendanaan, modal kerja, investasi, dan konsultasi strategis untuk mengakselerasi pertumbuhan perusahaan Anda.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
