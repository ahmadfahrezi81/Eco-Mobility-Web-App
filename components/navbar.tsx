"use client";

import MobileSidebar from "@/components/mobile-sidebar";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const getInitials = (fullName: string): string => {
    return fullName
        .trim()
        .split(" ")
        .filter((word) => word !== "") // Filter out any empty results from consecutive spaces
        .slice(0, 2) // Take only the first two words
        .map((word) => word[0].toUpperCase()) // Take first character of each word and uppercase it
        .join(""); // Join all characters to form the initials
};

export default function Navbar() {
    const [date, setDate] = useState(new Date());
    const name = "Ahmad Farhezi";

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center p-4 h-16 border-b-[1px] bg-white">
            <div className="flex-1">
                <p className="text-[15px] font-semibold">Hello {name},</p>
                <p className="text-sm font-medium text-slate-600">
                    Today is {date.toDateString()}
                </p>
            </div>

            <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>

            <hr />
            {/* <MobileSidebar /> */}
            {/* <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div> */}
        </div>
    );
}
