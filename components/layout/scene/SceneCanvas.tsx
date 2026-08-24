"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-state";
import { MorphingCloud } from "./MorphingCloud";

// Gold ↔ blue sequence the cloud lerps through, one color per shape stage.
const CINEMA = ["#ffb703", "#2196f3", "#fbc02d", "#4dabf7", "#f57c00", "#ffb703"];

/** Slow dolly — the camera pushes in and sways as the page scrolls. */
function CameraRig() {
  const smooth = useRef(0);
  useFrame((state, delta) => {
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      scrollState.progress,
      1.8,
      delta,
    );
    const p = smooth.current;
    const z = 16 - p * 10;
    const x = Math.sin(p * Math.PI * 1.5) * 3.5 + state.pointer.x * 0.5;
    const y = 1.2 + Math.cos(p * Math.PI) * 1.8 + state.pointer.y * 0.35;
    state.camera.position.set(x, y, z);
    state.camera.lookAt(0, 0, 0);
    const cam = state.camera as THREE.PerspectiveCamera;
    cam.fov = THREE.MathUtils.lerp(cam.fov, 48 - p * 6, 0.04);
    cam.updateProjectionMatrix();
  });
  return null;
}

/** Two thin orbit rings — the halo visible around the hero name. */
function OrbitRings({ low }: { low: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });
  return (
    <group ref={ref}>
      {[
        { r: 9, tilt: 1.4, color: "#ffb703", opacity: 0.25 },
        { r: 11, tilt: -0.5, color: "#2196f3", opacity: 0.18 },
      ].map((ring, i) => (
        <mesh key={i} rotation-x={ring.tilt}>
          <torusGeometry args={[ring.r, 0.015, 6, low ? 48 : 80]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SceneCanvas({ low }: { low: boolean }) {
  return (
    <Canvas
      camera={{ fov: 48, near: 0.1, far: 90, position: [0, 1.2, 16] }}
      dpr={low ? 1 : [1, 1.5]}
      gl={{
        antialias: false,
        stencil: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <color attach="background" args={["#000002"]} />
      <fog attach="fog" args={["#000002", 12, 45]} />
      <ambientLight intensity={0.4} />

      <CameraRig />

      <MorphingCloud
        count={low ? 2200 : 4800}
        colors={CINEMA}
        size={low ? 0.1 : 0.11}
        spinSpeed={0.05}
        scale={1.45}
      />

      <OrbitRings low={low} />

      {low ? (
        <Stars
          radius={90}
          depth={60}
          count={350}
          factor={3.5}
          saturation={0.6}
          fade
          speed={0.2}
        />
      ) : (
        <>
          <Sparkles count={35} scale={22} size={3.5} speed={0.25} color="#ffb703" />
          <Stars
            radius={90}
            depth={60}
            count={800}
            factor={4}
            saturation={0.75}
            fade
            speed={0.3}
          />
          <EffectComposer multisampling={0}>
            <Bloom
              mipmapBlur
              intensity={1.1}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.7}
            />
            <Vignette eskil={false} offset={0.15} darkness={0.95} />
          </EffectComposer>
        </>
      )}
    </Canvas>
  );
}
