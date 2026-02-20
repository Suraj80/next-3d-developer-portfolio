import { useState, useEffect } from "react";
import { Tech } from "@/types";
import { techStack as initialTech } from "@/data/tech";

export function useTechStack() {
    const [techStack, setTechStack] = useState<Tech[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTechStack(initialTech);
        setLoading(false);
    }, []);

    return {
        techStack,
        loading,
    };
}
