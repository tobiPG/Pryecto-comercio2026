import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, #1a1710 0%, #0b0b0c 55%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            letterSpacing: 24,
            color: "#f5f3ef",
            fontWeight: 500,
          }}
        >
          LUEUR
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: 10,
            color: "#d8b676",
            marginTop: 12,
          }}
        >
          JEWELRY
        </div>
        <div style={{ fontSize: 22, color: "#a3a0a0", marginTop: 28 }}>
          Alta joyería en Santo Domingo, República Dominicana
        </div>
      </div>
    ),
    { ...size },
  );
}
