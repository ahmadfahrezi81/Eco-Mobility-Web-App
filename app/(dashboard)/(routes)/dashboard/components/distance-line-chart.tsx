"use client";

import { Card } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
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

// const data = [
//     {
//         name: "Day 1",
//         distance: 4000,
//     },
//     {
//         name: "Day 2",
//         distance: 3000,
//     },
//     {
//         name: "Day 3",
//         distance: 2000,
//     },
//     {
//         name: "Day 4",
//         distance: 2780,
//     },
//     {
//         name: "Day 5",
//         distance: 1890,
//     },
//     {
//         name: "Day 6",
//         distance: 2390,
//     },
//     {
//         name: "Day 7",
//         distance: 3490,
//     },
// ];

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

export default function DistanceLineChart({ data }: any) {
    const generateData = (data: any) => {
        const dates = getLast7Days();
        const formattedData = dates.map((date, index) => {
            let distance = 0;

            data.forEach((item: any) => {
                const endTimeDate = new Date(item.endTime.seconds * 1000);

                if (
                    date ===
                    endTimeDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                    })
                ) {
                    distance += item.distance;
                }
            });

            return {
                name: date,
                distance: distance,
            };
        });

        return formattedData;
    };

    const formattedData = generateData(data);

    return (
        <ResponsiveContainer width="100%" height={260}>
            <LineChart
                data={formattedData}
                margin={{ top: 10, right: 5, bottom: 20 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    stroke="#888888"
                    fontSize={12}
                    axisLine={false}
                />
                <YAxis
                    dataKey="distance"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value} KM`}
                />
                <Tooltip />
                <Line
                    type="linear"
                    dataKey="distance"
                    stroke="red"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
