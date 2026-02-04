"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Briefcase, FolderOpen, Image, FileText } from "lucide-react";
import Link from "next/link";

interface Stats {
    experiences: number;
    projects: number;
    coolStuff: number;
    skills: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        experiences: 0,
        projects: 0,
        coolStuff: 0,
        skills: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const supabase = createClient();

            try {
                const [expResult, projResult, coolResult, skillResult] = await Promise.all([
                    supabase.from("experiences").select("id", { count: "exact" }),
                    supabase.from("projects").select("id", { count: "exact" }),
                    supabase.from("cool_stuff").select("id", { count: "exact" }),
                    supabase.from("skills").select("id", { count: "exact" }),
                ]);

                setStats({
                    experiences: expResult.count || 0,
                    projects: projResult.count || 0,
                    coolStuff: coolResult.count || 0,
                    skills: skillResult.count || 0,
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: "Experiences", value: stats.experiences, icon: Briefcase, href: "/admin/experiences", color: "blue" },
        { label: "Projects", value: stats.projects, icon: FolderOpen, href: "/admin/projects", color: "purple" },
        { label: "Cool Stuff", value: stats.coolStuff, icon: Image, href: "/admin/coolstuff", color: "green" },
        { label: "Skills", value: stats.skills, icon: FileText, href: "/admin/about", color: "orange" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white/50">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/50 mb-8">Manage your portfolio content</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <card.icon className="w-8 h-8 text-white/50" />
                            <span className="text-3xl font-bold text-white">
                                {card.value}
                            </span>
                        </div>
                        <h3 className="text-white/70">{card.label}</h3>
                    </Link>
                ))}
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/experiences"
                        className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4 hover:bg-blue-600/30 transition text-center"
                    >
                        <span className="text-blue-400">Add Experience</span>
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-4 hover:bg-purple-600/30 transition text-center"
                    >
                        <span className="text-purple-400">Add Project</span>
                    </Link>
                    <Link
                        href="/admin/coolstuff"
                        className="bg-green-600/20 border border-green-500/30 rounded-xl p-4 hover:bg-green-600/30 transition text-center"
                    >
                        <span className="text-green-400">Add Cool Stuff</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
