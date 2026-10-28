"use client";

import { useEffect, useRef, useState } from "react";
import { greetings } from "@/data/site";
import { prefersReducedMotion } from "@/lib/utils";

// Canvas can't read CSS variables cheaply per frame; these mirror
// --blue and --wave-idle in app/globals.css.
const DECODED = "#2349d7";
const IDLE = "#c5cddf";

const BAR = 3; // bar width, css px
const PITCH = 6; // bar + gap
const MAX_BARS_PER_CHAR = 4;
const SECONDS_ACROSS = 2.4; // pretend audio length spanning the canvas
const HOLD_MS = 1500;

/** Deterministic noise so the same word always draws the same waveform. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** A speech-like amplitude envelope: low room noise, then one burst per
 *  character (vowels louder, spaces silent), then room noise again. */
function buildWave(word: string, totalBars: number) {
  const rand = seeded(word.length * 7919 + word.charCodeAt(0));
  const amps = new Array<number>(totalBars).fill(0).map(() => 0.04 + rand() * 0.05);
  // Long greetings on narrow canvases get fewer bars per character, so the
  // whole word always fits and every character gets decoded.
  const perChar = Math.max(1, Math.min(MAX_BARS_PER_CHAR, Math.floor((totalBars * 0.8) / word.length)));
  const wordBars = word.length * perChar;
  const start = Math.max(2, Math.round((totalBars - wordBars) * 0.3));
  // Bar index where each character finishes — drives the decoded text.
  const charEnds: number[] = [];

  [...word].forEach((char, i) => {
    const vowel = /[aeiouаеёиоуыэюя]/i.test(char);
    const silent = char === " ";
    for (let b = 0; b < perChar; b++) {
      const idx = start + i * perChar + b;
      if (idx >= totalBars) break;
      const shape = Math.sin(((b + 0.5) / perChar) * Math.PI);
      const peak = silent ? 0.06 : vowel ? 0.75 + rand() * 0.25 : 0.3 + rand() * 0.35;
      amps[idx] = Math.max(0.05, peak * (0.55 + 0.45 * shape));
    }
    charEnds.push(Math.min(totalBars, start + (i + 1) * perChar));
  });

  return { amps, charEnds };
}

function formatTime(seconds: number) {
  const s = Math.max(0, seconds);
  return `00:${s.toFixed(2).padStart(5, "0")}`;
}

/** Decorative: a waveform swept by a playhead that "decodes" a greeting in
 *  several languages — a nod to the speech-recognition work. Hidden from
 *  assistive tech; the hero heading carries the meaning. */
export function Transcriber() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [index, setIndex] = useState(0);
  const [decoded, setDecoded] = useState(greetings[0].text.length);
  const [time, setTime] = useState(SECONDS_ACROSS);

  useEffect(() => {
    const el = canvas.current;
    const box = wrap.current;
    if (!el || !box) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let totalBars = 0;
    let wave = buildWave(greetings[0].text, 1);
    let word = 0;
    let progress = 1; // 0..1 playhead position
    let raf = 0;
    let timer = 0;
    let sweepStart = 0;
    let sweepMs = 0;
    let visible = true;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mid = height / 2;
      const head = progress * width;
      for (let i = 0; i < totalBars; i++) {
        const x = i * PITCH;
        const h = Math.max(2, wave.amps[i] * (height - 8));
        ctx.fillStyle = x + BAR <= head ? DECODED : IDLE;
        ctx.fillRect(x, mid - h / 2, BAR, h);
      }
      if (progress > 0 && progress < 1) {
        ctx.fillStyle = "#101524";
        ctx.fillRect(Math.round(head), 0, 1.5, height);
      }
    };

    const charsAt = (p: number) => {
      if (p >= 1) return wave.charEnds.length;
      const headBar = (p * width) / PITCH;
      return wave.charEnds.filter((end) => end <= headBar).length;
    };

    const resize = () => {
      const rect = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      el.width = width * dpr;
      el.height = height * dpr;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      totalBars = Math.floor(width / PITCH);
      wave = buildWave(greetings[word].text, totalBars);
      draw();
    };

    const frame = (now: number) => {
      progress = Math.min(1, (now - sweepStart) / sweepMs);
      draw();
      setDecoded(charsAt(progress));
      setTime(progress * SECONDS_ACROSS);
      if (progress < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
        timer = window.setTimeout(next, HOLD_MS);
      }
    };

    const sweep = () => {
      if (!visible) return;
      running = true;
      sweepStart = performance.now();
      raf = requestAnimationFrame(frame);
    };

    function next() {
      word = (word + 1) % greetings.length;
      wave = buildWave(greetings[word].text, totalBars);
      progress = 0;
      // Set here, not in sweep(), so a resume after pausing between words
      // uses this word's duration.
      sweepMs = 1500 + greetings[word].text.length * 45;
      setIndex(word);
      setDecoded(0);
      setTime(0);
      draw();
      timer = window.setTimeout(sweep, 250);
    }

    const pause = () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      running = false;
    };

    const resume = () => {
      if (reduced || running || !visible || document.hidden) return;
      // Finish the current word from where it stopped, or move on.
      if (progress < 1) {
        sweepStart = performance.now() - progress * sweepMs;
        running = true;
        raf = requestAnimationFrame(frame);
      } else {
        clearTimeout(timer);
        timer = window.setTimeout(next, HOLD_MS);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(box);
    resize();

    if (reduced) {
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume();
      else pause();
    });
    io.observe(box);

    const onVisibility = () => (document.hidden ? pause() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    // The first word starts fully decoded; the observer's first callback
    // calls resume(), which schedules the next word.
    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const greeting = greetings[index];
  const shown = [...greeting.text].slice(0, decoded).join("");
  const done = decoded >= greeting.text.length;

  return (
    <div aria-hidden="true" className="@container select-none">
      <div className="meta flex items-center justify-between text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-blue" />
          Decoding greeting
        </span>
        <span className="tabular">{formatTime(time)}</span>
      </div>

      <div ref={wrap} className="mt-3 h-20 w-full sm:h-24">
        <canvas ref={canvas} className="block" />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink pt-3">
        {/* Sized to the container so "Assalomu alaykum" fits its cell. */}
        <p className="display-m min-h-[1.1em] truncate text-[min(2.25rem,7.2cqi)]" lang={greeting.lang}>
          {shown}
          <span
            className={`ml-0.5 inline-block h-[0.8em] w-[0.08em] translate-y-[0.08em] bg-blue ${done ? "animate-pulse" : ""}`}
          />
        </p>
        <span className="meta shrink-0 rounded-full border border-ink px-2.5 py-0.5 uppercase">
          {greeting.lang}
        </span>
      </div>
    </div>
  );
}
