"use client";

import { motion } from "framer-motion";
import DecryptedText from "@/components/ui/decrypted-text";
import { experiences } from "@/data/experience";
import type { Experience as ExperienceType, Role } from "@/data/experience";
import { Calendar, FileText } from "lucide-react";

function RoleCard({ role }: { role: Role }) {
    return (
        <div className="mb-6 last:mb-0">

            {/* Job title */}
            <h4 className="text-white/90 text-base font-medium mb-1">
                {role.title}
            </h4>

            {/* Period */}
            <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                <Calendar size={14} />
                {role.period}
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-4">
                {role.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3 py-1 text-xs rounded-full bg-transparent text-white/70 border border-white/20"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ExperienceCard({ experience, index }: { experience: ExperienceType; index: number }) {
    const hasMultipleRoles = experience.roles.length > 1;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 pb-12 last:pb-0"
        >
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />

            {/* Timeline dot */}
            <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-1/2 border-2 ${hasMultipleRoles
                ? 'bg-green-400 border-green-400'
                : 'bg-transparent border-white/50'
                }`} />

            {/* Company Name - Biggest */}
            <div className="flex items-center gap-2 mb-3">
                <FileText size={18} className="text-white/50" />
                <h3 className="text-white text-xl font-bold">
                    {experience.company}, {experience.location}
                </h3>
            </div>

            {/* Roles - show all roles under company if promoted */}
            <div className={hasMultipleRoles ? "border-l-2 border-green-400/30 pl-4 ml-1" : ""}>
                {experience.roles.map((role, roleIndex) => (
                    <RoleCard
                        key={roleIndex}
                        role={role}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export function Experience() {
    return (
        <section id="experience" className="pt-16 pb-32 px-6 md:px-12 lg:px-20 w-full">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                    <DecryptedText
                        text="My Experience"
                        animateOn="view"
                        sequential={true}
                        revealDirection="start"
                        speed={60}
                        maxIterations={20}
                        className="text-white"
                        encryptedClassName="text-white/40"
                    />
                </h2>

                <p className="text-white/50 text-center mb-16">
                    Professional experience that I have accumulated over several years.
                </p>

                <div className="relative">
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
