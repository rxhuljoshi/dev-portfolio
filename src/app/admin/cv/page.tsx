"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";

export default function AdminCV() {
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [cvUrl, setCvUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchCV();
    }, []);

    const fetchCV = async () => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("content")
                .select("value")
                .eq("id", "resume_url")
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is no rows found
                console.error("Error fetching CV:", error);
            } else if (data) {
                setCvUrl(data.value);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            setMessage({ type: 'error', text: "Please upload a PDF file." });
            return;
        }

        setUploading(true);
        setMessage(null);

        try {
            const supabase = createClient();

            // 1. Upload file to storage
            // Using a unique name to avoid caching issues
            const fileName = `resumes/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

            const { error: uploadError } = await supabase.storage
                .from("cool-stuff") // Using the existing public bucket
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // 2. Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from("cool-stuff")
                .getPublicUrl(fileName);

            // 3. Update content table
            const { error: dbError } = await supabase
                .from("content")
                .upsert({
                    id: "resume_url",
                    value: publicUrl,
                    updated_at: new Date().toISOString()
                });

            if (dbError) throw dbError;

            setCvUrl(publicUrl);
            setMessage({ type: 'success', text: "CV updated successfully!" });

            // Clear input
            e.target.value = '';

        } catch (error: unknown) {
            console.error("Upload error:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to upload CV";
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Manage CV</h1>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Current CV</h2>
                        {cvUrl ? (
                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                <FileText className="text-green-400 w-8 h-8" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-white/80 text-sm truncate">{cvUrl}</p>
                                </div>
                                <a
                                    href={cvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition"
                                >
                                    View
                                </a>
                            </div>
                        ) : (
                            <p className="text-white/50">No CV uploaded yet.</p>
                        )}
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Upload New CV</h2>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl hover:bg-white/5 hover:border-white/40 transition cursor-pointer group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {uploading ? (
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
                                ) : (
                                    <Upload className="w-8 h-8 text-white/40 group-hover:text-white/80 mb-2 transition" />
                                )}
                                <p className="text-sm text-white/60 group-hover:text-white/90">
                                    {uploading ? "Uploading..." : "Click to upload PDF"}
                                </p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="application/pdf"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                        </label>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
                            }`}>
                            {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            {message.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
