"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Use standard react-spline with next/dynamic for client-side only rendering
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <SplineLoader />,
});

function SplineLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-cyan-500/5 rounded-3xl animate-pulse">
            <div className="text-cyan-500 text-sm font-mono">Loading 3D Scene...</div>
        </div>
    );
}

export default function SplineRobot() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        // Container logic: We make it larger and use a slight scale up to "zoom" the model visually
        <div className="relative w-full h-[300px] sm:h-[500px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex justify-center items-center scale-110 sm:scale-100 origin-center mt-5">

            {/* Show loader while Spline initializes */}
            {!isLoaded && (
                <div className="absolute inset-0 z-10">
                    <SplineLoader />
                </div>
            )}

            {/* Container ensures the canvas fills the space */}
            <div className={`w-full h-[500px] transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Spline
                    scene="https://prod.spline.design/QsAI2aiCEklzfV-j/scene.splinecode"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        </div>
    );
}
