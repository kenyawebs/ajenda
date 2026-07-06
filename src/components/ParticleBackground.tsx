import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 800;
  const mesh = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!mesh.current) return;
    const posArr = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(posArr[i * 3]) > 20) velocities[i * 3] *= -1;
      if (Math.abs(posArr[i * 3 + 1]) > 20) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArr[i * 3 + 2]) > 10) velocities[i * 3 + 2] *= -1;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0002;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial size={0.03} color="#DAA520" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function ConnectingLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const particleCount = 80;

  const geometry = useMemo(() => {
    const pos: number[] = [];
    const particles: THREE.Vector3[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10));
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = particles[i].distanceTo(particles[j]);
        if (dist < 5) {
          pos.push(particles[i].x, particles[i].y, particles[i].z, particles[j].x, particles[j].y, particles[j].z);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pos), 3));
    return geo;
  }, []);

  useFrame(() => { if (lineRef.current) lineRef.current.rotation.y += 0.0003; });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#00CED1" transparent opacity={0.08} />
    </lineSegments>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.3} />
        <Particles />
        <ConnectingLines />
      </Canvas>
    </div>
  );
}
