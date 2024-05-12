"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
// import { taskSchema } from "../data/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseconfig";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

import * as z from "zod";
import { Input } from "@/components/ui/input";
import { User } from "./columns";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
});

export function DataTableRowActions<TData extends User>({
    row,
}: DataTableRowActionsProps<TData>) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const router = useRouter(); // Create a router instance

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: row.original.name,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userRef = await doc(
                FIRESTORE_DB,
                `users/${row.original.uid}` //need to get user id without dynamically
            );

            // Update the user document in Firestore
            await updateDoc(userRef, { name: values.name });

            const leaderboardRef = await doc(
                FIRESTORE_DB,
                `leaderboard/${row.original.uid}`
            );

            await updateDoc(leaderboardRef, { name: values.name });

            // Close the edit dialog
            // form.reset();
            setIsEditDialogOpen(false);

            toast({
                title: "Update Successful",
                description: "The user data has been successfully updated.",
            });

            document.body.style.pointerEvents = "";
        } catch (error) {
            console.error("Error updating user: ", error);

            toast({
                title: "Update Failed",
                description:
                    "An error occurred while updating user data. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (
        <>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            User&apos;s name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter new user's name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button disabled={isLoading}>Save</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Confirmation</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data.
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* Dropdown menu for row actions */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-8 w-8 p-0">
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem
                        onClick={() => {
                            setIsEditDialogOpen(true);
                            //need to to fix the pointer; w/t this it will disable click
                            //after dialog is open
                            document.body.style.pointerEvents = "";
                        }}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            setIsDeleteDialogOpen(true);
                            document.body.style.pointerEvents = "";
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
