"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { Suspense } from "react";

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

            {/* Mouthpiece extending forward */}
            <mesh position={[0, -0.9, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.45, 1.2, 32]} />
                <meshPhysicalMaterial color="#0808b2" roughness={0.3} clearcoat={0.5} />
            </mesh>

            {/* Mouthpiece cap (white) */}
            <mesh position={[0, -0.9, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.42, 0.42, 0.1, 32]} />
                <meshPhysicalMaterial color="#ffffff" roughness={0.5} clearcoat={0.1} />
            </mesh>

            {/* Metal Canister on top */}
            <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 1.8, 32]} />
                <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Canister rounded top */}
            <mesh position={[0, 1.8, 0]}>
                <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
            </mesh>
        </group>
    );
}

export function HeroInhaler3D() {
    return (
        <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [5, 2, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <InhalerModel scale={1.2} />
                    </Float>

                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#0808b2" />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={1.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
