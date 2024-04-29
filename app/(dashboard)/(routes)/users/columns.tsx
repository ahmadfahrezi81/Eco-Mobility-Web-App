"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import { ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { getuid } from "process";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableRowActions } from "./data-table-row-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export interface User {
    email: string;
    name: string;
    uid: string;
    joinedDate: Timestamp;
    profileImgURL?: string;
    lastUpdated?: Timestamp;
}

const getInitials = (fullName: string): string => {
    return fullName
        .trim()
        .split(" ")
        .filter((word) => word !== "") // Filter out any empty results from consecutive spaces
        .slice(0, 2) // Take only the first two words
        .map((word) => word[0].toUpperCase()) // Take first character of each word and uppercase it
        .join(""); // Join all characters to form the initials
};

export const columns: ColumnDef<User>[] = [
    // {
    //     accessorKey: "name",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Name" />
    //     ),
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex space-x-3">
    //                 <Avatar>
    //                     <AvatarImage src={""} />
    //                     <AvatarFallback>
    //                         {getInitials(row.original.name)}
    //                     </AvatarFallback>
    //                 </Avatar>
    //                 <div className="flex-col">
    //                     <div className="font-semibold">
    //                         {row.getValue("name")}
    //                     </div>
    //                     <div className="text-gray-500 text-[12px]">
    //                         ID:{row.original.uid}
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     },
    //     filterFn: (row, id, value) => {
    //         return value.includes(row.getValue(id));
    //     },
    // },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-3">
                    <Avatar>
                        <AvatarImage src={row.original.profileImgURL} />
                        <AvatarFallback>
                            {getInitials(row.original.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-col">
                        <div className="font-semibold">
                            {row.getValue("name")}
                        </div>
                        <div className="text-gray-500 text-[12px]">
                            ID:{row.original.uid}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "joinedDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Joined Date" />
        ),
        cell: ({ row }) => {
            if (row.original.joinedDate?.seconds) {
                const date = new Date(
                    row.original.joinedDate.seconds * 1000
                ).toLocaleDateString("en-US");
                return (
                    <div className="flex-col">
                        <div className="">{date}</div>
                    </div>
                );
            } else {
                return (
                    <div className="flex-col">
                        <div className="">N/A</div>
                    </div>
                );
            }
        },
    },
    {
        accessorKey: "lastUpdated",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Updated" />
        ),
        cell: ({ row }) => {
            if (row.original.lastUpdated?.seconds) {
                const date = new Date(
                    row.original.lastUpdated?.seconds * 1000
                ).toLocaleDateString("en-US");
                return (
                    <div className="flex-col">
                        <div className="">{date}</div>
                    </div>
                );
            } else {
                //if no lastUpdated date assume using joinedDate
                const date = new Date(
                    row.original.joinedDate?.seconds * 1000
                ).toLocaleDateString("en-US");

                return (
                    <div className="flex-col">
                        <div className="">{date}</div>
                    </div>
                );
            }
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
