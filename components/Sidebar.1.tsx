"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "./sidebar";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 flex flex-col h-full">
            <div className="flex-1 ">
                {/* px-3 py-2  */}
                <div className="p-3">
                    <Link href="/dashboard" className="flex items-center pl-3">
                        {/* <div className="relative h-8 w-8">
                <Image src="/logo.png" fill alt="logo" />
            </div> */}

                        <h1 className={cn("text-lg font-bold")}>
                            UM Eco-Mobility
                        </h1>
                    </Link>
                </div>

                <hr />
                <div className="space-y-1 px-3 py-8">
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
        </div>
    );
}
