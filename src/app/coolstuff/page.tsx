"use client";

import { useEffect } from "react";
import DecryptedText from "@/components/ui/decrypted-text";
import { motion } from "framer-motion";
import { renderCanvas } from "@/components/ui/canvas";
import { LiquidButton } from "@/components/ui/button";
import Dock from "@/components/ui/dock";
import { ArrowLeft, Home, User, Briefcase, Code, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";

interface PhotoPrompt {
    image: string;
    prompt: string;
}

const photoPrompts: PhotoPrompt[] = [
    {
        image: "/Rahul 1.png",
        prompt: "Create a stylized comic-style portrait of a young Indian man with curly black hair, wearing a black hoodie. The art style should be vibrant and modern with bold outlines, similar to pop art or graphic novel illustrations. The background should feature colorful abstract shapes and patterns."
    },
    {
        image: "/Rahul 2.png",
        prompt: "Generate a comic-style illustration of a young Indian man in a dynamic pose, wearing casual streetwear. Use bold colors, strong shadows, and graphic novel aesthetics. Add urban graffiti-style elements in the background with bright yellows and contrasting colors."
    },
    {
        image: "/Rahul 3.png",
        prompt: "Create an animated-style portrait of a young Indian man with curly hair in a confident stance. The style should be reminiscent of modern animation or comic books with clean lines, vibrant colors, and expressive details. Include stylized background elements."
    },
];

export default function CoolStuffPage() {
    const router = useRouter();

    useEffect(() => {
        renderCanvas();
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
                <Link href="/#about">
                    <LiquidButton className="w-12 h-12 rounded-full flex items-center justify-center p-0">
                        <ArrowLeft size={20} className="text-white" />
                    </LiquidButton>
                </Link>

                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
                        <DecryptedText
                            text="Cool Stuff"
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
                        Want to create similar AI-generated portraits? Here are the prompts I used with Gemini to create these images. Feel free to use them as inspiration!
                    </p>

                    <div className="space-y-16">
                        {photoPrompts.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                            >
                                {/* Image */}
                                <div className="flex justify-center md:justify-end">
                                    <img
                                        src={item.image}
                                        alt={`AI Portrait ${index + 1}`}
                                        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl"
                                    />
                                </div>

                                {/* Prompt */}
                                <div className="flex flex-col justify-center">
                                    <span className="text-green-400 text-sm font-semibold mb-2">
                                        Prompt #{index + 1}
                                    </span>
                                    <p className="text-white/90 text-base leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10">
                                        {item.prompt}
                                    </p>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(item.prompt)}
                                        className="mt-4 text-green-400 text-sm hover:text-green-300 transition-colors self-start flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                        </svg>
                                        Copy prompt
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
