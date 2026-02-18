import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useParallax(
    ref: RefObject<HTMLElement | null>,
    offset1: number = 100,
    offset2: number = -80
) {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const glow1Y = useTransform(scrollYProgress, [0, 1], [offset1, -offset1]);
    const glow2Y = useTransform(scrollYProgress, [0, 1], [offset2, -offset2]);

    return { glow1Y, glow2Y, scrollYProgress };
}
