/** Cinematic letterbox fades at the viewport edges. Kept below the navbar
 *  (the reference stacked them above it, dimming the nav). */
export function Letterbox() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-letterbox)] h-[6vh] bg-gradient-to-b from-black to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[var(--z-letterbox)] h-[6vh] bg-gradient-to-t from-black to-transparent"
      />
    </>
  );
}
