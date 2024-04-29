"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    UsersIcon,
    MapIcon,
    TrophyIcon,
    Settings,
    LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FIREBASE_AUTH } from "@/firebaseconfig";
import { signOut } from "firebase/auth";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        // color: "text-sky-500",
    },
    {
        label: "Map",
        icon: MapIcon,
        href: "/map",
        // color: "text-sky-500",
    },
    {
        label: "Users",
        icon: UsersIcon,
        href: "/users",
        // color: "text-sky-500",
    },
    {
        label: "Leaderboard",
        icon: TrophyIcon,
        href: "/leaderboard",
        // color: "text-sky-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(FIREBASE_AUTH); // Perform the sign out
            router.push("/"); // Redirect to the home page
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    const pathname = usePathname();

    return (
        <div className="space-y-4 flex flex-col h-full justify-between pb-3">
            <div className="flex-1 ">
                {/* px-3 py-2  */}
                <div className="p-4 h-16 border-b-[1px]">
                    <Link href="/dashboard" className="flex items-center">
                        <div className="relative h-8 w-8">
                            <Image src="/leaf-eco.svg" fill alt="logo" />
                        </div>

                        <h1 className={cn("text-lg font-bold")}>
                            UM Eco-Mobility
                        </h1>
                    </Link>
                </div>

                <div className="space-y-1 px-3 py-8 flex-col justify-between">
                    <p className="pl-3 mb-2 text-lg font-semibold">Menu</p>
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-center font-medium cursor-pointer hover:bg-gray-200 rounded-lg transition",
                                pathname === route.href
                                    ? "text-black bg-gray-100" // Active link styles
                                    : "text-gray-600" // Default state styles
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className="h-5 w-5 mr-3" />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <hr className="mt-auto" />

            <div className="space-y-1 px-3 flex-col justify-between">
                <button
                    onClick={handleLogout}
                    className="text-sm group flex p-3 w-full justify-center font-medium cursor-pointer hover:bg-red-600 hover:text-white rounded-lg transition text-red-600"
                >
                    <div className="flex items-center flex-1">
                        <LogOutIcon className="h-5 w-5 mr-3" />
                        Log out
                    </div>
                </button>
            </div>
        </div>
    );
}
