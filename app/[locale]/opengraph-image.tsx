import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt =
  "Acme Corp — Enterprise Web Architecture & Digital Solutions";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isId = locale === "id";
  const title = isId
    ? "Mentransformasi Bisnis Digital Anda dengan Presisi & Keandalan"
    : "Empowering Digital Transformation with Precision & Reliability";
  const subtitle = isId
    ? "Arsitektur Web Enterprise • Infrastruktur Cloud • Solusi AI Terpercaya"
    : "Enterprise Web Architecture • Cloud Infrastructure • Trusted AI Solutions";
  const badge = isId
    ? "Solusi Enterprise Terdepan"
    : "Next-Gen Enterprise Solutions";

  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "#ffffff",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Subtle background glow circle */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Header: Logo & Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              color: "#09090b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            CO
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Acme Corp
          </span>
        </div>

        <div
          style={{
            padding: "8px 20px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.05)",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#93c5fd",
          }}
        >
          {badge}
        </div>
      </div>

      {/* Center: Main Headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "960px",
        }}
      >
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#a1a1aa",
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Footer info: Trust badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "24px",
          fontSize: "16px",
          color: "#71717a",
        }}
      >
        <span>acmecorp.example</span>
        <div style={{ display: "flex", gap: "28px" }}>
          <span>99.9% Uptime SLA</span>
          <span>ISO 27001 Certified</span>
          <span>GDPR Compliant</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
