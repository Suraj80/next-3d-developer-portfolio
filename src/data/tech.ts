import { Tech } from "@/types";
import {
    SiPython,
    SiJavascript,
    SiReact,
    SiTailwindcss,
    SiHtml5,
    SiCss3,
    SiLaravel,
    SiFastapi,
    SiMysql,
    SiGit,
    SiGithub,
    SiDocker,
    SiAmazonwebservices,
    SiVercel,
    SiTypescript
} from "react-icons/si";
import React from "react";

export const techStack: Tech[] = [
    { name: "Python", category: "Backend", level: "Advanced", icon: React.createElement(SiPython, { color: "#3776AB" }) },
    { name: "JavaScript", category: "Frontend", level: "Advanced", icon: React.createElement(SiJavascript, { color: "#F7DF1E" }) },
    { name: "TypeScript", category: "Frontend", level: "Advanced", icon: React.createElement(SiTypescript, { color: "#3178C6" }) },
    { name: "React", category: "Frontend", level: "Advanced", icon: React.createElement(SiReact, { color: "#61DAFB" }) },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced", icon: React.createElement(SiTailwindcss, { color: "#06B6D4" }) },
    { name: "HTML5", category: "Frontend", level: "Advanced", icon: React.createElement(SiHtml5, { color: "#E34F26" }) },
    { name: "CSS3", category: "Frontend", level: "Advanced", icon: React.createElement(SiCss3, { color: "#1572B6" }) },
    { name: "Laravel", category: "Backend", level: "Intermediate", icon: React.createElement(SiLaravel, { color: "#FF2D20" }) },
    { name: "FastAPI", category: "Backend", level: "Intermediate", icon: React.createElement(SiFastapi, { color: "#009688" }) },
    { name: "MySQL", category: "Database", level: "Advanced", icon: React.createElement(SiMysql, { color: "#4479A1" }) },
    { name: "Git", category: "Tools", level: "Advanced", icon: React.createElement(SiGit, { color: "#F05032" }) },
    { name: "GitHub", category: "Tools", level: "Advanced", icon: React.createElement(SiGithub, { color: "#ffffff" }) },
    { name: "Docker", category: "Tools", level: "Intermediate", icon: React.createElement(SiDocker, { color: "#2496ED" }) },
    { name: "AWS", category: "Tools", level: "Intermediate", icon: React.createElement(SiAmazonwebservices, { color: "#FF9900" }) },
    { name: "Vercel", category: "Tools", level: "Advanced", icon: React.createElement(SiVercel, { color: "#ffffff" }) },
];

export const categories = ["All", "Frontend", "Backend", "Database", "Tools"];
