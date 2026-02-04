"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Save } from "lucide-react";

interface Skill {
    id: string;
    name: string;
    category: string;
    order_index: number;
}

interface Content {
    id: string;
    value: string;
}

export default function AboutAdmin() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [aboutBio, setAboutBio] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAddSkill, setShowAddSkill] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: "", category: "", order_index: 0 });

    const categories = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Languages", "AI/ML", "Other"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const supabase = createClient();

        // Fetch skills
        const { data: skillsData } = await supabase
            .from("skills")
            .select("*")
            .order("category")
            .order("order_index");
        setSkills(skillsData || []);

        // Fetch about bio
        const { data: contentData } = await supabase
            .from("content")
            .select("*")
            .eq("id", "about_bio")
            .single();
        if (contentData) {
            setAboutBio(contentData.value);
        }

        setLoading(false);
    };

    const handleSaveBio = async () => {
        setSaving(true);
        const supabase = createClient();

        await supabase.from("content").upsert({
            id: "about_bio",
            value: aboutBio
        });

        setSaving(false);
    };

    const handleAddSkill = async () => {
        const supabase = createClient();
        const { error } = await supabase.from("skills").insert(newSkill);

        if (error) {
            alert("Failed to add skill");
            return;
        }

        setShowAddSkill(false);
        setNewSkill({ name: "", category: "", order_index: 0 });
        fetchData();
    };

    const handleDeleteSkill = async (id: string) => {
        const supabase = createClient();
        await supabase.from("skills").delete().eq("id", id);
        fetchData();
    };

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    if (loading) {
        return <div className="text-white/50">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">About & Skills</h1>
            <p className="text-white/50 mb-8">Manage your about section and skills</p>

            {/* About Bio */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">About Bio</h2>
                <textarea
                    value={aboutBio}
                    onChange={(e) => setAboutBio(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white mb-4"
                    rows={6}
                    placeholder="Write your bio here..."
                />
                <button
                    onClick={handleSaveBio}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Bio"}
                </button>
            </div>

            {/* Skills */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Skills</h2>
                    <button
                        onClick={() => setShowAddSkill(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add Skill
                    </button>
                </div>

                {/* Add Skill Form */}
                {showAddSkill && (
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Skill name"
                                value={newSkill.name}
                                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                                className="px-3 py-2 bg-white/5 border border-white/20 rounded text-white"
                            />
                            <select
                                value={newSkill.category}
                                onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                                className="px-3 py-2 bg-white/5 border border-white/20 rounded text-white"
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Order"
                                value={newSkill.order_index}
                                onChange={(e) => setNewSkill(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                                className="px-3 py-2 bg-white/5 border border-white/20 rounded text-white"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddSkill}
                                className="px-3 py-1.5 bg-green-600 text-white rounded text-sm"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setShowAddSkill(false)}
                                className="px-3 py-1.5 bg-white/10 text-white rounded text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Skills by Category */}
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <div key={category} className="mb-6 last:mb-0">
                        <h3 className="text-white/70 font-medium mb-3">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {categorySkills.map(skill => (
                                <div
                                    key={skill.id}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full group"
                                >
                                    <span className="text-white/80 text-sm">{skill.name}</span>
                                    <button
                                        onClick={() => handleDeleteSkill(skill.id)}
                                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {skills.length === 0 && !showAddSkill && (
                    <div className="text-center py-8 text-white/50">
                        No skills yet. Add your first skill!
                    </div>
                )}
            </div>
        </div>
    );
}
