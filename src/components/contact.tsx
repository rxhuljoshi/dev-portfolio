"use client";

import { ClipPathLinks } from "@/components/ui/clip-path-links";
import ContactForm from "@/components/ui/contact-form";
import DecryptedText from "@/components/ui/decrypted-text";

export function Contact() {
    return (
        <section id="contact" className="pt-16 pb-32 px-6 md:px-12 lg:px-20 w-full">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
                    <DecryptedText
                        text="Let's Connect"
                        animateOn="view"
                        revealDirection="center"
                        speed={50}
                        maxIterations={15}
                        className="text-white"
                        encryptedClassName="text-white/40"
                    />
                </h2>

                <div className="grid md:grid-cols-[1fr_auto] gap-24 items-start">
                    {/* Social Links - Left */}
                    <div>
                        <ClipPathLinks />
                    </div>

                    {/* Contact Form - Right */}
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
