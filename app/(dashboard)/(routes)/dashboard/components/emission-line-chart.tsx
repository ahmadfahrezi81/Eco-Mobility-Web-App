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
import { getCO2EmissionRate } from "@/lib/helpers";

// const data = [
//     {
//         name: "Day 1",
//         emission: 4000,
//     },
//     {
//         name: "Day 2",
//         emission: 3000,
//     },
//     {
//         name: "Day 7",
//         emission: 3490,
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

// const generateData = () => {
//     const dates = getLast7Days();
//     const data = dates.map((date, index) => ({
//         name: date,
//         emission: Math.floor(Math.random() * 5000),
//     }));

//     return data;
// };

// const data = generateData();

export default function EmissionLineChart({ data }: any) {
    const generateData = (data: any) => {
        const dates = getLast7Days();
        const formattedData = dates.map((date, index) => {
            let emission = 0;

            data.forEach((item: any) => {
                const endTimeDate = new Date(item.endTime.seconds * 1000);

                if (
                    date ===
                    endTimeDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                    })
                ) {
                    emission +=
                        item.distance * getCO2EmissionRate(item.vehicle);
                }
            });

            return {
                name: date,
                emission: emission,
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
                    dataKey="emission"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value} KG`}
                />
                <Tooltip />
                <Line
                    type="linear"
                    dataKey="emission"
                    stroke="red"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
