"use client";

import React, { useState } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Using Formspree - form ID from environment variable
            const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
            if (!formId) {
                console.error('Formspree ID not configured');
                setStatus('error');
                return;
            }
            
            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm text-white">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white">or fill out this form.</h1>
            <p className="max-md:text-sm text-white/50 pb-5 text-center"></p>

            <div className="max-w-96 w-full">
                <label htmlFor="name" className="font-medium text-white/80">Full Name</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-white/20 bg-white/5 rounded-full focus-within:ring-2 focus-within:ring-[#3026bf] transition-all overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#9ca3af" />
                    </svg>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-full px-2 w-full outline-none bg-transparent text-white placeholder:text-white/40"
                        placeholder="Enter your full name"
                        required
                        disabled={status === 'submitting'}
                    />
                </div>

                <label htmlFor="email" className="font-medium text-white/80 mt-4">Email Address</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-white/20 bg-white/5 rounded-full focus-within:ring-2 focus-within:ring-[#3026bf] transition-all overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="#9ca3af" />
                    </svg>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-full px-2 w-full outline-none bg-transparent text-white placeholder:text-white/40"
                        placeholder="Enter your email address"
                        required
                        disabled={status === 'submitting'}
                    />
                </div>

                <label htmlFor="message" className="font-medium text-white/80 mt-4">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full mt-2 p-3 bg-white/5 border border-white/20 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-[#3026bf] transition-all text-white placeholder:text-white/40"
                    placeholder="Enter your message"
                    required
                    disabled={status === 'submitting'}
                ></textarea>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex items-center justify-center gap-1 mt-5 bg-[#3026bf] hover:bg-[#4035d9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 w-full rounded-full transition"
                >
                    {status === 'submitting' ? (
                        <>
                            Sending...
                            <svg className="animate-spin ml-2 h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </>
                    ) : (
                        <>
                            Submit Form
                            <svg className="mt-0.5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="currentColor" />
                            </svg>
                        </>
                    )}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                    <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                        ✓ Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                )}
                {status === 'error' && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                        ✕ Something went wrong. Please try again or email me directly.
                    </div>
                )}
            </div>
        </form>
    );
}
