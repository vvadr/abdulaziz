// Particle target-shape generators for the morphing background cloud.
// Each returns count * 3 floats; the cloud lerps between consecutive shapes
// as the page scrolls: sphere → torus → helix → lattice → galaxy → knot.

export function genSphere(count: number, radius = 4.8): Float32Array {
  const arr = new Float32Array(count * 3);
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = golden * i;
    const r = radius + (Math.random() - 0.5) * 0.7;
    arr[i * 3] = r * Math.cos(theta) * Math.sin(phi);
    arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

export function genTorus(count: number, R = 4): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const r = 1.15 * Math.sqrt(Math.random());
    arr[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    arr[i * 3 + 1] = r * Math.sin(v) * 1.1;
    arr[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
  }
  return arr;
}

export function genHelix(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const kind = i % 10;
    const t = Math.random();
    const y = (t - 0.5) * 9;
    if (kind < 8) {
      // Two intertwined strands.
      const a = y * 1.35 + (kind < 4 ? 0 : Math.PI);
      arr[i * 3] = Math.cos(a) * 1.9 + (Math.random() - 0.5) * 0.3;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(a) * 1.9 + (Math.random() - 0.5) * 0.3;
    } else {
      // Rungs between the strands.
      const step = Math.round(y * 2) / 2;
      const a = step * 1.35;
      const k = Math.random() * 2 - 1;
      arr[i * 3] = Math.cos(a) * 1.9 * k;
      arr[i * 3 + 1] = step + (Math.random() - 0.5) * 0.12;
      arr[i * 3 + 2] = Math.sin(a) * 1.9 * k;
    }
  }
  return arr;
}

export function genLattice(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const side = 7;
  const spacing = 1.25;
  const half = ((side - 1) * spacing) / 2;
  for (let i = 0; i < count; i++) {
    const xi = i % side;
    const yi = Math.floor(i / side) % side;
    const zi = Math.floor(i / (side * side)) % side;
    arr[i * 3] = xi * spacing - half + (Math.random() - 0.5) * 0.16;
    arr[i * 3 + 1] = yi * spacing - half + (Math.random() - 0.5) * 0.16;
    arr[i * 3 + 2] = zi * spacing - half + (Math.random() - 0.5) * 0.16;
  }
  return arr;
}

export function genGalaxy(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const arms = 3;
  for (let i = 0; i < count; i++) {
    const arm = i % arms;
    const r = Math.pow(Math.random(), 0.65) * 5.2;
    const spin = r * 1.15;
    const angle =
      (arm / arms) * Math.PI * 2 + spin + (Math.random() - 0.5) * (0.55 - r * 0.07);
    const spread = (5.2 - r) * 0.09;
    arr[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.25;
    arr[i * 3 + 1] = (Math.random() - 0.5) * (0.4 + spread);
    arr[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.25;
  }
  return arr;
}

export function genTorusKnot(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const p = 2;
  const q = 3;
  const s = 1.25;
  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = 2 + Math.cos(q * t);
    arr[i * 3] = r * Math.cos(p * t) * s + (Math.random() - 0.5) * 0.45;
    arr[i * 3 + 1] = -Math.sin(q * t) * 1.4 * s + (Math.random() - 0.5) * 0.45;
    arr[i * 3 + 2] = r * Math.sin(p * t) * s + (Math.random() - 0.5) * 0.45;
  }
  return arr;
}

export function buildTargets(count: number) {
  return [
    genSphere(count),
    genTorus(count),
    genHelix(count),
    genLattice(count),
    genGalaxy(count),
    genTorusKnot(count),
  ];
}
