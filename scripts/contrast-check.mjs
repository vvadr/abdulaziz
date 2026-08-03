// WCAG contrast check for the portfolio OKLCH palette.
// OKLCH -> OKLab -> linear sRGB (Ottosson), then WCAG relative luminance + ratio.
function oklchToLinear(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return [r, g, bb].map((v) => Math.min(1, Math.max(0, v)));
}
const Y = (L, C, H) => {
  const [r, g, b] = oklchToLinear(L, C, H);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (fg, bg) => {
  const a = Y(...fg) + 0.05, b = Y(...bg) + 0.05;
  return (Math.max(a, b) / Math.min(a, b));
};
const T = {
  bg: [0.15, 0.004, 240],
  surface: [0.19, 0.005, 240],
  surface2: [0.235, 0.006, 240],
  ink: [0.955, 0.003, 240],
  inkMuted: [0.76, 0.006, 240],
  inkFaint: [0.585, 0.007, 240],
  accent: [0.78, 0.155, 152],
  accentStrong: [0.86, 0.175, 152],
  accentSolid: [0.72, 0.175, 152],
  accentInk: [0.15, 0.03, 152],
};
const checks = [
  ["ink / bg", "ink", "bg", 4.5],
  ["ink-muted / bg", "inkMuted", "bg", 4.5],
  ["ink-faint / bg (large/label ≥3)", "inkFaint", "bg", 3],
  ["ink / surface", "ink", "surface", 4.5],
  ["ink-muted / surface", "inkMuted", "surface", 4.5],
  ["ink-muted / surface2", "inkMuted", "surface2", 4.5],
  ["ink-faint / surface (large ≥3)", "inkFaint", "surface", 3],
  ["accent / bg (large/icon ≥3)", "accent", "bg", 3],
  ["accent / surface (large ≥3)", "accent", "surface", 3],
  ["accentStrong / bg (body-ish ≥4.5)", "accentStrong", "bg", 4.5],
  ["accentStrong / surface (body-ish ≥4.5)", "accentStrong", "surface", 4.5],
  ["accentInk / accentSolid (btn ≥4.5)", "accentInk", "accentSolid", 4.5],
];
let allPass = true;
for (const [label, fg, bg, min] of checks) {
  const r = ratio(T[fg], T[bg]);
  const pass = r >= min;
  if (!pass) allPass = false;
  console.log(`${pass ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (need ${min})  ${label}`);
}
console.log(allPass ? "\nALL PASS" : "\nSOME FAIL — adjust tokens");
