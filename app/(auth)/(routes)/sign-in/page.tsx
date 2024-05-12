"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, query, where } from "firebase/firestore";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export default function Page() {
    const auth = FIREBASE_AUTH;
    const router = useRouter(); // Create a router instance

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            const { user } = userCredential;
            const uid = user.uid;

            console.log(uid);

            const leaderboardRef = collection(FIRESTORE_DB, "admins");
            const querySnapshot = await getDocs(
                query(leaderboardRef, where("uid", "==", uid))
            );

            if (!querySnapshot.empty) {
                router.push("/dashboard");
            } else {
                throw new Error("No matching admins found.");
            }

            form.reset();
        } catch (error: any) {
            console.error("Login failed", error);

            // Check if the error is a FirebaseError
            if (error instanceof FirebaseError) {
                toast({
                    title: "Authentication Error",
                    description: error.message,
                    variant: "destructive",
                });
            } else {
                // Handle other types of errors
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <>
            <div className="md:hidden"></div>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="./leaf-eco.svg"
                                alt="logo"
                                width={32}
                                height={32}
                            />
                            <h1 className="text-lg font-bold ml-2">
                                UM Eco-Mobility
                            </h1>
                        </Link>
                    </div>

                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This library has saved me countless hours
                                of work and helped me deliver stunning designs
                                to my clients faster than ever before.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                {/* <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <Label
                                            className="sr-only"
                                            htmlFor="email"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            placeholder="Enter your email"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label
                                            className="sr-only"
                                            htmlFor="password"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            placeholder="Enter your password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <Button disabled={isLoading}>
                                        {isLoading && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 animate-spin"
                                            >
                                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                            </svg>
                                        )}
                                        Sign In
                                    </Button>
                                </div> */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    autoCapitalize="none"
                                                    autoComplete="email"
                                                    autoCorrect="off"
                                                    disabled={isLoading}
                                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    autoCapitalize="none"
                                                    autoCorrect="off"
                                                    disabled={isLoading}
                                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} className="mt-4">
                                    {isLoading ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 h-4 w-4 animate-spin"
                                        >
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        </svg>
                                    ) : null}
                                    Sign In
                                </Button>
                            </form>
                        </Form>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
