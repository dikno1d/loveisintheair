'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function fibonacciSphere(samples: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(new THREE.Vector3(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ));
  }
  return points;
}

function RosePetal({ index, total, color, petalScale }: { index: number; total: number; color: string; petalScale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const layer = Math.floor(index / 5);
  const layerAngle = angle + layer * 0.3;
  const dist = 0.3 + layer * 0.12;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.08;
    }
  });

  const petalShape = useMemo(() => {
    const shape = new THREE.Shape();
    const s = petalScale;
    shape.moveTo(0, 0);
    shape.bezierCurveTo(s * 0.3, s * 0.4, s * 0.6, s * 0.8, s * 0.1, s * 1.2);
    shape.bezierCurveTo(-s * 0.1, s * 1.0, -s * 0.3, s * 0.6, 0, 0);
    return shape;
  }, [petalScale]);

  return (
    <mesh
      ref={meshRef}
      position={[
        Math.cos(layerAngle) * dist,
        layer * 0.08,
        Math.sin(layerAngle) * dist,
      ]}
      rotation={[
        -Math.PI / 2 + 0.4 + layer * 0.15,
        layerAngle,
        Math.sin(index * 1.7) * 0.2,
      ]}
    >
      <shapeGeometry args={[petalShape]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function Rose({ position, color, petalCount, petalScale }: {
  position: [number, number, number];
  color: string;
  petalCount: number;
  petalScale: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[2]) * 0.08;
    }
  });

  const pistils = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = 30;
    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < n; i++) {
      const y = (i / n) * 0.25;
      const r = (1 - i / n) * 0.12;
      const theta = phi * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
    }
    return pts;
  }, []);

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: petalCount }, (_, i) => (
        <RosePetal key={i} index={i} total={petalCount} color={color} petalScale={petalScale} />
      ))}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#f0c870" emissive="#f0c870" emissiveIntensity={0.4} />
      </mesh>
      {pistils.map((p, i) => (
        <mesh key={i} position={[p.x, p.y + 0.15, p.z]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshStandardMaterial color="#e8a0bf" emissive="#e8a0bf" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Stem({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const curve = useMemo(() => {
    const mid: [number, number, number] = [
      (start[0] + end[0]) / 2 + Math.sin(start[0] * 3) * 0.08,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2 + Math.cos(start[2] * 3) * 0.08,
    ];
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end),
    );
  }, [start, end]);

  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 20, 0.012, 6, false);
  }, [curve]);

  return (
    <mesh geometry={tubeGeo}>
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

function Leaf({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.08, 0.06, 0.12, 0.15, 0.04, 0.25);
    s.bezierCurveTo(0, 0.22, -0.04, 0.12, 0, 0);
    return s;
  }, []);

  return (
    <mesh position={position} rotation={rotation}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color="#3a7a3a" side={THREE.DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 4 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sz[i] = Math.random() * 0.03 + 0.01;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.0003;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#e8a0bf"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function ButterflyMesh({ offset }: { offset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + offset;
    groupRef.current.position.x = Math.sin(t * 0.4) * 1.5;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.5 + 1;
    groupRef.current.position.z = Math.cos(t * 0.3) * 1.2;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.5;
    if (leftWingRef.current && rightWingRef.current) {
      const wing = Math.sin(t * 8) * 0.6;
      leftWingRef.current.rotation.y = wing;
      rightWingRef.current.rotation.y = -wing;
    }
  });

  const wingShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.12, 0.08, 0.2, 0.18, 0.15, 0.25);
    s.bezierCurveTo(0.08, 0.3, 0, 0.2, 0, 0);
    return s;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.008, 0.1, 4, 8]} />
        <meshStandardMaterial color="#2a1a3a" />
      </mesh>
      <mesh ref={leftWingRef} position={[0, 0.02, 0]} rotation={[0, 0, 0.3]}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color="#e8a0bf" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
      <mesh ref={rightWingRef} position={[0, 0.02, 0]} rotation={[0, Math.PI, 0.3]}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color="#d4a574" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function GardenScene() {
  const roses = useMemo(() => [
    { pos: [-1.8, 0, 0] as [number, number, number], color: '#e8a0bf', petals: 18, scale: 0.22 },
    { pos: [-0.8, 0.2, 0.5] as [number, number, number], color: '#ff69b4', petals: 20, scale: 0.2 },
    { pos: [0.2, -0.1, -0.3] as [number, number, number], color: '#d4a574', petals: 16, scale: 0.25 },
    { pos: [1.0, 0.15, 0.2] as [number, number, number], color: '#9b72cf', petals: 22, scale: 0.18 },
    { pos: [1.8, -0.05, -0.4] as [number, number, number], color: '#ff6b8a', petals: 19, scale: 0.21 },
    { pos: [0, 0.3, 0.8] as [number, number, number], color: '#f0c4d8', petals: 17, scale: 0.23 },
    { pos: [-1.2, -0.2, -0.6] as [number, number, number], color: '#c77dba', petals: 21, scale: 0.19 },
    { pos: [0.7, 0.1, -0.7] as [number, number, number], color: '#ffb7c5', petals: 15, scale: 0.24 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} color="#f0c870" />
      <pointLight position={[-2, 2, 1]} intensity={0.4} color="#e8a0bf" />
      <pointLight position={[2, 1, -1]} intensity={0.3} color="#9b72cf" />

      {roses.map((r, i) => (
        <group key={i}>
          <Stem start={[r.pos[0], -1.5, r.pos[2]]} end={r.pos} color="#3a6a3a" />
          <Leaf position={[r.pos[0] + 0.1, r.pos[1] - 0.5, r.pos[2] + 0.05]} rotation={[0.3, i, 0.5]} />
          <Leaf position={[r.pos[0] - 0.08, r.pos[1] - 0.8, r.pos[2] - 0.05]} rotation={[-0.2, i + 1, -0.4]} />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Rose position={r.pos} color={r.color} petalCount={r.petals} petalScale={r.scale} />
          </Float>
        </group>
      ))}

      <ButterflyMesh offset={0} />
      <ButterflyMesh offset={2.5} />
      <ButterflyMesh offset={5} />

      <FloatingParticles />
    </>
  );
}

export default function FlowerScene3D() {
  return (
    <div style={{
      width: '100%',
      height: 'clamp(300px, 50vw, 500px)',
      position: 'relative',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        style={{ borderRadius: '24px' }}
        gl={{ antialias: true, alpha: true }}
      >
        <GardenScene />
      </Canvas>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(180deg, transparent, rgba(15,26,18,0.8))',
        borderRadius: '0 0 24px 24px',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
