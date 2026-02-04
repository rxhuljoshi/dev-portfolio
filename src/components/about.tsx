"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecryptedText from "@/components/ui/decrypted-text";
import { LiquidButton } from "@/components/ui/button";
import Link from "next/link";

const images = [
    "/Rahul 1.png",
    "/Rahul 2.png",
    "/Rahul 3.png"
];

function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function About() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(1200);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    // Responsive gap calculation
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-rotate images
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    function getImageStyle(index: number): React.CSSProperties {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + images.length) % images.length === index;
        const isRight = (activeIndex + 1) % images.length === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    return (
        <section id="about" className="pt-16 pb-32 px-6 md:px-12 lg:px-20 w-full">
            <div className="max-w-10xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-24 md:mb-48">
                    <DecryptedText
                        text="About Me"
                        animateOn="both"
                        sequential={true}
                        revealDirection="start"
                        speed={60}
                        maxIterations={20}
                        className="text-white"
                        encryptedClassName="text-white/40"
                    />
                </h2>

                <div className="w-full">
                    <div className="grid gap-16 md:gap-20 lg:gap-48 md:grid-cols-2 items-center justify-center max-w-6xl mx-auto">
                        {/* Images */}
                        <div className="flex flex-col items-center md:items-end">
                            <div
                                className="relative w-80 h-80 md:w-96 md:h-96"
                                ref={imageContainerRef}
                                style={{ perspective: "1000px" }}
                            >
                                {images.map((src, index) => (
                                    <img
                                        key={src}
                                        src={src}
                                        alt={`About image ${index + 1}`}
                                        className="absolute w-full h-full object-cover rounded-3xl shadow-2xl"
                                        style={getImageStyle(index)}
                                    />
                                ))}
                            </div>
                            <div className="mt-12 w-80 md:w-96 flex justify-center">
                                <Link href="/coolstuff">
                                    <LiquidButton>
                                        Make these for yourself
                                    </LiquidButton>
                                </Link>
                            </div>
                        </div>

                        {/* Content - Bio text */}
                        <div className="flex flex-col justify-start -mt-48" style={{ width: '600px' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    <p className="text-white text-base leading-relaxed">
                                        My name is Rahul Joshi, and I am a Computer Science undergraduate and Backend &amp; Machine Learning Engineer with hands-on experience building scalable APIs, AI-powered systems, and data-driven applications. I specialize in creating reliable backend architectures using Python, Django, FastAPI, and modern ML tools like PyTorch, FAISS, and vector databases.
                                    </p>
                                    <p className="text-white text-base leading-relaxed">
                                        Alongside my backend and ML work, I have solid full-stack experience with JavaScript, React, and Next.js, which allows me to take projects from concept to deployment — from designing clean interfaces to connecting efficient, scalable backends. I have built software for startups, academic projects, and real-world platforms, focusing on performance, reliability, and practical usability. Learning machine learning from scratch and applying it to real problems has shaped my approach: build smart systems, keep them maintainable, and make sure they scale.
                                    </p>
                                    <p className="text-white text-base leading-relaxed">
                                        Outside of work, you&apos;ll usually find me at the gym, gaming, playing cricket, or working on late-night side projects that start at 2 AM and somehow turn into full prototypes. I enjoy solving problems, exploring new technologies, and constantly improving my craft. I&apos;m always excited to learn, experiment, and contribute to impactful products built by driven, forward-thinking teams.
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
