export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="dot-grid absolute inset-0 opacity-[0.4]"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 50% 30%, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 30%, black 0%, transparent 72%)",
        }}
      />
      <div
        className="scanlines absolute inset-0 opacity-[0.5]"
        style={{
          maskImage:
            "radial-gradient(130% 100% at 50% 20%, black 0%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(130% 100% at 50% 20%, black 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[18%] h-[26rem] w-[38rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: "var(--accent)" }}
      />
      <div className="hero-frame absolute inset-x-4 bottom-8 top-24 border border-white/[0.035] sm:inset-x-8" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
