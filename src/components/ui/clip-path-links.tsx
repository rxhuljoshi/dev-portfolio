"use client";

import React from "react";
import {
    SiGoogle,
    SiX,
    SiLinkedin,
    SiGithub,
    SiInstagram,
    SiFacebook
} from "react-icons/si";
import { useAnimate } from "framer-motion";

interface LinkBoxProps {
    Icon?: React.ComponentType<{ className?: string }>;
    href: string;
    imgSrc?: string;
    className?: string;
}

export const ClipPathLinks = () => {
    return (
        <div className="divide-y border divide-white/10 border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-white/10">
                <LinkBox Icon={SiGoogle} href="mailto:rjdeep0301@gmail.com" />
                <LinkBox Icon={SiGithub} href="https://github.com/rxhuljoshi" />
            </div>
            <div className="grid grid-cols-4 divide-x divide-white/10">
                <LinkBox Icon={SiX} href="https://x.com/" />
                <LinkBox Icon={SiLinkedin} href="https://www.linkedin.com/in/rxhuljoshi" />
                <LinkBox Icon={SiInstagram} href="https://www.instagram.com/rxhul.irl" />
                <LinkBox Icon={SiFacebook} href="https://www.facebook.com/profile.php?id=100006679291639" />
            </div>
            <div className="grid grid-cols-1 divide-x divide-white/10">
                <LinkBox
                    imgSrc="/icon.jpg"
                    href="https://rxhuljoshi.com"
                    className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full object-cover"
                />
            </div>
        </div>
    );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES: Record<string, string[]> = {
    left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<string, string[]> = {
    left: [NO_CLIP, TOP_RIGHT_CLIP],
    bottom: [NO_CLIP, TOP_RIGHT_CLIP],
    top: [NO_CLIP, TOP_RIGHT_CLIP],
    right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const VIBRANT_COLORS = [
    "#22c55e", // green
    "#3b82f6", // blue
    "#ef4444", // red
    "#f59e0b", // amber
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f97316", // orange
    "#14b8a6", // teal
    "#a855f7", // purple
];

const LinkBox = ({ Icon, href, imgSrc, className }: LinkBoxProps) => {
    const [scope, animate] = useAnimate();
    const [hoverColor, setHoverColor] = React.useState(VIBRANT_COLORS[0]);

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * VIBRANT_COLORS.length);
        return VIBRANT_COLORS[randomIndex];
    };

    const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const box = e.currentTarget.getBoundingClientRect();

        const proximityToLeft = {
            proximity: Math.abs(box.left - e.clientX),
            side: "left",
        };
        const proximityToRight = {
            proximity: Math.abs(box.right - e.clientX),
            side: "right",
        };
        const proximityToTop = {
            proximity: Math.abs(box.top - e.clientY),
            side: "top",
        };
        const proximityToBottom = {
            proximity: Math.abs(box.bottom - e.clientY),
            side: "bottom",
        };

        const sortedProximity = [
            proximityToLeft,
            proximityToRight,
            proximityToTop,
            proximityToBottom,
        ].sort((a, b) => a.proximity - b.proximity);

        return sortedProximity[0].side;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setHoverColor(getRandomColor());
        const side = getNearestSide(e);
        animate(scope.current, {
            clipPath: ENTRANCE_KEYFRAMES[side],
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const side = getNearestSide(e);
        animate(scope.current, {
            clipPath: EXIT_KEYFRAMES[side],
        });
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-white/70 bg-black/30 backdrop-blur-sm transition-colors"
        >
            {imgSrc ? (
                <img
                    src={imgSrc}
                    alt="custom icon"
                    className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
                />
            ) : (
                Icon && <Icon className="text-xl sm:text-3xl md:text-4xl" />
            )}

            <div
                ref={scope}
                style={{ clipPath: BOTTOM_RIGHT_CLIP, backgroundColor: hoverColor }}
                className="absolute inset-0 grid place-content-center text-black transition-colors duration-300"
            >
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt="custom icon hover"
                        className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
                    />
                ) : (
                    Icon && <Icon className="text-xl sm:text-3xl md:text-4xl" />
                )}
            </div>
        </a>
    );
};
