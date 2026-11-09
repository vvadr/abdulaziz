import { seeded } from "@/lib/utils";

/* First-visit intro, in three beats:
     1. Listening: a 3D "waterfall" of speech waveforms swoops into view.
        Each ridge is recorded at the front edge and recedes, the way an
        audio waterfall plot scrolls.
     2. Decoding: the waterfall dims and the name is typed out, caret and
        all, in the exact spot the hero's h1 occupies underneath.
     3. Hand-off: the panel clears from the top down, revealing the real
        heading where the decoded one was.
   It is pure CSS (see .loader-* / .intro-* in globals.css), so it plays
   from the first paint, before any JavaScript arrives. The inline script
   only decides whether it plays (once per tab) and when it ends.

   States live on <html>, set by the script, never on React-managed nodes,
   so hydration sees untouched markup:
     is-loading    → intro up, the page's own entrance paused
     is-leaving    → panel clearing, the page's entrance plays
     intro-played  → the hero name skips its rise (it was just decoded)
   Without JavaScript none of these are set, so the intro never shows. */

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

// Plays once per tab session; reloads and in-site links go straight to the
// page. Ends at the later of the sequence (~2.4 s) and `load` + webfonts,
// capped at 6.5 s; any click or key skips it. While it plays, the decoded
// name is kept on the hero h1's exact position: re-measured every 150 ms
// (the h1 moves as the page hydrates), from the base position under any
// nudge already applied. Hidden tabs and reduced motion skip it entirely.
const script = `(function(){
var d=document.documentElement,K="ay-intro",seen=false;
try{seen=sessionStorage.getItem(K)==="1"}catch(e){}
if(seen||document.hidden||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var MIN=2500,EXIT=800,done=false;
d.classList.add("is-loading","intro-played");
function align(){var h=document.getElementById("hero-title"),n=document.querySelector(".intro-name");if(!h||!n||scrollY>0)return;var a=h.getBoundingClientRect(),b=n.getBoundingClientRect(),t=getComputedStyle(n).translate.split(" "),dx=a.left-(b.left-(parseFloat(t[0])||0)),dy=a.top-(b.top-(parseFloat(t[1])||0));if(Math.abs(dx)>120||Math.abs(dy)>240)return;d.style.setProperty("--intro-x",dx+"px");d.style.setProperty("--intro-y",dy+"px")}
var tracking=setInterval(align,150);
function finish(){if(done)return;done=true;clearInterval(tracking);align();removeEventListener("pointerdown",finish);removeEventListener("keydown",finish);try{sessionStorage.setItem(K,"1")}catch(e){}d.classList.remove("is-loading");d.classList.add("is-leaving");dispatchEvent(new Event("site:ready"));setTimeout(function(){d.classList.remove("is-leaving")},EXIT);setTimeout(function(){d.classList.remove("intro-played");d.style.removeProperty("--intro-x");d.style.removeProperty("--intro-y")},EXIT+1500)}
function settle(){setTimeout(finish,Math.max(0,MIN-performance.now()))}
var loaded=new Promise(function(r){document.readyState==="complete"?r():addEventListener("load",r,{once:true})});
Promise.all([loaded,document.fonts&&document.fonts.ready]).then(settle,settle);
setTimeout(finish,6500);
addEventListener("pointerdown",finish);addEventListener("keydown",finish);
})();`;

const line = (d: number, t: number, n: number) =>
  ({ "--d": `${d}ms`, "--t": `${t}ms`, "--n": n }) as React.CSSProperties;

export function Loader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="loader on-blue" aria-hidden="true">
        {/* Same box as the navbar (h-16 + its 1px border), so the brand mark
            and everything below line up with the page underneath. */}
        <div className="shell flex h-16 items-center justify-between border-b border-transparent">
          <span className="wide text-[0.95rem] font-extrabold tracking-[-0.01em]">
            Abdulaziz Yusupaliev
          </span>
          <span className="meta text-blue-pale">
            <span className="hidden sm:inline">Click or press any key to skip</span>
            <span className="sm:hidden">Tap to skip</span>
          </span>
        </div>

        {/* Beat one: listening. */}
        <div className="loader-center">
          <div className="loader-figure">
            {/* Same header as the hero's transcriber: a label and a clock. */}
            <p className="loader-meta meta">
              <span className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-white" />
                Listening
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
              <div className="loader-camera">
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

        {/* Beat two: the name, decoded where the hero's h1 sits, under a
            status line where the hero's own status line sits. The wrapper
            mirrors the hero's spacing; the script trims the last pixels. */}
        <div className="intro-name-wrap shell pt-8 sm:pt-12">
          <p className="intro-status meta flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-white" />
            Decoding
          </p>
          <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12">
            <p className="name intro-name lg:col-span-7">
              <span className="intro-line" style={line(1100, 450, 9)}>
                <span>Abdulaziz</span>
              </span>
              <span className="intro-line" style={line(1500, 500, 10)}>
                <span>Yusupaliev</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
