"use client";

import { useState, useEffect } from 'react';
// @ts-ignore
import RobotWorker from '../workers/3dRobotWorker.js?worker';
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
    const [workerResult, setWorkerResult] = useState<number | null>(null);

    useEffect(() => {
        setIsMounted(true);

        // Example: use worker for heavy computation
        const worker = new RobotWorker();
        worker.postMessage({ type: 'compute' });
        worker.onmessage = (e: MessageEvent) => {
            if (e.data.type === 'result') {
                setWorkerResult(e.data.result);
            }
        };
        return () => {
            worker.terminate();
        };
    }, []);

    return (
        <div className="relative w-full h-[500px] sm:h-[500px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex justify-center items-center scale-85 sm:scale-100 origin-center mt-5">
            {/* Show loader while Spline initializes */}
            {!isLoaded && (
                <div className="absolute inset-0 z-10">
                    <SplineLoader />
                </div>
            )}
            <div className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Only render Spline if we are safely mounted on the client to avoid 0x0 container read before hydration paints */}
                {isMounted && (
                    <Spline
                        scene="https://prod.spline.design/QsAI2aiCEklzfV-j/scene.splinecode"
                        onLoad={() => setIsLoaded(true)}
                    />
                )}
            </div>
            {/* Example: show worker result (for demonstration) */}
            {workerResult !== null && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-xs text-green-400 px-2 py-1 rounded">
                    Worker result: {workerResult.toFixed(2)}
                </div>
            )}
        </div>
    );
}
