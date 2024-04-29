"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { FIREBASE_AUTH } from "@/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"; // Correct the import here
import { useEffect, useState } from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                // User is authenticated
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                // User is not authenticated, redirect them
                setIsLoading(false);
                router.replace("/sign-in");
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [router]);

    if (isLoading) {
        // Optionally, show a loader or blank page until authentication status is confirmed
        return null;
    }

    if (!isAuthenticated) {
        // If not authenticated, nothing gets returned; although redirection is handled in useEffect
        return null;
    }

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 border-r-[1px]">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
