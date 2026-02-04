"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Edit, Save, X, Copy } from "lucide-react";

interface CoolStuffItem {
    id: string;
    image_url: string;
    prompt: string;
    order_index: number;
}

export default function CoolStuffAdmin() {
    const [items, setItems] = useState<CoolStuffItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<CoolStuffItem | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({
        image_url: "",
        prompt: "",
        order_index: 0
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const supabase = createClient();
        const { data } = await supabase
            .from("cool_stuff")
            .select("*")
            .order("order_index");
        setItems(data || []);
        setLoading(false);
    };

    const handleAddItem = async () => {
        const supabase = createClient();
        const { error } = await supabase.from("cool_stuff").insert(newItem);

        if (error) {
            alert("Failed to create item");
            return;
        }

        setShowAddForm(false);
        setNewItem({ image_url: "", prompt: "", order_index: 0 });
        fetchItems();
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        const supabase = createClient();
        await supabase.from("cool_stuff").delete().eq("id", id);
        fetchItems();
    };

    const handleUpdateItem = async () => {
        if (!editForm) return;

        const supabase = createClient();
        await supabase
            .from("cool_stuff")
            .update({
                image_url: editForm.image_url,
                prompt: editForm.prompt,
                order_index: editForm.order_index
            })
            .eq("id", editForm.id);

        setEditingId(null);
        setEditForm(null);
        fetchItems();
    };

    if (loading) {
        return <div className="text-white/50">Loading...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Cool Stuff</h1>
                    <p className="text-white/50">Manage AI-generated images and prompts</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Item
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">New Cool Stuff</h3>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newItem.image_url}
                        onChange={(e) => setNewItem(prev => ({ ...prev, image_url: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white mb-4"
                    />
                    <textarea
                        placeholder="Prompt used to generate the image"
                        value={newItem.prompt}
                        onChange={(e) => setNewItem(prev => ({ ...prev, prompt: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white mb-4"
                        rows={4}
                    />
                    <input
                        type="number"
                        placeholder="Order index"
                        value={newItem.order_index}
                        onChange={(e) => setNewItem(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white mb-4"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleAddItem}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                            Create Item
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

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        {editingId === item.id ? (
                            <div className="p-4 space-y-3">
                                <input
                                    type="text"
                                    value={editForm?.image_url || ""}
                                    onChange={(e) => setEditForm(prev => prev ? { ...prev, image_url: e.target.value } : null)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                                    placeholder="Image URL"
                                />
                                <textarea
                                    value={editForm?.prompt || ""}
                                    onChange={(e) => setEditForm(prev => prev ? { ...prev, prompt: e.target.value } : null)}
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                                    rows={3}
                                    placeholder="Prompt"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdateItem}
                                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm"
                                    >
                                        <Save className="w-4 h-4" /> Save
                                    </button>
                                    <button
                                        onClick={() => { setEditingId(null); setEditForm(null); }}
                                        className="flex items-center gap-1 px-3 py-1 bg-white/10 text-white rounded text-sm"
                                    >
                                        <X className="w-4 h-4" /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="aspect-square bg-white/5 flex items-center justify-center">
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt="Cool stuff"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white/30">No image</span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="text-white/60 text-sm line-clamp-3 mb-3">{item.prompt}</p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => navigator.clipboard.writeText(item.prompt)}
                                            className="flex items-center gap-1 text-white/50 hover:text-white text-sm"
                                        >
                                            <Copy className="w-4 h-4" /> Copy prompt
                                        </button>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => { setEditingId(item.id); setEditForm(item); }}
                                                className="p-1.5 text-white/50 hover:bg-white/10 rounded"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                className="p-1.5 text-red-400 hover:bg-red-500/20 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {items.length === 0 && !showAddForm && (
                <div className="text-center py-12 text-white/50">
                    No items yet. Add your first cool stuff item!
                </div>
            )}
        </div>
    );
}
