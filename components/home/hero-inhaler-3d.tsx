"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";

function InhalerModel(props: any) {
  return (
    <group {...props} dispose={null}>
      {/* Boot extending down */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.5, 0.45, 1.6, 32]} />
        <meshPhysicalMaterial color="#0808b2" roughness={0.3} clearcoat={0.5} />
      </mesh>

      {/* Boot Base rounded */}
      <mesh position={[0, -1.4, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#0808b2" roughness={0.3} clearcoat={0.5} />
      </mesh>

      {/* Mouthpiece */}
      <mesh position={[0, -0.9, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 1.2, 32]} />
        <meshPhysicalMaterial color="#0808b2" roughness={0.3} clearcoat={0.5} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, -0.9, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.1, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.5} clearcoat={0.1} />
      </mesh>

      {/* Canister */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.8, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Top */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function HeroInhaler3D() {
  // 📱 breakpoints
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  // 🎯 responsive values
  const scale = isMobile ? 0.9 : isTablet ? 1.1 : 1.3;
  const cameraPosition = isMobile
    ? [3, 2, 4]
    : isTablet
    ? [4, 2, 5]
    : [5, 2, 6];

  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: cameraPosition as [number, number, number], fov: 45 }}
        dpr={[1, 2]} // ⚡ performance optimization
      >
        <Suspense fallback={null}>
          <Environment preset="city" />

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <InhalerModel scale={scale} />
          </Float>

          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={isMobile ? 6 : 10}
            blur={2.5}
            far={4}
            color="#0808b2"
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!isMobile} // 📱 disable on mobile for UX
            autoRotateSpeed={1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}