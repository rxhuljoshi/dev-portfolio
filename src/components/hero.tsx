"use client";

import { LiquidButton } from "@/components/ui/button";
import DecryptedText from "@/components/ui/decrypted-text";
import TextType from "@/components/ui/text-type";

// Corner bracket component for the hero box
function CornerBracket({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
    const baseClasses = "absolute w-6 h-6 text-white/40";

    const positionClasses = {
        "top-left": "-left-3 -top-3",
        "top-right": "-right-3 -top-3 rotate-90",
        "bottom-left": "-left-3 -bottom-3 -rotate-90",
        "bottom-right": "-right-3 -bottom-3 rotate-180",
    };

    return (
        <svg
            className={`${baseClasses} ${positionClasses[position]}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M4 4 L4 12" />
            <path d="M4 4 L12 4" />
        </svg>
    );
}

export function Hero() {
    return (
        <section id="home" className="relative pb-32 w-full">
            <div className="animation-delay-8 animate-fadeIn pt-16 flex flex-col items-center justify-center px-4 text-center md:pt-24">
                <div className="mb-10 mt-4 md:mt-6 w-full">
                    <div className="px-4 md:px-8">
                        <div className="relative mx-auto w-full max-w-[95vw] py-20 md:py-32 lg:max-w-5xl lg:py-40">
                            {/* Corner brackets */}
                            <CornerBracket position="top-left" />
                            <CornerBracket position="top-right" />
                            <CornerBracket position="bottom-left" />
                            <CornerBracket position="bottom-right" />

                            <h1 className="select-none px-3 py-2 text-center text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
                                <DecryptedText
                                    text="Hi, I'm Rahul"
                                    animateOn="view"
                                    sequential={true}
                                    revealDirection="start"
                                    speed={120}
                                    maxIterations={20}
                                    className="text-white"
                                    encryptedClassName="text-white/40"
                                />
                            </h1>
                            <div className="flex items-center justify-center mt-6">
                                <LiquidButton className="flex flex-row items-center gap-2 text-green-500">
                                    <span className="relative flex h-3 w-3 items-center justify-center">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                    </span>
                                    Available Now
                                </LiquidButton>
                            </div>
                        </div>
                    </div>

                    <h2 className="mt-24 text-xl text-white md:text-2xl">
                        While I&apos;m a human surviving on a lot caffeine, I&apos;m also a{' '}
                        <TextType
                            text={["Backend Developer", "ML Engineer", "Photographer", "Motorbike Enthusiast", "Cricket Lover"]}
                            typingSpeed={75}
                            deletingSpeed={50}
                            pauseDuration={1500}
                            showCursor
                            cursorCharacter="|"
                            className="font-bold text-green-400"
                            cursorClassName="text-green-400"
                        />
                    </h2>
                </div>
            </div>
        </section>
    );
}
