import { Project } from "@/types";

export const projects: Project[] = [
    {
        title: "Enterprise CRM System",
        description:
            "A full-featured CRM built with authentication, role-based access, SSO integration, and performance optimizations. Designed for scalable enterprise usage.",
        image: "/crm.jpg",
        tech: ["Next.js", "TypeScript", "PHP", "MySQL"],
        live: "#",
        github: "#",
        featured: true,
    },
    {
        title: "3D Portfolio Website",
        description: "Interactive 3D portfolio built with performance-first architecture.",
        image: "/portfolio.jpg",
        tech: ["Next.js", "Three.js", "Framer Motion"],
        live: "#",
        github: "#",
    },
    {
        title: "SaaS Dashboard UI",
        description: "Modern SaaS admin dashboard with analytics and charts.",
        image: "/dashboard.jpg",
        tech: ["React", "Tailwind", "Node.js"],
        live: "#",
        github: "#",
    },
    {
        title: "Authentication System",
        description: "Secure auth system with JWT and role permissions.",
        image: "/auth.jpg",
        tech: ["Next.js", "Node.js", "MongoDB"],
        live: "#",
        github: "#",
    },
];
