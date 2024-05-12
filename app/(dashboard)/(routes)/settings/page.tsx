"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebaseconfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

const formSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
    email: z.string().email().optional(),
    id: z.string().optional(), // You may choose z.number() based on what ID represents
});

// const defaultValues: Partial<ProfileFormValues> = {
//     email: "example@example.com",
//     id: "123456",
//     name: "",
// };

export default function SettingsPage() {
    const router = useRouter();
    const [admin, setAdmin] = useState<any>();

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingForSendEmail, setLoadingForSendEmail] =
        useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchAdminData = async () => {
            const adminRef = doc(
                FIRESTORE_DB,
                `admins/${FIREBASE_AUTH.currentUser?.uid}`
            );

            const docSnap = await getDoc(adminRef);

            if (docSnap.exists()) {
                const adminData = docSnap.data();
                setAdmin(adminData);

                form.setValue("name", adminData.name);
                form.setValue("email", adminData.email);
                form.setValue("id", adminData.uid);
                console.log("Admin Data from settings:", adminData);

                setLoading(false);
            } else {
                console.log("Admin document does not exist");
            }
        };

        fetchAdminData();
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            id: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const adminRef = doc(
                FIRESTORE_DB,
                `admins/${FIREBASE_AUTH.currentUser?.uid}`
            );

            await updateDoc(adminRef, { name: values.name });

            setAdmin((prevAdmin: any) => ({
                ...prevAdmin,
                name: values.name,
            }));

            console.log("Admin name updated successfully:", values.name);
            toast({
                title: "Update Successful",
                description: "The admin data has been successfully updated.",
            });
        } catch (error) {
            console.error("Error updating admin name:", error);

            toast({
                title: "Update Failed",
                description:
                    "An error occurred while updating admin data. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handlePasswordReset = async () => {
        setLoadingForSendEmail(true);

        const currentUserEmail = FIREBASE_AUTH.currentUser?.email;

        try {
            if (currentUserEmail) {
                await sendPasswordResetEmail(FIREBASE_AUTH, currentUserEmail);
                toast({
                    title: "Password Reset Email Sent",
                    description:
                        "An email to reset your password has been sent. Please check your inbox.",
                });
            }
        } catch (error) {
            console.error("Error sending password reset email:", error);
            toast({
                title: "Password Reset Failed",
                description:
                    "An error occurred while sending the password reset email. Please try again.",
                variant: "destructive",
            });
        }

        setLoadingForSendEmail(false);
    };

    return (
        <div className="px-10 py-8">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-slate-600 mb-3">Manage your account settings.</p>
            <Separator className="my-6" />

            <h1 className="text-lg font-semibold">Profile</h1>
            <p className="text-slate-600 mb-3">Update profile info.</p>

            <div className="flex flex-col space-y-2">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    disabled={true}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="id"
                                    disabled={true}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>UID</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* <Button type="submit">Update profile</Button> */}
                                <Button disabled={isLoading} type="submit">
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
                                    Update profile
                                </Button>
                            </form>
                        </Form>
                    </>
                )}
            </div>

            <Separator className="my-6" />

            <h1 className="text-lg font-semibold">Reset Password</h1>
            <p className="text-slate-600 mb-3">
                Reset your password by click the button below. And recieve reset
                password email link.
            </p>

            <Button
                onClick={handlePasswordReset}
                disabled={loadingForSendEmail}
            >
                {loadingForSendEmail ? (
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
                Send Password Reset Email
            </Button>
        </div>
    );
}
