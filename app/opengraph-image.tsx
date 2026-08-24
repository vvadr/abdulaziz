import { ImageResponse } from "next/og";

export const alt = "Abdulaziz Yusupaliev — Frontend Developer & AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette mirrors app/globals.css tokens (hardcoded — ImageResponse cannot
// read CSS variables): bg #010108, fg #f8f9fc, muted #b8c0d8, gold #fbbf24,
// blue #60a5fa, light gold #fcd34d.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#010108",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* gold→blue beam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #fbbf24, #60a5fa, #fcd34d)",
          }}
        />
        {/* glows */}
        <div
          style={{
            position: "absolute",
            left: -140,
            top: 90,
            width: 460,
            height: 460,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(1,1,8,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -60,
            width: 480,
            height: 480,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(96,165,250,0.2) 0%, rgba(1,1,8,0) 70%)",
          }}
        />
        {/* orbit ring */}
        <div
          style={{
            position: "absolute",
            left: 220,
            top: 150,
            width: 760,
            height: 330,
            borderRadius: 999,
            border: "2px solid rgba(251,191,36,0.28)",
            transform: "rotate(-8deg)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "34px 64px 0",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#f8f9fc" }}>
            AY<span style={{ color: "#fbbf24" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#b8c0d8",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#fbbf24",
              }}
            />
            Open to internships &amp; freelance
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
          <div
            style={{
              display: "flex",
              fontSize: 100,
              fontWeight: 700,
              color: "#f8f9fc",
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            Abdulaziz
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 6,
              fontSize: 100,
              fontWeight: 500,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              color: "#fbbf24",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Yusupaliev
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 34,
              color: "#b8c0d8",
            }}
          >
            Frontend Developer&nbsp;
            <span style={{ color: "#60a5fa" }}>&amp;</span>
            &nbsp;AI/ML Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            padding: "24px 64px",
            fontSize: 24,
            color: "#b8c0d8",
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
