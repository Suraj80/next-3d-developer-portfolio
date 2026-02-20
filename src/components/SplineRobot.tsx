"use client";

import { useState, useEffect } from 'react';
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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        // Container logic: We make it larger and use a slight scale up to "zoom" the model visually
        <div className="relative w-full h-[500px] sm:h-[500px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex justify-center items-center scale-85 sm:scale-100 origin-center mt-5">

            {/* Show loader while Spline initializes */}
            {!isLoaded && (
                <div className="absolute inset-0 z-10">
                    <SplineLoader />
                </div>
            )}

            {/* Container ensures the canvas fills the space */}
            {/* Using absolute inset-0 forces it to exactly match the parent's non-zero dimensions */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Only render Spline if we are safely mounted on the client to avoid 0x0 container read before hydration paints */}
                {isMounted && (
                    <Spline
                        scene="https://prod.spline.design/QsAI2aiCEklzfV-j/scene.splinecode"
                        onLoad={() => setIsLoaded(true)}
                    />
                )}
            </div>
        </div>
    );
}
