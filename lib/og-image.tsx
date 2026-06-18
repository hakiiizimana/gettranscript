import { ImageResponse } from "next/og";

export const ogImageAlt = "gettranscript - Free YouTube Transcript Generator";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function generateOgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#141414",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        fontFamily: "ui-monospace, monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "#252525",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "14px 16px",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 8,
              borderRadius: 4,
              background: "#FAFAFA",
            }}
          />
          <div
            style={{
              width: 22,
              height: 8,
              borderRadius: 4,
              background: "rgba(250,250,250,0.8)",
            }}
          />
          <div
            style={{
              width: 26,
              height: 8,
              borderRadius: 4,
              background: "rgba(250,250,250,0.6)",
            }}
          />
        </div>
        <div
          style={{
            color: "#FAFAFA",
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          gettranscript
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            color: "#FAFAFA",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 900,
          }}
        >
          Free YouTube transcript generator
        </div>
        <div
          style={{
            color: "rgba(250,250,250,0.72)",
            fontSize: 30,
            lineHeight: 1.4,
            maxWidth: 820,
          }}
        >
          Paste a link. Copy or download TXT, SRT, or JSON. No account.
        </div>
      </div>

      <div
        style={{
          color: "rgba(250,250,250,0.45)",
          fontSize: 24,
        }}
      >
        www.gettranscript.xyz
      </div>
    </div>,
    { ...ogImageSize }
  );
}
