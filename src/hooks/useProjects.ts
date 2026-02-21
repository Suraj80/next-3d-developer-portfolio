import { useState, useEffect } from "react";
import { Project } from "@/types";
import { projects as initialProjects } from "@/data/projects";

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating data fetching
        const fetchProjects = async () => {
            try {
                // In a real app, this would be an API call
                // const res = await fetch('/api/projects');
                // const data = await res.json();
                // setProjects(data);

                setProjects(initialProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const featuredProjects = projects.filter((p) => p.featured);
    const otherProjects = projects.filter((p) => !p.featured);

    return { projects, featuredProjects, otherProjects, loading };
}
