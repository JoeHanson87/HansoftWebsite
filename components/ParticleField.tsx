"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a * 1664525 + 1013904223) % 4294967296;
    return a / 4294967296;
  };
}

function step(positions: Float32Array, velocities: Float32Array, count: number, mx: number, my: number) {
  for (let i = 0; i < count; i++) {
    const k = i * 3;
    positions[k] += velocities[k];
    positions[k + 1] += velocities[k + 1];
    positions[k + 2] += velocities[k + 2];
    if (Math.abs(positions[k]) > 8) velocities[k] *= -1;
    if (Math.abs(positions[k + 1]) > 4.5) velocities[k + 1] *= -1;
    if (Math.abs(positions[k + 2]) > 3) velocities[k + 2] *= -1;
    const dx = positions[k] - mx;
    const dy = positions[k + 1] - my;
    if (dx * dx + dy * dy < 2.5) {
      positions[k] += dx * 0.02;
      positions[k + 1] += dy * 0.02;
    }
  }
}

function buildLines(positions: Float32Array, out: Float32Array, count: number, maxLines: number) {
  let n = 0;
  for (let i = 0; i < count && n < maxLines; i++) {
    for (let j = i + 1; j < count && n < maxLines; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < 1.6) {
        out.set(positions.subarray(i * 3, i * 3 + 3), n * 6);
        out.set(positions.subarray(j * 3, j * 3 + 3), n * 6 + 3);
        n++;
      }
    }
  }
  return n;
}

function Field({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);

  const data = useMemo(() => {
    const random = rng(42);
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color("#22d3ee"), new THREE.Color("#8b5cf6"), new THREE.Color("#e879f9")];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 16;
      positions[i * 3 + 1] = (random() - 0.5) * 9;
      positions[i * 3 + 2] = (random() - 0.5) * 6;
      velocities[i * 3] = (random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (random() - 0.5) * 0.002;
      const c = palette[i % 3];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, velocities, colors };
  }, [count]);

  const maxLines = count * 6;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((state) => {
    step(data.positions, data.velocities, count, state.pointer.x * 8, state.pointer.y * 4.5);
    const n = buildLines(data.positions, linePositions, count, maxLines);
    if (points.current) {
      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
    if (lines.current) {
      lines.current.geometry.setDrawRange(0, n * 2);
      lines.current.geometry.attributes.position.needsUpdate = true;
      lines.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
}

export default function ParticleField() {
  const count = useMemo(() => {
    if (typeof window === "undefined") return 90;
    return window.innerWidth < 768 ? 60 : 130;
  }, []);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
      <Field count={count} />
    </Canvas>
  );
}
