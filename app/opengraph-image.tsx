import { ImageResponse } from "next/og";
import { heroAvailability, heroLocation, siteRole } from "@/data/site";

export const alt = `Abdulaziz Yusupaliev — ${siteRole}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette mirrors app/globals.css tokens (hex — ImageResponse cannot read
// CSS variables): bg #f4f6f9, ink #101524, ink-soft #4e5566, blue #2349d7,
// wave-idle #c5cddf.
const BG = "#f4f6f9";
const INK = "#101524";
const SOFT = "#4e5566";
const BLUE = "#2349d7";
const IDLE = "#c5cddf";

// A fixed waveform, half "decoded" — the same motif as the hero.
const BARS = Array.from({ length: 84 }, (_, i) => {
  const burst = i > 18 && i < 62;
  const v = Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45));
  return burst ? 12 + v * 88 : 4 + (i % 3) * 2;
});

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
          background: BG,
          padding: "56px 64px",
          fontFamily: "sans-serif",
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: BLUE, fontWeight: 600 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: BLUE }} />
          {heroAvailability}
          <span style={{ color: SOFT, fontWeight: 400 }}>&nbsp;/ {heroLocation}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-4px" }}>
            Abdulaziz
          </div>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-4px" }}>
            Yusupaliev
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 3, height: 100 }}>
          {BARS.map((h, i) => (
            <div
              key={i}
              style={{ width: 8, height: h, background: i < 48 ? BLUE : IDLE }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${INK}`,
            paddingTop: 20,
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex", color: BLUE, fontWeight: 700 }}>{siteRole}</div>
          <div style={{ display: "flex", color: SOFT }}>github.com/vvadr</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
