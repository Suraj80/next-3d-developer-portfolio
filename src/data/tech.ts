import { Tech } from "@/types";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiPhp,
    SiMysql,
    SiMongodb,
    SiDocker,
    SiGit,
    SiVercel,
} from "react-icons/si";
import React from "react";

export const techStack: Tech[] = [
    { name: "Next.js", category: "Frontend", level: "Advanced", icon: React.createElement(SiNextdotjs) },
    { name: "React", category: "Frontend", level: "Advanced", icon: React.createElement(SiReact) },
    { name: "TypeScript", category: "Frontend", level: "Advanced", icon: React.createElement(SiTypescript) },
    { name: "Tailwind", category: "Frontend", level: "Advanced", icon: React.createElement(SiTailwindcss) },

    { name: "Node.js", category: "Backend", level: "Intermediate", icon: React.createElement(SiNodedotjs) },
    { name: "PHP", category: "Backend", level: "Advanced", icon: React.createElement(SiPhp) },

    { name: "MySQL", category: "Database", level: "Advanced", icon: React.createElement(SiMysql) },
    { name: "MongoDB", category: "Database", level: "Intermediate", icon: React.createElement(SiMongodb) },

    { name: "Docker", category: "Tools", level: "Intermediate", icon: React.createElement(SiDocker) },
    { name: "Git", category: "Tools", level: "Advanced", icon: React.createElement(SiGit) },
    { name: "Vercel", category: "Tools", level: "Advanced", icon: React.createElement(SiVercel) },
];

export const categories = ["All", "Frontend", "Backend", "Database", "Tools"];
