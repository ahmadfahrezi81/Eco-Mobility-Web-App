import { FIREBASE_AUTH } from "@/firebaseconfig";
import { type ClassValue, clsx } from "clsx";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
