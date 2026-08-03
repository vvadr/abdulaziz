import { ImageResponse } from "next/og";

export const alt = "Abdulaziz Yusupaliev — Frontend Developer & AI/ML Engineer";
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
          background: "#0a0b0d",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "8px",
            background: "#2ec26b",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid #34393c",
            padding: "26px 64px",
            background: "#121416",
          }}
        >
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 13, height: 13, borderRadius: 999, background: "#e6544a" }} />
            <div style={{ width: 13, height: 13, borderRadius: 999, background: "#e0b64c" }} />
            <div style={{ width: 13, height: 13, borderRadius: 999, background: "#2ec26b" }} />
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#787c80" }}>
            whoami.sh — abdulaziz
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#68f196" }}>
            $ whoami
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 92,
              fontWeight: 700,
              color: "#eef0f2",
              lineHeight: 1.05,
            }}
          >
            Abdulaziz Yusupaliev
          </div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 30, color: "#68f196" }}>
            $ ./role.sh
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 42,
              fontWeight: 700,
              color: "#68f196",
            }}
          >
            Frontend Developer&nbsp;
            <span style={{ color: "#aeb2b4" }}>&amp;</span>
            &nbsp;AI/ML Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #34393c",
            padding: "24px 64px",
            background: "#121416",
            fontSize: 24,
            color: "#aeb2b4",
          }}
        >
          <div style={{ display: "flex" }}>github.com/vvadr</div>
          <div style={{ display: "flex" }}>Tashkent · Uzbekistan</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
