import { useState, useEffect } from "react";
import { ExperienceItem } from "@/types";
import { experiences as initialExperience } from "@/data/experience";

export function useExperience() {
    const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                setExperiences(initialExperience);
            } catch (error) {
                console.error("Failed to fetch experience:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    return { experiences, loading };
}
