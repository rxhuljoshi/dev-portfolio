"use client";

import { useEffect } from "react";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import Dock from "@/components/ui/dock";
import { renderCanvas } from "@/components/ui/canvas";
import { Home, User, Briefcase, Code, Phone } from "lucide-react";

export default function Page() {
  useEffect(() => {
    renderCanvas();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'instant' });
    }
  };

  const dockItems = [
    { icon: <Home size={24} />, label: 'Home', onClick: () => scrollToSection('home') },
    { icon: <User size={24} />, label: 'About', onClick: () => scrollToSection('about') },
    { icon: <Briefcase size={24} />, label: 'Projects', onClick: () => scrollToSection('projects') },
    { icon: <Code size={24} />, label: 'Experience', onClick: () => scrollToSection('experience') },
    { icon: <Phone size={24} />, label: 'Contact', onClick: () => scrollToSection('contact') },
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

      {/* Sections with consistent pb-32 spacing */}
      <div className="relative z-10 pb-24 w-full">
        <Hero />
        <About />
        <Projects />

        <Experience />

        <Contact />
        <Footer />
      </div>
    </main>
  );
}
