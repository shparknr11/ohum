import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
// Scene 컴포넌트 정의
const ThreeScene: React.FC = () => {
  const gltfRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

  // GLTFLoader로 모델 로드
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('../../../public/fantasy_book/scene.gltf', (gltf: any) => {
      if (gltfRef.current) {
        gltfRef.current.add(gltf.scene);
      }
    });
  }, []);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update(); // 매 프레임마다 컨트롤 업데이트
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight color="white" intensity={1} position={[0, 1, 1]} />
      <group ref={gltfRef} />
      <OrbitControls
        ref={controlsRef}
        dampingFactor={0.25}
        minDistance={100}
        maxDistance={50}
      />
    </>
  );
};
export default ThreeScene;
