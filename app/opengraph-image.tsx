import { ImageResponse } from "next/og";

export const alt = "Abdulaziz Yusupaliev — AI Engineer & Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Crimson-on-black "dark-side" link preview, matching the site identity.
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
          background: "#161616",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* saber blade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "10px",
            background: "#e23234",
            boxShadow: "0 0 90px 30px rgba(226,50,52,0.55)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background: "rgba(226,50,52,0.18)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#e2566f",
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
              color: "#f7f3f2",
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
              color: "#f7f3f2",
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
              color: "#ff6466",
            }}
          >
            AI Engineer&nbsp;
            <span style={{ color: "#9a9290" }}>&amp;</span>
            &nbsp;Frontend Developer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#9a9290",
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
