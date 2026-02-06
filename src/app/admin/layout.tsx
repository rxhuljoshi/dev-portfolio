"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    Briefcase,
    FolderOpen,
    Image,
    User,
    LogOut,
    Settings,
    Home,
    FileText
} from "lucide-react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Skip auth check for login page
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/admin/login");
                return;
            }

            setUserEmail(user.email || null);
            setLoading(false);
        };

        checkAuth();
    }, [router, isLoginPage]);

    // Render login page without layout wrapper
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const navItems = [
        { href: "/admin", icon: Settings, label: "Dashboard" },
        { href: "/admin/experiences", icon: Briefcase, label: "Experiences" },
        { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
        { href: "/admin/coolstuff", icon: Image, label: "Cool Stuff" },
        { href: "/admin/about", icon: User, label: "About & Skills" },
        { href: "/admin/cv", icon: FileText, label: "CV Updates" },
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white/5 border-r border-white/10 p-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold">Admin Panel</h1>
                        <p className="text-white/50 text-xs truncate max-w-[140px]">
                            {userEmail}
                        </p>
                    </div>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
                    >
                        <Home className="w-5 h-5" />
                        View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
