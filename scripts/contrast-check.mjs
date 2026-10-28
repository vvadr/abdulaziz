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

// Hex equivalents of the OKLCH tokens in app/globals.css.
const T = {
  bg: "#f4f6f9", // --bg
  surface: "#ffffff", // --surface
  ink: "#101524", // --ink
  inkSoft: "#4e5566", // --ink-soft
  blue: "#2349d7", // --blue
  blueDeep: "#132d94", // --blue-deep
  bluePale: "#d3e1ff", // --blue-pale
  white: "#ffffff",
  night: "#0c111e", // --night
  nightFg: "#f2f3f8", // --night-fg
  nightSoft: "#b0b7c8", // --night-soft
  nightBlue: "#87a8f7", // --night-blue
};

const checks = [
  ["ink / bg", "ink", "bg", 4.5],
  ["ink-soft / bg", "inkSoft", "bg", 4.5],
  ["ink-soft / surface (row hover)", "inkSoft", "surface", 4.5],
  ["blue text / bg", "blue", "bg", 4.5],
  ["bg text on ink (btn-solid)", "bg", "ink", 4.5],
  ["white on blue (btn-solid hover, contact)", "white", "blue", 4.5],
  ["blue-pale on blue (contact secondary)", "bluePale", "blue", 4.5],
  ["blue-deep on white (btn on blue)", "blueDeep", "white", 4.5],
  ["night-fg / night", "nightFg", "night", 4.5],
  ["night-soft / night", "nightSoft", "night", 4.5],
  ["night-blue / night", "nightBlue", "night", 4.5],
];

let allPass = true;
for (const [label, fg, bg, min] of checks) {
  const r = ratio(T[fg], T[bg]);
  const pass = r >= min;
  if (!pass) allPass = false;
  console.log(`${pass ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (need ${min})  ${label}`);
}
console.log(allPass ? "\nALL PASS" : "\nSOME FAIL — adjust tokens");
