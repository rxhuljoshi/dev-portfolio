"use client";

import { Github, ExternalLink } from "lucide-react";
import DecryptedText from "@/components/ui/decrypted-text";
import { LiquidButton } from "@/components/ui/button";
import { featuredProjects, Project } from "@/data/projects";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
    return (
        <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="relative h-64 w-full rounded-xl p-6 flex flex-col justify-between border border-white/30 bg-transparent transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/5">
                <div>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex gap-2">
                            <Github className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                            <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-green-400 transition-colors" />
                        </div>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                        {project.description}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-transparent text-white/70 border border-white/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
}

export function Projects() {
    return (
        <section id="projects" className="pt-16 pb-32 px-6 md:px-12 lg:px-20 w-full">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
                    <DecryptedText
                        text="Featured Projects"
                        animateOn="both"
                        sequential={true}
                        revealDirection="start"
                        speed={60}
                        maxIterations={20}
                        className="text-white"
                        encryptedClassName="text-white/40"
                    />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link href="/projects">
                        <LiquidButton>
                            More Projects
                        </LiquidButton>
                    </Link>
                </div>
            </div>
        </section>
    );
}

