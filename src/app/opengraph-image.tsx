import { ImageResponse } from "next/og";
import { siteName, siteTitle } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.14), transparent 34%), linear-gradient(180deg, #0d1014 0%, #060709 100%)",
          color: "#f5f7fa",
          padding: "56px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 34,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            position: "relative"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#aeb6c4"
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#d7dce5",
                boxShadow: "0 0 24px rgba(215,220,229,0.55)"
              }}
            />
            Premium Bilingual Portfolio
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
            <div
              style={{
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.05em"
              }}
            >
              {siteName}
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.4,
                color: "#c7ccd4",
                maxWidth: 860
              }}
            >
              {siteTitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%"
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
                color: "#8b93a1",
                fontSize: 24
              }}
            >
              <span>AI Research</span>
              <span>Infrastructure</span>
              <span>Security</span>
            </div>
            <div
              style={{
                fontSize: 24,
                color: "#d7dce5"
              }}
            >
              changjianhe.com
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
