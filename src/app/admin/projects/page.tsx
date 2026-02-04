"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Edit, Star, Save, X } from "lucide-react";

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

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Project | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        github_url: "",
        live_url: "",
        tags: [] as string[],
        colors: ["#3b82f6", "#8b5cf6"],
        is_featured: false,
        order_index: 0
    });
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const supabase = createClient();
        const { data } = await supabase
            .from("projects")
            .select("*")
            .order("order_index");
        setProjects(data || []);
        setLoading(false);
    };

    const handleAddProject = async () => {
        const supabase = createClient();
        const { error } = await supabase.from("projects").insert({
            ...newProject,
            live_url: newProject.live_url || null
        });

        if (error) {
            alert("Failed to create project");
            return;
        }

        setShowAddForm(false);
        setNewProject({
            title: "",
            description: "",
            github_url: "",
            live_url: "",
            tags: [],
            colors: ["#3b82f6", "#8b5cf6"],
            is_featured: false,
            order_index: 0
        });
        fetchProjects();
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        const supabase = createClient();
        await supabase.from("projects").delete().eq("id", id);
        fetchProjects();
    };

    const handleUpdateProject = async () => {
        if (!editForm) return;

        const supabase = createClient();
        await supabase
            .from("projects")
            .update({
                title: editForm.title,
                description: editForm.description,
                github_url: editForm.github_url,
                live_url: editForm.live_url || null,
                tags: editForm.tags,
                colors: editForm.colors,
                is_featured: editForm.is_featured,
                order_index: editForm.order_index
            })
            .eq("id", editForm.id);

        setEditingId(null);
        setEditForm(null);
        fetchProjects();
    };

    const toggleFeatured = async (project: Project) => {
        const supabase = createClient();
        await supabase
            .from("projects")
            .update({ is_featured: !project.is_featured })
            .eq("id", project.id);
        fetchProjects();
    };

    const addTag = () => {
        if (!tagInput.trim()) return;
        setNewProject(prev => ({
            ...prev,
            tags: [...prev.tags, tagInput.trim()]
        }));
        setTagInput("");
    };

    if (loading) {
        return <div className="text-white/50">Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    <p className="text-white/50">Manage your projects</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">New Project</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newProject.title}
                            onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                        <input
                            type="text"
                            placeholder="GitHub URL"
                            value={newProject.github_url}
                            onChange={(e) => setNewProject(prev => ({ ...prev, github_url: e.target.value }))}
                            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Live URL (optional)"
                        value={newProject.live_url}
                        onChange={(e) => setNewProject(prev => ({ ...prev, live_url: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white mb-4"
                    />
                    <textarea
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white mb-4"
                        rows={3}
                    />

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Add tag"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTag()}
                            className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                        <button onClick={addTag} className="px-4 py-2 bg-white/10 text-white rounded-lg">
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {newProject.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm">
                                {tag}
                                <button
                                    onClick={() => setNewProject(prev => ({
                                        ...prev,
                                        tags: prev.tags.filter((_, idx) => idx !== i)
                                    }))}
                                    className="ml-2 text-white/50 hover:text-white"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <label className="flex items-center gap-2 text-white/70 mb-4">
                        <input
                            type="checkbox"
                            checked={newProject.is_featured}
                            onChange={(e) => setNewProject(prev => ({ ...prev, is_featured: e.target.checked }))}
                            className="w-4 h-4"
                        />
                        Featured Project
                    </label>

                    <div className="flex gap-2">
                        <button
                            onClick={handleAddProject}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                            Create Project
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        {editingId === project.id ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={editForm?.title || ""}
                                    onChange={(e) => setEditForm(prev => prev ? { ...prev, title: e.target.value } : null)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                                />
                                <textarea
                                    value={editForm?.description || ""}
                                    onChange={(e) => setEditForm(prev => prev ? { ...prev, description: e.target.value } : null)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                                    rows={2}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdateProject}
                                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded"
                                    >
                                        <Save className="w-4 h-4" /> Save
                                    </button>
                                    <button
                                        onClick={() => { setEditingId(null); setEditForm(null); }}
                                        className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white rounded"
                                    >
                                        <X className="w-4 h-4" /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-white font-semibold">{project.title}</h3>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => toggleFeatured(project)}
                                            className={`p-1.5 rounded ${project.is_featured ? 'text-yellow-400' : 'text-white/30'}`}
                                        >
                                            <Star className="w-4 h-4" fill={project.is_featured ? "currentColor" : "none"} />
                                        </button>
                                        <button
                                            onClick={() => { setEditingId(project.id); setEditForm(project); }}
                                            className="p-1.5 text-white/50 hover:bg-white/10 rounded"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-white/60 text-sm mb-3 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.tags.slice(0, 4).map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-white/10 text-white/60 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 4 && (
                                        <span className="px-2 py-0.5 text-white/40 text-xs">
                                            +{project.tags.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {projects.length === 0 && !showAddForm && (
                <div className="text-center py-12 text-white/50">
                    No projects yet. Add your first project!
                </div>
            )}
        </div>
    );
}
