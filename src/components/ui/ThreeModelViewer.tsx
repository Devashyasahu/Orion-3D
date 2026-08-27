import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function AtelierFigureStage({ accentColor = '#7dd3fc' }: { accentColor?: string }) {
  const figureGroup = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (figureGroup.current) {
      figureGroup.current.rotation.y += delta * 0.25;
      figureGroup.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }
  });

  return (
    <group>
      {/* Studio Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 5]} intensity={2.2} color="#ffffff" castShadow />
      <pointLight position={[-4, 3, -2]} intensity={3.5} color={accentColor} />
      <pointLight position={[4, -1, 3]} intensity={2.0} color="#f9a8d4" />

      {/* Floating Hero Sculpt Pedestal */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={figureGroup} position={[0, 0.4, 0]}>
          {/* Main Sculpted Figure Torso / Silhouette representation */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.35, 0.55, 1.8, 16]} />
            <meshStandardMaterial
              color="#1e293b"
              roughness={0.28}
              metalness={0.65}
            />
          </mesh>

          {/* Shoulders & Cloak gesture */}
          <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 8]}>
            <boxGeometry args={[1.5, 0.3, 0.6]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.25} roughness={0.3} />
          </mesh>

          {/* Crown / Head sculptural detail */}
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[0.35, 0.6, 8]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.8} />
          </mesh>

          {/* Sculpt aura ring */}
          <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2, 0.03, 16, 64]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} transparent opacity={0.6} />
          </mesh>
        </group>
      </Float>

      {/* Physical Studio Pedestal Base */}
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[1.8, 2.2, 0.4, 32]} />
        <meshStandardMaterial color="#0b1329" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, -1.38, 0]}>
        <cylinderGeometry args={[1.65, 1.65, 0.04, 32]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
    </group>
  );
}

export const ThreeModelViewer: React.FC<{ accentColor?: string }> = ({ accentColor = '#7dd3fc' }) => {
  return (
    <div className="w-full h-[400px] md:h-[550px] relative">
      <Canvas
        camera={{ position: [0, 1.2, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <AtelierFigureStage accentColor={accentColor} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 pointer-events-none text-[10px] font-space tracking-[0.2em] text-white/50 uppercase">
        [ STUDIO FIGURE SCULPT STAGE — DRAG TO ROTATE ]
      </div>
    </div>
  );
};
