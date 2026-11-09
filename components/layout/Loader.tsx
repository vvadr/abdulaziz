import { seeded } from "@/lib/utils";

/* First-load overlay: a 3D "waterfall" of speech waveforms. Each ridge is
   recorded at the front edge, then recedes into the distance, the way an
   audio waterfall plot scrolls. It is pure CSS 3D (see .loader-* in
   globals.css), so it moves from the first paint, before any JavaScript
   arrives, and the inline script below only decides when it ends.

   States live on <html>, set by the script, never on React-managed nodes,
   so hydration sees untouched markup:
     is-loading  → overlay up, hero entrance paused
     is-leaving  → overlay wipes away, hero entrance plays
     (neither)   → overlay gone (display: none)
   Without JavaScript neither class is ever set, so the overlay never shows. */

const RIDGES = 16;
const SHAPES = 8; // drawn once, each used twice (the second time mirrored)
const W = 256; // viewBox width
const H = 64; // viewBox height
const BASE = 60; // the floor line inside the viewBox

/** One ridge: a few syllable-like bursts over low room noise, like a
 *  waveform envelope. The closing segments run outside the viewBox, so the
 *  white stroke only shows along the top edge and the blue fill hides the
 *  ridges behind it. */
function ridgePath(seed: number) {
  const rand = seeded(seed * 9973 + 17);
  const bursts = Array.from({ length: 2 + Math.floor(rand() * 3) }, () => ({
    center: W * (0.22 + rand() * 0.56),
    spread: 6 + rand() * 16,
    peak: 0.3 + rand() * 0.7,
  }));
  let d = `M-4 ${H + 8}L-4 ${BASE}`;
  for (let x = 0; x <= W; x += 6) {
    let amp = rand() * 0.04;
    for (const b of bursts) {
      amp += b.peak * Math.exp(-((x - b.center) ** 2) / (2 * b.spread ** 2)) * (0.55 + rand() * 0.45);
    }
    d += `L${x} ${Math.round(BASE - Math.min(1, amp) * (BASE - 3))}`;
  }
  return `${d}L${W} ${BASE}L${W + 4} ${BASE}L${W + 4} ${H + 8}Z`;
}

const shapes = Array.from({ length: SHAPES }, (_, i) => ridgePath(i + 1));

// Ends at the later of `load` (+ webfonts) and a short minimum, so the scene
// registers instead of flashing; a hard cap means a stuck request can never
// hold the page hostage. Hidden tabs and reduced motion skip the theatre.
const script = `(function(){
var d=document.documentElement,quiet=document.hidden||matchMedia("(prefers-reduced-motion: reduce)").matches;
var MIN=quiet?0:1300,EXIT=quiet?0:800,done=false;
d.classList.add("is-loading");
function finish(){if(done)return;done=true;d.classList.remove("is-loading");d.classList.add("is-leaving");dispatchEvent(new Event("site:ready"));setTimeout(function(){d.classList.remove("is-leaving")},EXIT)}
function settle(){setTimeout(finish,Math.max(0,MIN-performance.now()))}
var loaded=new Promise(function(r){document.readyState==="complete"?r():addEventListener("load",r,{once:true})});
Promise.all([loaded,document.fonts&&document.fonts.ready]).then(settle,settle);
setTimeout(finish,6000);
})();`;

export function Loader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="loader on-blue" aria-hidden="true">
        {/* Same place and type as the navbar's brand mark, so the page
            underneath picks up exactly where the overlay leaves off. */}
        <div className="shell flex h-16 items-center">
          <span className="wide text-[0.95rem] font-extrabold tracking-[-0.01em]">
            Abdulaziz Yusupaliev
          </span>
        </div>

        <div className="loader-center">
          <div className="loader-figure">
            {/* Same header as the hero's transcriber: a label and a clock. */}
            <p className="loader-meta meta">
              <span className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-white" />
                Decoding the page
              </span>
              <span className="loader-time tabular" />
            </p>
            <div className="loader-stage">
              <svg width="0" height="0" className="absolute">
                <defs>
                  {shapes.map((d, k) => (
                    <path key={k} id={`loader-ridge-${k}`} d={d} vectorEffect="non-scaling-stroke" />
                  ))}
                </defs>
              </svg>
              <div className="loader-floor" style={{ "--n": RIDGES } as React.CSSProperties}>
                {Array.from({ length: RIDGES }, (_, i) => (
                  <svg
                    key={i}
                    className="loader-ridge"
                    style={{ "--i": i } as React.CSSProperties}
                    viewBox={`0 0 ${W} ${H}`}
                    preserveAspectRatio="none"
                  >
                    <use
                      href={`#loader-ridge-${i % SHAPES}`}
                      transform={i >= SHAPES ? `matrix(-1 0 0 1 ${W} 0)` : undefined}
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
