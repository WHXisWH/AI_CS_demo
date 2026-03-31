import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HEX_SIZE = 1;
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = 2 * HEX_SIZE;
const GRID_SIZE = 14;

type HoneycombProps = {
  interactive: boolean;
};

export default function Honeycomb({ interactive }: HoneycombProps) {
  const meshRefSolid = useRef<THREE.InstancedMesh>(null);
  const meshRefWire = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Interaction state
  const hovered = useRef<number | null>(null);
  const intensities = useRef(new Float32Array((GRID_SIZE * 2 + 1) ** 2)).current;
  const color = useMemo(() => new THREE.Color(), []);
  const baseColor = useMemo(() => new THREE.Color('#030303'), []);
  const glowColor = useMemo(() => new THREE.Color('#FFB300'), []);

  useEffect(() => {
    if (!interactive) {
      hovered.current = null;
    }
  }, [interactive, hovered]);

  // Pre-calculate hexagonal grid positions
  const hexPositions = useMemo(() => {
    const positions = [];
    for (let row = -GRID_SIZE; row <= GRID_SIZE; row++) {
      for (let col = -GRID_SIZE; col <= GRID_SIZE; col++) {
        const xOffset = row % 2 === 0 ? 0 : HEX_WIDTH / 2;
        const x = col * HEX_WIDTH + xOffset;
        const z = row * (HEX_HEIGHT * 0.75);
        const distance = Math.sqrt(x * x + z * z);
        positions.push({ x, z, distance });
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!meshRefSolid.current || !meshRefWire.current) return;
    const time = state.clock.getElapsedTime();

    hexPositions.forEach((pos, i) => {
      const { x, z, distance } = pos;
      
      // Wave animation
      const wave1 = Math.sin(distance * 0.3 - time * 1.5) * 0.8;
      const wave2 = Math.cos(x * 0.2 + time) * 0.4;
      const wave3 = Math.sin(z * 0.2 - time * 0.8) * 0.4;
      const y = wave1 + wave2 + wave3;

      const rotX = Math.sin(time * 0.5 + x * 0.1) * 0.05;
      const rotZ = Math.cos(time * 0.5 + z * 0.1) * 0.05;

      dummy.position.set(x, y, z);
      dummy.rotation.set(rotX, 0, rotZ);
      
      // If hovered, slightly elevate the hexagon
      const isHovered = hovered.current === i;
      if (isHovered) {
        dummy.position.y += 0.5;
      }
      
      dummy.updateMatrix();
      meshRefSolid.current!.setMatrixAt(i, dummy.matrix);
      meshRefWire.current!.setMatrixAt(i, dummy.matrix);

      // Color transition logic for hover effect
      if (isHovered) {
        // Quickly increase intensity when hovered
        intensities[i] = THREE.MathUtils.lerp(intensities[i], 1, 0.2);
      } else {
        // Slowly decay intensity when mouse leaves (trail effect)
        intensities[i] = THREE.MathUtils.lerp(intensities[i], 0, 0.03);
      }

      // Apply color based on intensity
      color.lerpColors(baseColor, glowColor, intensities[i]);
      meshRefSolid.current!.setColorAt(i, color);
    });
    
    meshRefSolid.current.instanceMatrix.needsUpdate = true;
    meshRefWire.current.instanceMatrix.needsUpdate = true;
    if (meshRefSolid.current.instanceColor) {
      meshRefSolid.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Layer 1: Dark solid core with hover interaction */}
      <instancedMesh 
        ref={meshRefSolid} 
        args={[undefined, undefined, hexPositions.length]}
        onPointerMove={interactive ? (e) => {
          e.stopPropagation();
          hovered.current = e.instanceId ?? null;
        } : undefined}
        onPointerOut={interactive ? () => {
          hovered.current = null;
        } : undefined}
      >
        <cylinderGeometry args={[HEX_SIZE * 0.92, HEX_SIZE * 0.92, 0.4, 6]} />
        <meshStandardMaterial
          color="#ffffff" // Base color is controlled by setColorAt
          metalness={0.8}
          roughness={0.4}
        />
      </instancedMesh>

      {/* Layer 2: Glowing wireframe shell */}
      <instancedMesh ref={meshRefWire} args={[undefined, undefined, hexPositions.length]}>
        <cylinderGeometry args={[HEX_SIZE * 0.93, HEX_SIZE * 0.93, 0.41, 6]} />
        <meshBasicMaterial
          color="#FFB300"
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </instancedMesh>
    </group>
  );
}
