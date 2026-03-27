import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.16), transparent 38%), linear-gradient(180deg, #0f1115 0%, #060709 100%)",
          borderRadius: 96,
          border: "1px solid rgba(255,255,255,0.12)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#d7dce5",
              boxShadow: "0 0 24px rgba(215,220,229,0.6)"
            }}
          />
          <div
            style={{
              fontSize: 184,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.08em",
              color: "#f5f7fa"
            }}
          >
            CJ
          </div>
        </div>
      </div>
    ),
    size
  );
}
