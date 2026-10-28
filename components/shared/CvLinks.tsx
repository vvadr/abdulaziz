import { resumeLinks } from "@/data/site";

/** The two CV downloads, labelled the same everywhere they appear. */
export function CvLinks() {
  return resumeLinks.map((cv) => (
    <a key={cv.href} href={cv.href} target="_blank" rel="noreferrer" className="btn btn-line">
      {cv.label}
      <span className="sr-only">(PDF, opens in a new tab)</span>
    </a>
  ));
}
