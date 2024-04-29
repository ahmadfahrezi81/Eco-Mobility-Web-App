"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FIRESTORE_DB } from "@/firebaseconfig";
import { cn } from "@/lib/utils";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import {
    ArrowRight,
    Code,
    ImageIcon,
    MessageSquare,
    Music,
    VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export interface User {
    email: string;
    name: string;
    uid: string;
    joinedDate: Timestamp;
    lastUpdated?: Timestamp;
}

export default function DashboardPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const usersRef = collection(FIRESTORE_DB, "users");

        setLoading(true); // start loading

        const subscriber = onSnapshot(usersRef, {
            next: (snapshot) => {
                const userData: any = [];

                snapshot.docs.forEach((doc) => {
                    const userDocData = doc.data();
                    userData.push({
                        id: doc.id,
                        ...userDocData,
                    });
                });

                setUsers(userData); // update state with fetched data
                setLoading(false); // stop loading

                console.log(userData);
            },
        });

        return () => subscriber();
    }, []);

    return (
        <div className="px-10 py-8">
            <h1 className="text-2xl font-semibold mb-3">Users</h1>
            <div className="flex flex-col gap-3">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    // users.map((user, id) => (
                    //     <Card className={cn("flex")} key={id}>
                    //         <CardHeader>
                    //             <CardTitle>{user.name}</CardTitle>
                    //             <CardDescription>{user.uid}</CardDescription>
                    //         </CardHeader>

                    //         <CardContent>
                    //             <div>
                    //                 {user.joinedDate &&
                    //                     moment(user.joinedDate.toDate()).format(
                    //                         "MMM DD, YYYY"
                    //                     )}
                    //             </div>
                    //             <div>{user.email}</div>
                    //         </CardContent>
                    //     </Card>
                    // ))
                    // <div className="mx-auto">
                    <DataTable columns={columns} data={users} />
                    // </div>
                )}
            </div>
        </div>
    );
}
