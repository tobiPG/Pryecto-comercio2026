"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import type { Group } from "three";

/**
 * Modelo 3D real del producto más vendido: un anillo (banda + gema)
 * que se puede ver desde cualquier ángulo, no una foto plana. Gira
 * solo y el usuario puede arrastrarlo para verlo en volumen completo.
 */
function Ring() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Rotación idle suave; el drag del OrbitControls se suma encima
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={groupRef} rotation={[-0.55, 0, 0]}>
        {/* Banda del anillo */}
        <mesh castShadow>
          <torusGeometry args={[1, 0.16, 32, 100]} />
          <meshPhysicalMaterial
            color="#d8b676"
            metalness={0.9}
            roughness={0.15}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
            envMapIntensity={2}
          />
        </mesh>

        {/* Gema engastada en la banda */}
        <mesh position={[0, 1.02, 0]} castShadow>
          <icosahedronGeometry args={[0.56, 0]} />
          <meshPhysicalMaterial
            flatShading
            color="#f2e2c0"
            metalness={0.3}
            roughness={0.08}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
            envMapIntensity={2.2}
          />
        </mesh>

        {/* Pequeñas garras que sostienen la gema, para lectura de "anillo" */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 4) * Math.PI * 2) * 0.42,
              1.02,
              Math.sin((i / 4) * Math.PI * 2) * 0.42,
            ]}
          >
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshPhysicalMaterial
              color="#d8b676"
              metalness={0.9}
              roughness={0.2}
              envMapIntensity={2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function HeroRing3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!touch-none"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={1.6} color="#d8b676" />
      <pointLight position={[0, 3, 2]} intensity={2} color="#e8cfa0" />
      <pointLight position={[-3, -1, 2]} intensity={1.2} color="#ffffff" />

      <Suspense fallback={null}>
        <Ring />
        <Environment preset="studio" background={false} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
      />
    </Canvas>
  );
}
