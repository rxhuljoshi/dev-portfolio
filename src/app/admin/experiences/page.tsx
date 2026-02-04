"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Edit, ChevronDown, ChevronUp, Save, X } from "lucide-react";

interface Role {
    id?: string;
    experience_id?: string;
    title: string;
    period: string;
    description: string;
    skills: string[];
    order_index: number;
}

interface Experience {
    id: string;
    company: string;
    location: string;
    order_index: number;
    roles: Role[];
}

export default function ExperiencesAdmin() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Experience | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newExperience, setNewExperience] = useState({
        company: "",
        location: "",
        order_index: 0,
        roles: [{
            title: "",
            period: "",
            description: "",
            skills: [] as string[],
            order_index: 0
        }]
    });
    const [skillInput, setSkillInput] = useState("");

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        const supabase = createClient();
        const { data: expData } = await supabase
            .from("experiences")
            .select("*")
            .order("order_index");

        if (expData) {
            const experiencesWithRoles = await Promise.all(
                expData.map(async (exp) => {
                    const { data: roles } = await supabase
                        .from("roles")
                        .select("*")
                        .eq("experience_id", exp.id)
                        .order("order_index");
                    return { ...exp, roles: roles || [] };
                })
            );
            setExperiences(experiencesWithRoles);
        }
        setLoading(false);
    };

    const handleAddExperience = async () => {
        const supabase = createClient();

        // Create experience
        const { data: expData, error: expError } = await supabase
            .from("experiences")
            .insert({
                company: newExperience.company,
                location: newExperience.location,
                order_index: newExperience.order_index
            })
            .select()
            .single();

        if (expError || !expData) {
            alert("Failed to create experience");
            return;
        }

        // Create roles
        for (const role of newExperience.roles) {
            await supabase.from("roles").insert({
                experience_id: expData.id,
                title: role.title,
                period: role.period,
                description: role.description,
                skills: role.skills,
                order_index: role.order_index
            });
        }

        setShowAddForm(false);
        setNewExperience({
            company: "",
            location: "",
            order_index: 0,
            roles: [{ title: "", period: "", description: "", skills: [], order_index: 0 }]
        });
        fetchExperiences();
    };

    const handleDeleteExperience = async (id: string) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;

        const supabase = createClient();
        await supabase.from("experiences").delete().eq("id", id);
        fetchExperiences();
    };

    const handleUpdateExperience = async () => {
        if (!editForm) return;

        const supabase = createClient();
        await supabase
            .from("experiences")
            .update({
                company: editForm.company,
                location: editForm.location,
                order_index: editForm.order_index
            })
            .eq("id", editForm.id);

        setEditingId(null);
        setEditForm(null);
        fetchExperiences();
    };

    const addSkillToNew = () => {
        if (!skillInput.trim()) return;
        setNewExperience(prev => ({
            ...prev,
            roles: prev.roles.map((role, i) =>
                i === 0 ? { ...role, skills: [...role.skills, skillInput.trim()] } : role
            )
        }));
        setSkillInput("");
    };

    if (loading) {
        return <div className="text-white/50">Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Experiences</h1>
                    <p className="text-white/50">Manage your work experiences</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Experience
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">New Experience</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Company"
                            value={newExperience.company}
                            onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newExperience.location}
                            onChange={(e) => setNewExperience(prev => ({ ...prev, location: e.target.value }))}
                            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                    </div>

                    <h4 className="text-white/70 font-medium mb-2">First Role</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newExperience.roles[0].title}
                            onChange={(e) => setNewExperience(prev => ({
                                ...prev,
                                roles: [{ ...prev.roles[0], title: e.target.value }]
                            }))}
                            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                        <input
                            type="text"
                            placeholder="Period (e.g., Jan 2024 - Present)"
                            value={newExperience.roles[0].period}
                            onChange={(e) => setNewExperience(prev => ({
                                ...prev,
                                roles: [{ ...prev.roles[0], period: e.target.value }]
                            }))}
                            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                    </div>
                    <textarea
                        placeholder="Description"
                        value={newExperience.roles[0].description}
                        onChange={(e) => setNewExperience(prev => ({
                            ...prev,
                            roles: [{ ...prev.roles[0], description: e.target.value }]
                        }))}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white mb-4"
                        rows={3}
                    />

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Add skill"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addSkillToNew()}
                            className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                        />
                        <button
                            onClick={addSkillToNew}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {newExperience.roles[0].skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm">
                                {skill}
                                <button
                                    onClick={() => setNewExperience(prev => ({
                                        ...prev,
                                        roles: [{
                                            ...prev.roles[0],
                                            skills: prev.roles[0].skills.filter((_, idx) => idx !== i)
                                        }]
                                    }))}
                                    className="ml-2 text-white/50 hover:text-white"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleAddExperience}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                            Create Experience
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

            {/* Experience List */}
            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer"
                            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                        >
                            <div className="flex items-center gap-4">
                                {expandedId === exp.id ? (
                                    <ChevronUp className="w-5 h-5 text-white/50" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-white/50" />
                                )}
                                {editingId === exp.id ? (
                                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="text"
                                            value={editForm?.company || ""}
                                            onChange={(e) => setEditForm(prev => prev ? { ...prev, company: e.target.value } : null)}
                                            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white"
                                        />
                                        <input
                                            type="text"
                                            value={editForm?.location || ""}
                                            onChange={(e) => setEditForm(prev => prev ? { ...prev, location: e.target.value } : null)}
                                            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-white font-semibold">{exp.company}</h3>
                                        <p className="text-white/50 text-sm">{exp.location}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                {editingId === exp.id ? (
                                    <>
                                        <button
                                            onClick={handleUpdateExperience}
                                            className="p-2 text-green-400 hover:bg-green-500/20 rounded"
                                        >
                                            <Save className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => { setEditingId(null); setEditForm(null); }}
                                            className="p-2 text-white/50 hover:bg-white/10 rounded"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => { setEditingId(exp.id); setEditForm(exp); }}
                                            className="p-2 text-white/50 hover:bg-white/10 rounded"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteExperience(exp.id)}
                                            className="p-2 text-red-400 hover:bg-red-500/20 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {expandedId === exp.id && (
                            <div className="border-t border-white/10 p-4">
                                <h4 className="text-white/70 font-medium mb-3">Roles ({exp.roles.length})</h4>
                                {exp.roles.map((role, i) => (
                                    <div key={role.id || i} className="bg-white/5 rounded-lg p-4 mb-2">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h5 className="text-white font-medium">{role.title}</h5>
                                                <p className="text-white/50 text-sm">{role.period}</p>
                                            </div>
                                        </div>
                                        <p className="text-white/60 text-sm mb-2">{role.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {role.skills.map((skill, si) => (
                                                <span key={si} className="px-2 py-0.5 bg-white/10 text-white/60 rounded text-xs">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {experiences.length === 0 && !showAddForm && (
                <div className="text-center py-12 text-white/50">
                    No experiences yet. Add your first experience!
                </div>
            )}
        </div>
    );
}
