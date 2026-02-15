"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

// Preload the GLB model for better performance and caching
useGLTF.preload("/models/robot.glb");

function Robot() {
    const ref = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/robot.glb");

    // Adjust scale and position to fit properly in view
    return (
        <primitive
            ref={ref}
            object={scene}
            scale={33}
            position={[0, -1, 0]}
            rotation={[0, -Math.PI / 2, 0]}
        />
    );
}

// Loading fallback component
function Loader() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#00ffff" wireframe />
        </mesh>
    );
}

export default function RobotFollower() {
    return (
        <div className="w-full max-w-[280px] h-[380px] sm:max-w-[350px] sm:h-[350px] md:max-w-[450px] md:h-[450px] lg:max-w-[550px] lg:h-[550px] mx-auto mt-5">
            <Canvas>
                {/* Optimized camera position for better visibility */}
                <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />

                {/* Enhanced lighting for better model visibility */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-3, -3, -3]} intensity={0.5} />
                <pointLight position={[0, 2, 0]} intensity={0.8} color="#00ffff" />

                {/* 3D Robot Model with Suspense for loading state */}
                <Suspense fallback={<Loader />}>
                    <Robot />
                </Suspense>
            </Canvas>
        </div>
    );
}
