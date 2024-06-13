import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignInForm } from "@/components/sign-in-form"; // Use named import
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "@/components/ui/use-toast";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Mock firebase/auth
jest.mock("firebase/auth", () => ({
    signInWithEmailAndPassword: jest.fn(),
}));

// Mock use-toast
jest.mock("@/components/ui/use-toast", () => ({
    toast: jest.fn(),
}));
