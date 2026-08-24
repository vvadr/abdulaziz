// WCAG contrast check for the noir/gold palette in app/globals.css.
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
  bg: "#010108",
  fg: "#f8f9fc",
  muted: "#b8c0d8",
  accent: "#fbbf24",
  accent2: "#60a5fa",
  accent3: "#fcd34d",
  // rgba(4,4,14,0.88) composited over #010108.
  glass: "#04040d",
};

const checks = [
  ["fg / bg", "fg", "bg", 4.5],
  ["muted / bg", "muted", "bg", 4.5],
  ["fg / glass", "fg", "glass", 4.5],
  ["muted / glass", "muted", "glass", 4.5],
  ["accent (gold) / bg — body-ish", "accent", "bg", 4.5],
  ["accent (gold) / glass — body-ish", "accent", "glass", 4.5],
  ["accent-2 (blue) / bg — body-ish", "accent2", "bg", 4.5],
  ["accent-2 (blue) / glass — body-ish", "accent2", "glass", 4.5],
  ["accent-3 (light gold) / bg — body-ish", "accent3", "bg", 4.5],
  ["bg text on accent (btn-primary gold end)", "bg", "accent", 4.5],
  ["bg text on accent-2 (btn-primary blue end)", "bg", "accent2", 4.5],
];

let allPass = true;
for (const [label, fg, bg, min] of checks) {
  const r = ratio(T[fg], T[bg]);
  const pass = r >= min;
  if (!pass) allPass = false;
  console.log(`${pass ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (need ${min})  ${label}`);
}
console.log(allPass ? "\nALL PASS" : "\nSOME FAIL — adjust tokens");
