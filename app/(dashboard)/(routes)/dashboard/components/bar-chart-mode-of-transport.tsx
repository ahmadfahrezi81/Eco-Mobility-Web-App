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

// const data = [
//     {
//         name: "Day 1",
//         walk: 5,
//         bike: 15,
//         car: 10,
//         bus: 4,
//     },
//     {
//         name: "Day 2",
//         walk: 2,
//         bike: 10,
//         car: 10,
//         bus: 4,
//     },
//     {
//         name: "Day 3",
//         walk: 3,
//         bike: 7,
//         car: 10,
//         bus: 4,
//     },
//     {
//         name: "Day 4",
//         walk: 12,
//         bike: 2,
//         car: 10,
//         bus: 4,
//     },
//     {
//         name: "Day 5",
//         walk: 12,
//         bike: 15,
//         car: 10,
//         bus: 4,
//     },
//     {
//         name: "Day 6",
//         walk: 4,
//         bike: 10,
//         car: 10,
//         bus: 4,
//     },
//     {
//         name: "Day 7",
//         walk: 2,
//         bike: 1,
//         car: 10,
//         bus: 4,
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

// Function to generate random vehicle data for each day
// const generateData = () => {
//     const dates = getLast7Days();
//     const vehicles = ["Walk", "Motor", "Car", "Bus"];

//     const data = dates.map((date, index) => {
//         const vehicleData = {};
//         vehicles.forEach((vehicle) => {
//             vehicleData[vehicle] = Math.floor(Math.random() * 20); // Random values for demonstration
//         });
//         return { name: date, ...vehicleData };
//     });
//     return data;
// };

// const data = generateData();

export default function BarChartModeOfTransport({ data }: any) {
    // const generateData = () => {
    //     const dates = getLast7Days();
    //     const vehicles = ["Walk", "Motor", "Car", "Bus"];

    //     const data = dates.map((date, index) => {
    //         const vehicleData = {};
    //         vehicles.forEach((vehicle) => {
    //             vehicleData[vehicle] = data.filter((item: any) => item.vehicle === vehicle).length,
    //         });
    //         return { name: date, ...vehicleData };
    //     });
    //     return data;
    // };

    // const formattedData = generateData();

    // const generateData = (data: any) => {
    //     const dates = getLast7Days();
    //     const vehicles = ["walk", "motorcycle", "car", "bus"];

    //     const formattedData = dates.map((date, index) => {
    //         const vehicleData = {};

    //         data.forEach((item: any) => {
    //             const endTimeDate = new Date(item.endTime.seconds * 1000);
    //         });

    //         vehicles.forEach((vehicle) => {
    //             vehicleData[vehicle] = data.filter(
    //                 (item: any) => item.vehicle === vehicle
    //             ).length;
    //         });
    //         return { name: date, ...vehicleData };
    //     });
    //     return formattedData;
    // };

    const generateData = (data: any) => {
        const dates = getLast7Days();
        const vehicles = ["walk", "motorcycle", "car", "bus"];

        // const formattedData = dates.map((date, index) => {
        //     const vehicleData = {};

        //     data.forEach((item: any) => {
        //         const endTimeDate = new Date(item.endTime.seconds * 1000);
        //         const itemDate = endTimeDate.toLocaleDateString("en-US", {
        //             month: "short",
        //             day: "2-digit",
        //         });

        //         if (date === itemDate) {
        //             vehicles.forEach((vehicle) => {
        //                 if (!vehicleData[vehicle]) {
        //                     vehicleData[vehicle] = 0;
        //                 }
        //                 if (item.vehicle === vehicle) {
        //                     vehicleData[vehicle]++;
        //                 }
        //             });
        //         }
        //     });

        //     return { name: date, ...vehicleData };
        // });

        const formattedData = dates.map((date, index) => {
            // Define vehicleData with an index signature
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
        return formattedData;
    };

    const formattedData = generateData(data);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart width={730} height={250} data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="walk" fill="#6CB9AD" />
                <Bar dataKey="motorcycle" fill="#324DDD" />
                <Bar dataKey="car" fill="#EB5757" />
                <Bar dataKey="bus" fill="#282A3D" />
            </BarChart>
        </ResponsiveContainer>
    );
}
