import { useState, useEffect } from "react";
import { Tech } from "@/types";
import { techStack as initialTech, categories } from "@/data/tech";

export function useTechStack() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [techStack, setTechStack] = useState<Tech[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTechStack(initialTech);
        setLoading(false);
    }, []);

    const filteredTech =
        activeCategory === "All"
            ? techStack
            : techStack.filter((tech) => tech.category === activeCategory);

    return {
        techStack,
        filteredTech,
        categories,
        activeCategory,
        setActiveCategory,
        loading,
    };
}
