import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export const alt = "CREdoes";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "CREdoesLogoFull.png",
  );
  const logoData = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Subtle background glow circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Centered PNG Logo */}
      <img
        src={logoBase64}
        style={{ width: "600px", zIndex: 1, objectFit: "contain" }}
        alt="CREdoes Logo"
      />
    </div>,
    {
      ...size,
    },
  );
}
