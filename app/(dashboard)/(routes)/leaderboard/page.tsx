"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Leaderboard {
    userId: string;
    name: string;
    profileImgURL: string;
    xp: number;
    ranking: number;
}

export default function DashboardPage() {
    const router = useRouter();

    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const leaderboardRef = collection(FIRESTORE_DB, "leaderboard");

        setLoading(true); // start loading

        //fetching data
        const subscriber = onSnapshot(leaderboardRef, {
            next: (snapshot) => {
                const leaderboardData: any = [];

                snapshot.docs.forEach((doc) => {
                    const leaderboardDocData = doc.data();
                    leaderboardData.push({
                        id: doc.id,
                        ...leaderboardDocData,
                    });
                });

                // Sort the data by 'xp' in descending order
                leaderboardData.sort((a: any, b: any) => b.xp - a.xp);

                console.log(leaderboardData);

                setLeaderboard(leaderboardData); // update state with fetched data
                setLoading(false); // stop loading
            },
            error: (error) => {
                console.error("Error fetching leaderboard data: ", error);
                setLoading(false); // ensure loading is false in case of error
            },
        });

        return () => subscriber();
    }, []);

    const getInitials = (fullName: string): string => {
        return fullName
            .trim()
            .split(" ")
            .filter((word) => word !== "") // Filter out any empty results from consecutive spaces
            .slice(0, 2) // Take only the first two words
            .map((word) => word[0].toUpperCase()) // Take first character of each word and uppercase it
            .join(""); // Join all characters to form the initials
    };

    return (
        <div className="px-10 py-8">
            <h1 className="text-2xl font-semibold mb-3">Leaderboard</h1>
            <div className="flex flex-col space-y-2">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    leaderboard.map((user, i) => (
                        <Card
                            className={cn(
                                "flex p-6 justify-between items-center "
                            )}
                            key={i}
                        >
                            <div className="flex items-center space-x-4 ">
                                <CardTitle>{i + 1}</CardTitle>
                                <Avatar>
                                    <AvatarImage src={user.profileImgURL} />
                                    <AvatarFallback>
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-lg font-semibold">
                                        {user.name}
                                    </p>
                                </div>
                            </div>

                            <p>XP: {user.xp}</p>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
