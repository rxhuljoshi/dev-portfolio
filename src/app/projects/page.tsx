"use client";

import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowLeft, Home, User, Briefcase, Code, Phone } from "lucide-react";
import DecryptedText from "@/components/ui/decrypted-text";
import { LiquidButton } from "@/components/ui/button";
import Dock from "@/components/ui/dock";
import { renderCanvas } from "@/components/ui/canvas";
// import { allProjects, Project } from "@/data/projects"; // Removed
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/client";

interface Project {
    id: string;
    title: string;
    description: string;
    github_url: string;
    live_url?: string;
    tags: string[];
    colors: string[];
    is_featured: boolean;
    order_index: number;
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <a
            href={project.github_url}
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
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
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

export default function ProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        renderCanvas();

        const fetchProjects = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .neq("is_visible", false) // Filter out hidden projects
                .order("order_index", { ascending: true });

            if (error) {
                console.error("Error fetching projects:", error);
            } else {
                setProjects(data || []);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const navigateToSection = (sectionId: string) => {
        router.push(`/#${sectionId}`);
    };

    const dockItems = [
        { icon: <Home size={24} />, label: 'Home', onClick: () => navigateToSection('home') },
        { icon: <User size={24} />, label: 'About', onClick: () => navigateToSection('about') },
        { icon: <Briefcase size={24} />, label: 'Projects', onClick: () => navigateToSection('projects') },
        { icon: <Code size={24} />, label: 'Experience', onClick: () => navigateToSection('experience') },
        { icon: <Phone size={24} />, label: 'Contact', onClick: () => navigateToSection('contact') },
    ];

    return (
        <main className="relative min-h-screen bg-black">
            {/* Global canvas effect */}
            <canvas
                className="pointer-events-none fixed inset-0 z-0"
                id="canvas"
            />

            {/* Dock navigation */}
            <Dock
                items={dockItems}
                panelHeight={68}
                baseItemSize={50}
                magnification={80}
            />

            <div className="relative z-10 pt-8 pb-24 px-6 md:px-12 lg:px-20 w-full">
                {/* Back button */}
                <Link href="/#projects">
                    <LiquidButton className="w-12 h-12 rounded-full flex items-center justify-center p-0">
                        <ArrowLeft size={20} className="text-white" />
                    </LiquidButton>
                </Link>

                <div className="max-w-6xl mx-auto mt-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
                        <DecryptedText
                            text="All Projects"
                            animateOn="view"
                            sequential={true}
                            revealDirection="start"
                            speed={80}
                            maxIterations={20}
                            className="text-white"
                            encryptedClassName="text-white/40"
                        />
                    </h1>

                    <p className="text-white/70 text-center text-lg mb-16 max-w-2xl mx-auto">
                        A collection of projects I&apos;ve built, from backend services to machine learning systems.
                    </p>

                    {loading ? (
                        <div className="text-center text-white/50 py-12">Loading projects...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
