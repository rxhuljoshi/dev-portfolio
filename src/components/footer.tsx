"use client";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 px-6 border-t border-white/10">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-white/50 text-sm">
                    © {currentYear} Rahul Joshi. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
