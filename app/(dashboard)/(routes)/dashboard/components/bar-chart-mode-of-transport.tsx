"use client";

import { Card } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
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

const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
        });
        dates.push(formattedDate);
    }
    return dates;
};

export default function BarChartModeOfTransport({ data }: any) {
    const [formattedData, setFormattedData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const generateData = (data: any) => {
            const dates = getLast7Days();
            const vehicles = ["walking", "motorcycle", "car", "bus"];

            const formattedData = dates.map((date, index) => {
                const vehicleData: { [key: string]: number } = {};

                data.forEach((item: any) => {
                    const endTimeDate = new Date(item.endTime.seconds * 1000);
                    const itemDate = endTimeDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                    });

                    if (date === itemDate) {
                        vehicles.forEach((vehicle) => {
                            if (!vehicleData[vehicle]) {
                                vehicleData[vehicle] = 0;
                            }
                            if (item.vehicle === vehicle) {
                                vehicleData[vehicle]++;
                            }
                        });
                    }
                });

                return { name: date, ...vehicleData };
            });

            setFormattedData(formattedData);
            setIsLoading(false); // Set loading state to false after data is formatted
        };

        generateData(data);
    }, [data]);

    if (isLoading) {
        return <p>Loading...</p>; // Display loading state
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart width={730} height={250} data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="walking" fill="#6CB9AD" />
                <Bar dataKey="motorcycle" fill="#324DDD" />
                <Bar dataKey="car" fill="#EB5757" />
                <Bar dataKey="bus" fill="#282A3D" />
            </BarChart>
        </ResponsiveContainer>
    );
}
