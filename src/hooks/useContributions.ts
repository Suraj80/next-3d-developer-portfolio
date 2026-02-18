import { useState, useEffect } from "react";
import { Contribution } from "@/types";
import { contributions as initialContributions } from "@/data/contributions";

export function useContributions() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                setContributions(initialContributions);
            } catch (error) {
                console.error("Failed to fetch contributions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    return { contributions, loading };
}
