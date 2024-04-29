"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import DistanceLineChart from "./components/distance-line-chart";
import EmissionLineChart from "./components/emission-line-chart";
import PieChartModeOfTransport from "./components/pie-chart-mode-of-transport";
import BarChartModeOfTransport from "./components/bar-chart-mode-of-transport";
import { useEffect, useState } from "react";
import { FIRESTORE_DB } from "@/firebaseconfig";
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { set, startOfToday, sub, isAfter, isBefore } from "date-fns";
import { Car } from "lucide-react";

export default function DashboardPage() {
    // const [loading, setLoading] = useState(true);
    // const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState<any>([]);

    useEffect(() => {
        const trackingActivitiesRef = collection(
            FIRESTORE_DB,
            "trackingActivities"
        );

        const endDate = startOfToday();
        const startDate = sub(endDate, { days: 7 });

        const subscriber = onSnapshot(trackingActivitiesRef, {
            next: (snapshot) => {
                const promises = snapshot.docs.map((doc) => {
                    const trackingActivityRef = collection(
                        doc.ref,
                        "userTrackingActivities"
                    );

                    return getDocs(trackingActivityRef);
                });

                Promise.all(promises)
                    .then((allSnapshots) => {
                        const filteredData: any[] = [];

                        allSnapshots.forEach((userTrackingSnapshot) => {
                            userTrackingSnapshot.forEach((userDoc) => {
                                const data = userDoc.data();
                                const endTime = new Date(
                                    data.endTime.seconds * 1000
                                );

                                if (isAfter(endTime, startDate)) {
                                    filteredData.push(data);
                                }
                            });
                        });

                        setLoading(false); // Stop loading
                        setActivities(filteredData);

                        console.log(filteredData);
                    })
                    .catch((error) =>
                        console.error(
                            "Error fetching user tracking data:",
                            error
                        )
                    );
            },
            error: (error) => {
                console.error("Error fetching tracking activities:", error);
                setLoading(false);
            },
        });

        return () => subscriber();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
            <div className="lg:col-span-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Emission</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <EmissionLineChart data={activities} />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Distance</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <DistanceLineChart data={activities} />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Mode of Transport
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <PieChartModeOfTransport data={activities} />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Mode of Transport
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <BarChartModeOfTransport data={activities} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
