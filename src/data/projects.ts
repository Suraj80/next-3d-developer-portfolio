import { Project } from "@/types";

export const projects: Project[] = [
    {
        title: "EduProjectStore",
        description:
            "Scalable full-stack e-commerce platform for educational projects. Architected with a Laravel Blade storefront, React/TypeScript admin dashboard, Razorpay integration, Redis caching, and automated AWS CI/CD pipelines.",
        image: "/crm.jpg",
        tech: ["React", "TypeScript", "Laravel", "MySQL", "Redis"],
        live: "#",
        github: "#",
        featured: true,
    },
    {
        title: "Generative AI News Research Tool",
        description:
            "Full-stack RAG application for analyzing finance news via URL ingestion and natural-language queries. Engineered with LangChain, OpenAI embeddings, and FAISS vector index for real-time semantic search and context-aware responses.",
        image: "/dashboard.jpg",
        tech: ["React", "LangChain", "OpenAI", "Python", "FAISS"],
        live: "#",
        github: "#",
        featured: true,
    },
];
