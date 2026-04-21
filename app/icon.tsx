import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#09090b",
          display: "flex",
          position: "relative",
        }}
      >
        {/* columna izquierda */}
        <div style={{ position: "absolute", left: 5, top: 8, width: 6, height: 9, borderRadius: 2, background: "#fff" }} />
        <div style={{ position: "absolute", left: 5, top: 20, width: 6, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
        {/* columna central */}
        <div style={{ position: "absolute", left: 13, top: 8, width: 6, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
        <div style={{ position: "absolute", left: 13, top: 16, width: 6, height: 9, borderRadius: 2, background: "#fff" }} />
        {/* columna derecha */}
        <div style={{ position: "absolute", left: 21, top: 8, width: 6, height: 7, borderRadius: 2, background: "#fff" }} />
        <div style={{ position: "absolute", left: 21, top: 18, width: 6, height: 7, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
      </div>
    ),
    { ...size }
  );
}
