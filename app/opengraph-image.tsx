import { ImageResponse } from "next/og";

export const alt = "Abdulaziz Yusupaliev — AI Engineer & Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Twilight-teal link preview, matching the site identity.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14181f",
          backgroundImage:
            "radial-gradient(900px 520px at 78% -10%, rgba(76,224,210,0.22), transparent 60%), radial-gradient(700px 460px at 0% 110%, rgba(120,156,224,0.16), transparent 55%)",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* teal blade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "10px",
            background: "#5cdbd2",
            boxShadow: "0 0 90px 26px rgba(76,224,210,0.55)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7fe8dd",
            fontWeight: 600,
          }}
        >
          Tashkent · Uzbekistan
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              color: "#f1f6f5",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Abdulaziz
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              color: "#f1f6f5",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Yusupaliev
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 40,
              fontWeight: 600,
              color: "#5cdbd2",
            }}
          >
            AI Engineer&nbsp;
            <span style={{ color: "#8a96a5" }}>&amp;</span>
            &nbsp;Frontend Developer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#8a96a5",
            fontFamily: "monospace",
          }}
        >
          github.com/abdulazizyusupaliev
        </div>
      </div>
    ),
    { ...size }
  );
}
