import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const logoPath = join(process.cwd(), "src", "pic", "logo.png");
  const logoBuffer = await readFile(logoPath);
  const logoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "linear-gradient(180deg, #171716 0%, #0e0e0e 100%)",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            height: 132,
            width: 132,
            background: "linear-gradient(180deg, rgba(255,84,76,0.14), rgba(255,84,76,0.02))",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            alt="CJ logo"
            style={{
              width: 98,
              height: 98,
              objectFit: "contain"
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
