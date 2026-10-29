// Renders the CV sources in resume/ to the PDFs the site links to.
//
//   node scripts/build-resumes.mjs
//
// Needs Playwright with Chromium, which is not a project dependency (Vercel
// never builds the PDFs; they are committed). If it is missing:
//   npm i --no-save playwright && npx playwright install chromium
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("Playwright is not installed: npm i --no-save playwright && npx playwright install chromium");
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const builds = [
  { source: "resume/ai-ml.html", output: "public/abdulaziz-yusupaliev-cv-ai-ml.pdf" },
  { source: "resume/frontend.html", output: "public/abdulaziz-yusupaliev-cv-frontend.pdf" },
];

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const { source, output } of builds) {
    await page.goto(`file://${path.join(root, source)}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({
      path: path.join(root, output),
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
    });

    // A CV that spills onto a second page is a layout bug, not a feature.
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
    console.log(`${output}: ${pages} page${pages === 1 ? "" : "s"}${pages > 1 ? "  <- should be 1" : ""}`);
  }
} finally {
  await browser.close();
}
