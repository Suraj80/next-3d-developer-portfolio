import { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
    {
        role: "Software Developer Intern",
        company: "Nantech Solutions",
        logo: "/nantech_logo1.png",
        startYear: 2025,
        endYear: 2025,
        description: [
            "Designed and deployed a centralized authentication system using Keycloak for 3+ Core PHP applications.",
            "Configured realms, clients, roles, and authorization policies to implement RBAC for 100+ users.",
            "Implemented enterprise authentication features including SSO, SLO, 2FA, and single-session enforcement.",
            "Built secure email-based registration and password reset workflows.",
            "Developed admin controls for user management, session monitoring (including forced logout), and fine-grained role management."
        ],
    },
    {
        role: "Software Engineer",
        company: "Chromosis Technologies",
        logo: "/chromosis_logo.png", // replace with actual logo file
        startYear: 2025,
        description: [
            "Built and delivered full-stack web applications using React (TypeScript), Tailwind CSS, Laravel, and MySQL across production modules.",
            "Integrated REST and GraphQL APIs into frontend systems, improving data reliability and reducing UI latency by 20–30%.",
            "Owned features end-to-end — from requirement analysis and development to testing and deployment within agile sprint cycles.",
            "Wrote scalable, maintainable code aligned with engineering standards, reducing QA defects and improving review cycles.",
            "Collaborated in cross-functional discussions to translate business requirements into clear, well-scoped technical solutions."
        ],
    },

];
