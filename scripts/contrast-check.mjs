// WCAG contrast check for the palette in app/globals.css.
// Tokens are hex; alpha-composited surfaces are precomputed against the page
// background. Update T when globals.css tokens change, then run:
//   node scripts/contrast-check.mjs
const channel = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const Y = (hex) => {
  const n = hex.replace("#", "");
  return (
    0.2126 * channel(parseInt(n.slice(0, 2), 16)) +
    0.7152 * channel(parseInt(n.slice(2, 4), 16)) +
    0.0722 * channel(parseInt(n.slice(4, 6), 16))
  );
};
const ratio = (fg, bg) => {
  const a = Y(fg) + 0.05;
  const b = Y(bg) + 0.05;
  return Math.max(a, b) / Math.min(a, b);
};

const T = {
  bg: "#070a0f",
  fg: "#f2f5f9",
  muted: "#98a6ba",
  accent: "#7dd3fc",
  accent2: "#a5b4fc",
  accent3: "#e2e8f0",
  // rgba(13,17,25,0.90) composited over #070a0f.
  glass: "#0c1017",
};

const checks = [
  ["fg / bg", "fg", "bg", 4.5],
  ["muted / bg", "muted", "bg", 4.5],
  ["fg / glass", "fg", "glass", 4.5],
  ["muted / glass", "muted", "glass", 4.5],
  ["accent (sky) / bg", "accent", "bg", 4.5],
  ["accent (sky) / glass", "accent", "glass", 4.5],
  ["accent-2 (indigo) / bg", "accent2", "bg", 4.5],
  ["accent-2 (indigo) / glass", "accent2", "glass", 4.5],
  ["accent-3 (slate) / bg", "accent3", "bg", 4.5],
  ["bg text on accent (btn-primary fill)", "bg", "accent", 4.5],
  ["bg text on accent-3 (btn-primary hover)", "bg", "accent3", 4.5],
];

let allPass = true;
for (const [label, fg, bg, min] of checks) {
  const r = ratio(T[fg], T[bg]);
  const pass = r >= min;
  if (!pass) allPass = false;
  console.log(`${pass ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (need ${min})  ${label}`);
}
console.log(allPass ? "\nALL PASS" : "\nSOME FAIL — adjust tokens");
