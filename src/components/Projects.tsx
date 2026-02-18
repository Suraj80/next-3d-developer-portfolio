"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import { useProjects } from "@/hooks/useProjects";

export default function Projects() {
    const { featuredProject: featured, otherProjects: others, loading } = useProjects();

    if (loading) return null; // Or a loader

    return (
        <section
            id="projects"
            className="relative py-32 px-6 md:px-16 text-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">

                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-5xl font-bold text-center mb-24 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                >
                    Projects
                </motion.h2>

                {/* ============================= */}
                {/*       FEATURED PROJECT        */}
                {/* ============================= */}

                {featured && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative mb-32 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                    >
                        <div className="grid md:grid-cols-2 gap-0">

                            {/* Image */}
                            <div className="relative h-[350px] md:h-full">
                                <Image
                                    src={featured.image}
                                    alt={featured.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-10 flex flex-col justify-center">
                                <h3 className="text-3xl font-semibold mb-4">
                                    {featured.title}
                                </h3>

                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {featured.description}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {featured.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-6">
                                    {featured.live && (
                                        <a
                                            href={featured.live}
                                            target="_blank"
                                            className="flex items-center gap-2 text-purple-400 hover:text-white transition"
                                        >
                                            <FiExternalLink size={18} />
                                            Live
                                        </a>
                                    )}
                                    {featured.github && (
                                        <a
                                            href={featured.github}
                                            target="_blank"
                                            className="flex items-center gap-2 text-cyan-400 hover:text-white transition"
                                        >
                                            <FiGithub size={18} />
                                            Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ============================= */}
                {/*         OTHER PROJECTS        */}
                {/* ============================= */}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {others.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            viewport={{ once: true, margin: "-100px" }}
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl group"
                        >
                            {/* Image */}
                            <div className="relative h-48">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h4 className="text-lg font-semibold mb-2">
                                    {project.title}
                                </h4>
                                <p className="text-sm text-gray-400 mb-4">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs rounded-md bg-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            className="text-purple-400 hover:text-white transition text-sm"
                                        >
                                            Live
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            className="text-cyan-400 hover:text-white transition text-sm"
                                        >
                                            Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
