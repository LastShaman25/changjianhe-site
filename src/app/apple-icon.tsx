import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "linear-gradient(180deg, #12151b 0%, #08090b 100%)",
          borderRadius: 44,
          border: "1px solid rgba(255,255,255,0.12)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          color: "#f5f7fa",
          fontSize: 74,
          fontWeight: 700,
          letterSpacing: "-0.08em"
        }}
      >
        CJ
      </div>
    ),
    size
  );
}
