import { Contribution } from "@/types";

export const contributions: Contribution[] = [
    {
        repo: "vercel/next.js",
        description:
            "Improved server-side rendering performance by optimizing data fetching patterns and reducing bundle size.",
        type: "Feature",
        tech: ["TypeScript", "React", "Node.js"],
        pr: "#12345",
        link: "https://github.com/vercel/next.js",
    },
    {
        repo: "facebook/react",
        description:
            "Fixed hydration mismatch issue in concurrent mode affecting production builds.",
        type: "Bug Fix",
        tech: ["JavaScript", "React", "Testing"],
        pr: "#67890",
        link: "https://github.com/facebook/react",
    },
    {
        repo: "framer/motion",
        description:
            "Refactored animation hooks to support better TypeScript inference and improved developer experience.",
        type: "Refactor",
        tech: ["TypeScript", "Framer Motion"],
        link: "https://github.com/framer/motion",
    },
    {
        repo: "tailwindlabs/tailwindcss",
        description:
            "Enhanced documentation for custom plugin development with real-world examples and best practices.",
        type: "Docs",
        tech: ["CSS", "Documentation", "MDX"],
        pr: "#45678",
        link: "https://github.com/tailwindlabs/tailwindcss",
    },
    {
        repo: "pmndrs/three-fiber",
        description:
            "Added support for advanced lighting models and improved 3D scene performance optimization.",
        type: "Feature",
        tech: ["Three.js", "React", "WebGL"],
        link: "https://github.com/pmndrs/react-three-fiber",
    },
    {
        repo: "open-source-lib",
        description:
            "Refactored internal state management logic for improved scalability and maintainability.",
        type: "Refactor",
        tech: ["Node.js", "Architecture"],
        link: "https://github.com/example/repo",
    },
];
