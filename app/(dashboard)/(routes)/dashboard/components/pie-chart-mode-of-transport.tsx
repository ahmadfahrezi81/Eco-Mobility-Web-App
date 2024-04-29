"use client";

import { Card } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Label,
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

const colors = ["#6CB9AD", "#324DDD", "#EB5757", "#282A3D"];

// const data = [
//     {
//         name: "Group A",
//         value: 400,
//     },
//     {
//         name: "Group B",
//         value: 300,
//     },
//     {
//         name: "Group C",
//         value: 300,
//     },
//     {
//         name: "Group D",
//         value: 200,
//     },
// ];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.45;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent > 0) {
        // Check if the percentage is greater than 0
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }
    return null;

    // return (
    //     <text
    //         x={x}
    //         y={y}
    //         fill="white"
    //         textAnchor={x > cx ? "start" : "end"}
    //         dominantBaseline="central"
    //     >
    //         {`${(percent * 100).toFixed(0)}%`}
    //     </text>
    // );
};

export default function PieChartModeOfTransport({ data }: any) {
    const generateRandomData = (data: any) => {
        const vehicleGroups = ["walk", "motorcycle", "car", "bus"];
        const groupedData = vehicleGroups.map((group) => ({
            name: group,
            value: data.filter((item: any) => item.vehicle === group).length,
        }));
        return groupedData;
    };

    const pieChartData = generateRandomData(data);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={20}
                    label={renderCustomizedLabel}
                    labelLine={false}
                >
                    {pieChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Legend />

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
