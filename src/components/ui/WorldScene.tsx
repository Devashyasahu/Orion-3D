import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

interface SceneConfig {
  key: string;
  fog: string;
  ambient: string;
  keyLight: string;
  fillLight: string;
  accent: string;
  floor: string;
  particleA: string;
  particleB: string;
  towerColor: string;
  mood: 'anime' | 'death-note' | 'anime-films' | 'mcu' | 'dc' | 'magic' | 'cartoon' | 'gaming' | 'originals' | 'studio';
}

const CONFIGS: Record<string, SceneConfig> = {
  anime: {
    key: 'anime',
    fog: '#bfe9ff',
    ambient: '#fff7dc',
    keyLight: '#ffba6b',
    fillLight: '#8fd3ff',
    accent: '#ff8abf',
    floor: '#7dd3fc',
    particleA: '#ffffff',
    particleB: '#ff9bcf',
    towerColor: '#d7f7ff',
    mood: 'anime',
  },
  'death-note': {
    key: 'death-note',
    fog: '#d7dee8',
    ambient: '#f8fafc',
    keyLight: '#ffffff',
    fillLight: '#7f1d1d',
    accent: '#ef4444',
    floor: '#f8fafc',
    particleA: '#ffffff',
    particleB: '#ef4444',
    towerColor: '#dfe7f2',
    mood: 'death-note',
  },
  'anime-films': {
    key: 'anime-films',
    fog: '#ffd7bc',
    ambient: '#fff1d6',
    keyLight: '#fb923c',
    fillLight: '#93c5fd',
    accent: '#f9a8d4',
    floor: '#fed7aa',
    particleA: '#ffffff',
    particleB: '#f9a8d4',
    towerColor: '#fed7aa',
    mood: 'anime-films',
  },
  mcu: {
    key: 'mcu',
    fog: '#9ad8ff',
    ambient: '#dbeafe',
    keyLight: '#60a5fa',
    fillLight: '#ef4444',
    accent: '#f87171',
    floor: '#60a5fa',
    particleA: '#93c5fd',
    particleB: '#f87171',
    towerColor: '#d7e3f5',
    mood: 'mcu',
  },
  dc: {
    key: 'dc',
    fog: '#8db9dc',
    ambient: '#cfe8ff',
    keyLight: '#7dd3fc',
    fillLight: '#f59e0b',
    accent: '#fbbf24',
    floor: '#38bdf8',
    particleA: '#9bdcff',
    particleB: '#fbbf24',
    towerColor: '#8ca8be',
    mood: 'dc',
  },
  'harry-potter': {
    key: 'harry-potter',
    fog: '#f6d992',
    ambient: '#fff2c7',
    keyLight: '#fbbf24',
    fillLight: '#a78bfa',
    accent: '#fde68a',
    floor: '#fbbf24',
    particleA: '#fde68a',
    particleB: '#c4b5fd',
    towerColor: '#d7c39a',
    mood: 'magic',
  },
  cartoon: {
    key: 'cartoon',
    fog: '#d7fff5',
    ambient: '#ffffff',
    keyLight: '#34d399',
    fillLight: '#f9a8d4',
    accent: '#facc15',
    floor: '#34d399',
    particleA: '#ffffff',
    particleB: '#facc15',
    towerColor: '#bff7e8',
    mood: 'cartoon',
  },
  gaming: {
    key: 'gaming',
    fog: '#c4b5fd',
    ambient: '#ede9fe',
    keyLight: '#a78bfa',
    fillLight: '#22d3ee',
    accent: '#8b5cf6',
    floor: '#a78bfa',
    particleA: '#ddd6fe',
    particleB: '#22d3ee',
    towerColor: '#c4b5fd',
    mood: 'gaming',
  },
  originals: {
    key: 'originals',
    fog: '#fbcfe8',
    ambient: '#fdf2f8',
    keyLight: '#f9a8d4',
    fillLight: '#7dd3fc',
    accent: '#ec4899',
    floor: '#f9a8d4',
    particleA: '#ffffff',
    particleB: '#ec4899',
    towerColor: '#f0abfc',
    mood: 'originals',
  },
  studio: {
    key: 'studio',
    fog: '#bdefff',
    ambient: '#dff8ff',
    keyLight: '#7dd3fc',
    fillLight: '#f0abfc',
    accent: '#facc15',
    floor: '#7dd3fc',
    particleA: '#ffffff',
    particleB: '#7dd3fc',
    towerColor: '#bfd7ea',
    mood: 'studio',
  },
};

function configFromPath(pathname: string): SceneConfig {
  if (pathname.includes('chainsaw') || pathname.includes('makima') || pathname.includes('denji') || pathname.includes('power') || pathname.includes('aki-hayakawa')) return CONFIGS['death-note'];
  if (pathname.includes('death-note') || pathname.includes('light-yagami') || pathname.includes('/el') || pathname.includes('misa') || pathname.includes('ryuk')) return CONFIGS['death-note'];
  if (pathname.includes('one-piece') || pathname.includes('zoro') || pathname.includes('luffy') || pathname.includes('sanji')) return CONFIGS.anime;
  if (pathname.includes('dc') || pathname.includes('batman') || pathname.includes('joker') || pathname.includes('superman') || pathname.includes('flash') || pathname.includes('green-lantern') || pathname.includes('krypto')) return CONFIGS.dc;
  if (pathname.includes('marvel') || pathname.includes('deadpool')) return CONFIGS.mcu;
  if (pathname.includes('wizarding') || pathname.includes('harry-potter') || pathname.includes('voldemort') || pathname.includes('dumbledore') || pathname.includes('hermione') || pathname.includes('ron-weasley') || pathname.includes('hagrid')) return CONFIGS['harry-potter'];
  if (pathname.includes('studio') || pathname.includes('custom')) return CONFIGS.studio;
  return CONFIGS.studio;
}

function Particles({ config }: { config: SceneConfig }) {
  const points = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 520;
    const pos = new Float32Array(count * 3);
    const color = new Float32Array(count * 3);
    const a = new THREE.Color(config.particleA);
    const b = new THREE.Color(config.particleB);
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 38;
      pos[i * 3 + 1] = Math.random() * 14 - 2;
      pos[i * 3 + 2] = Math.random() * -36;
      const mixed = a.clone().lerp(b, Math.random());
      color[i * 3] = mixed.r;
      color[i * 3 + 1] = mixed.g;
      color[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: color };
  }, [config.particleA, config.particleB]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.04;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.2;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

function Architecture({ config }: { config: SceneConfig }) {
  const group = useRef<THREE.Group>(null);
  const structures = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => ({
      x: (index % 2 ? 1 : -1) * (5 + Math.random() * 11),
      z: -4 - index * 2.2 - Math.random() * 3,
      h: 2.5 + Math.random() * 7,
      w: 0.18 + Math.random() * 0.7,
      r: Math.random() * 0.18,
    }));
  }, [config.key]);

  useFrame((state) => {
    if (!group.current) return;
    const scroll = window.scrollY || 0;
    group.current.position.z = (scroll % 2200) * 0.0018;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.025;
  });

  if (config.mood === 'anime') {
    return (
      <group ref={group}>
        {structures.slice(0, 9).map((item, index) => (
          <group key={`${config.key}-gate-${index}`} position={[item.x * 0.74, -1.15, item.z]} rotation={[0, item.r * 4, 0]}>
            <mesh position={[0, 1.3, 0]}>
              <boxGeometry args={[2.2, 0.16, 0.12]} />
              <meshStandardMaterial color={config.accent} emissive={config.accent} emissiveIntensity={0.18} transparent opacity={0.34} />
            </mesh>
            <mesh position={[-0.92, 0.55, 0]}>
              <boxGeometry args={[0.12, 1.42, 0.12]} />
              <meshStandardMaterial color={config.towerColor} roughness={0.42} transparent opacity={0.28} />
            </mesh>
            <mesh position={[0.92, 0.55, 0]}>
              <boxGeometry args={[0.12, 1.42, 0.12]} />
              <meshStandardMaterial color={config.towerColor} roughness={0.42} transparent opacity={0.28} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  if (config.mood === 'anime-films') {
    return (
      <group ref={group}>
        {structures.slice(0, 12).map((item, index) => (
          <group key={`${config.key}-memory-${index}`} position={[item.x * 0.82, -1.35, item.z]} rotation={[0, item.r * 3, 0]}>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[2.8, 0.035, 0.055]} />
              <meshStandardMaterial color="#e0f2fe" emissive="#93c5fd" emissiveIntensity={0.12} transparent opacity={0.22} />
            </mesh>
            <mesh position={[0, 1.1, 0]}>
              <boxGeometry args={[0.9, 1.2 + (index % 3) * 0.36, 0.08]} />
              <meshStandardMaterial color={config.towerColor} roughness={0.58} transparent opacity={0.16} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  if (config.mood === 'dc') {
    return (
      <group ref={group}>
        {structures.map((item, index) => (
          <group key={`${config.key}-roof-${index}`} position={[item.x, item.h / 2 - 2.7, item.z]} rotation={[0, item.r, 0]}>
            <mesh>
              <boxGeometry args={[item.w * 1.6, item.h, item.w * 2.6]} />
              <meshStandardMaterial color="#182637" roughness={0.82} metalness={0.2} transparent opacity={0.36} />
            </mesh>
            <mesh position={[0, item.h / 2 + 0.38, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[item.w * 1.35, item.w * 1.35, item.w * 1.35]} />
              <meshStandardMaterial color={config.accent} emissive={config.accent} emissiveIntensity={0.18} transparent opacity={0.28} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  if (config.mood === 'mcu' || config.mood === 'gaming' || config.mood === 'originals') {
    return (
      <group ref={group}>
        {structures.map((item, index) => (
          <group key={`${config.key}-arc-${index}`} position={[item.x, item.h / 2 - 2, item.z]} rotation={[0, item.r, 0]}>
            <mesh>
              <boxGeometry args={[item.w, item.h, item.w * 1.8]} />
              <meshStandardMaterial color={config.towerColor} roughness={0.24} metalness={0.78} transparent opacity={0.28} />
            </mesh>
            <mesh position={[0, 0, item.w * 0.94]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[Math.max(item.w * 0.78, 0.22), 0.01, 6, 32]} />
              <meshStandardMaterial color={index % 2 ? config.accent : config.floor} emissive={index % 2 ? config.accent : config.floor} emissiveIntensity={0.72} transparent opacity={0.5} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  return (
    <group ref={group}>
      {structures.map((item, index) => (
        <mesh key={`${config.key}-${index}`} position={[item.x, item.h / 2 - 2, item.z]} rotation={[0, item.r, 0]}>
          <boxGeometry args={[item.w, item.h, item.w * 1.8]} />
          <meshStandardMaterial color={config.towerColor} roughness={0.38} metalness={config.mood === 'mcu' || config.mood === 'studio' ? 0.68 : 0.22} transparent opacity={0.24} />
        </mesh>
      ))}
    </group>
  );
}

function WorldObjects({ config }: { config: SceneConfig }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  if (config.mood === 'magic') {
    return (
      <group ref={group}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh key={i} position={[(i - 5.5) * 1.2, 1.2 + Math.sin(i) * 0.8, -8 - (i % 4) * 2]}>
            <boxGeometry args={[0.08, 0.34, 0.08]} />
            <meshStandardMaterial color={config.accent} emissive={config.accent} emissiveIntensity={1.1} />
          </mesh>
        ))}
      </group>
    );
  }

  if (config.mood === 'death-note') {
    return (
      <group ref={group}>
        {Array.from({ length: 16 }, (_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 16, 1 + Math.random() * 6, -5 - Math.random() * 18]} rotation={[Math.random() * 0.8, Math.random() * 1.2, Math.random() * 0.8]}>
            <planeGeometry args={[0.42, 0.62]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} transparent opacity={0.48} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    );
  }

  if (config.mood === 'anime-films') {
    return (
      <group ref={group}>
        {Array.from({ length: 14 }, (_, i) => (
          <mesh key={i} position={[(i - 6.5) * 1.25, 0.2 + Math.sin(i) * 0.4, -7 - (i % 7) * 2.2]} rotation={[0, 0, Math.sin(i) * 0.05]}>
            <planeGeometry args={[0.85, 0.035]} />
            <meshStandardMaterial color={i % 2 ? '#fb923c' : '#93c5fd'} emissive={i % 2 ? '#fb923c' : '#93c5fd'} emissiveIntensity={0.32} transparent opacity={0.34} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group ref={group}>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[(i - 5) * 1.5, -0.6 + Math.sin(i) * 0.6, -7 - (i % 5) * 2.8]} rotation={[0.9, 0.2 * i, 0.4]}>
          <torusGeometry args={[0.42, 0.012, 6, 36, Math.PI * 1.24]} />
          <meshStandardMaterial color={config.accent} emissive={config.accent} emissiveIntensity={0.45} transparent opacity={0.42} />
        </mesh>
      ))}
    </group>
  );
}

function Floor({ config }: { config: SceneConfig }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.08, -13]}>
      <planeGeometry args={[52, 62]} />
      <meshStandardMaterial
        color={config.floor}
        roughness={config.mood === 'death-note' ? 0.78 : 0.42}
        metalness={config.mood === 'mcu' || config.mood === 'gaming' ? 0.32 : 0.08}
        transparent
        opacity={config.mood === 'death-note' ? 0.052 : 0.074}
      />
    </mesh>
  );
}

function Scene({ config }: { config: SceneConfig }) {
  const rig = useRef<THREE.Group>(null);
  const lastScroll = useRef(0);
  const scrollVelocity = useRef(0);

  useFrame((state) => {
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const scroll = window.scrollY || 0;
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, scroll - lastScroll.current, 0.08);
    lastScroll.current = scroll;
    const rush = THREE.MathUtils.clamp(scrollVelocity.current * 0.004, -0.8, 0.8);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointerX * 0.9 + rush * 0.18, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.2 + pointerY * 0.34 + Math.abs(rush) * 0.08, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.2 - Math.min(scroll / 1600, 1.8) - Math.abs(rush) * 0.35, 0.035);
    state.camera.lookAt(0, 0.4, -9);
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointerX * 0.08, 0.04);
      rig.current.rotation.z = THREE.MathUtils.lerp(rig.current.rotation.z, rush * 0.012, 0.04);
    }
  });

  return (
    <>
      <fog attach="fog" args={[config.fog, 8, 34]} />
      <color attach="background" args={['#05070d']} />
      <group ref={rig}>
        <hemisphereLight color={config.ambient} groundColor={config.fog} intensity={0.74} />
        <ambientLight color={config.ambient} intensity={0.58} />
        <directionalLight color={config.keyLight} position={[4, 8, 4]} intensity={2.15} />
        <directionalLight color={config.accent} position={[-5, 3, -8]} intensity={0.9} />
        <pointLight color={config.fillLight} position={[-4, 2, -2]} intensity={5.7} distance={20} />
        <pointLight color={config.accent} position={[3, 1, -10]} intensity={3.9} distance={18} />
        <Floor config={config} />
        <Architecture config={config} />
        <WorldObjects config={config} />
        <Particles config={config} />
      </group>
    </>
  );
}

export const WorldScene: React.FC = () => {
  const location = useLocation();
  const config = configFromPath(location.pathname);

  return (
    <div className="world-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.45]} camera={{ position: [0, 0.2, 7.2], fov: 48 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Scene config={config} />
      </Canvas>
    </div>
  );
};
