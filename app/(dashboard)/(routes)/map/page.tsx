"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    GoogleMap,
    HeatmapLayer,
    LoadScript,
    Polyline,
    useLoadScript,
} from "@react-google-maps/api";
import { FIRESTORE_DB } from "@/firebaseconfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const GOOGLE_MAPS_API_KEY = "AIzaSyDCWeXo_prbbeYnbFAPeJuIDNv3dmoBj_Q";

export default function DashboardPage() {
    const router = useRouter();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

    const containerStyle = {
        width: "100%",
        height: "600px", // Set a specific height here
    };

    const center = {
        lat: -3.745,
        lng: -38.523,
    };

    const [trackingPaths, setTrackingPaths] = useState([]);
    const [heatmapPoints, setHeatmapPoints] = useState([]);

    const [loading, setLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     setLoading(true); // Start loading

    //     const trackingActivitiesRef = collection(
    //         FIRESTORE_DB,
    //         "trackingActivities"
    //     );

    //     const subscriber = onSnapshot(trackingActivitiesRef, {
    //         next: (snapshot) => {
    //             const fetchedPaths = [];

    //             snapshot.docs.forEach((doc) => {
    //                 const trackingActivityRef = collection(
    //                     doc.ref,
    //                     "userTrackingActivities"
    //                 );
    //                 // Use getDocs to fetch subcollection data
    //                 getDocs(trackingActivityRef)
    //                     .then((userTrackingSnapshot) => {
    //                         userTrackingSnapshot.forEach((userDoc) => {
    //                             const data = userDoc.data();
    //                             console.log(data);

    //                             // if (data.coordinates) {
    //                             //     fetchedPaths.push(data.coordinates);
    //                             // }

    //                             if (data.coordinates) {
    //                                 // Transform the coordinates here
    //                                 const transformedCoordinates =
    //                                     data.coordinates.map((coord) => ({
    //                                         lat: coord.latitude,
    //                                         lng: coord.longitude,
    //                                     }));
    //                                 fetchedPaths.push(transformedCoordinates);
    //                             }
    //                         });
    //                         setTrackingPaths(fetchedPaths); // Update paths state
    //                         setLoading(false); // Stop loading

    //                         console.log(fetchedPaths);
    //                     })
    //                     .catch((error) =>
    //                         console.error(
    //                             "Error fetching user tracking data:",
    //                             error
    //                         )
    //                     );
    //             });
    //         },
    //         error: (error) => {
    //             console.error("Error fetching tracking activities:", error);
    //         },
    //     });

    //     return () => subscriber();
    // }, []);

    useEffect(() => {
        setLoading(true); // Start loading

        const trackingActivitiesRef = collection(
            FIRESTORE_DB,
            "trackingActivities"
        );

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
                        const fetchedPaths = [];
                        const heatmapData = [];

                        allSnapshots.forEach((userTrackingSnapshot) => {
                            userTrackingSnapshot.forEach((userDoc) => {
                                const data = userDoc.data();

                                if (data.coordinates) {
                                    // Transform the coordinates here
                                    const transformedCoordinates =
                                        data.coordinates.map((coord) => ({
                                            lat: coord.latitude,
                                            lng: coord.longitude,
                                        }));
                                    fetchedPaths.push(transformedCoordinates);
                                    heatmapData.push(...transformedCoordinates);
                                }
                            });
                        });

                        setTrackingPaths(fetchedPaths); // Update paths state
                        setLoading(false); // Stop loading
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

    const heatmapData = {
        positions: heatmapPoints,
        options: {
            radius: 20,
            opacity: 0.6,
        },
    };

    return (
        <div className="h-full px-10 py-8">
            <h1 className="text-2xl font-semibold mb-3">Map</h1>
            <div className="flex flex-col gap-3 h-full">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        {trackingPaths.length > 0 &&
                            trackingPaths.map((paths, i) => (
                                <Polyline
                                    key={i}
                                    path={paths}
                                    options={{
                                        strokeColor: "#FF0000",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: "#FF0000",
                                        fillOpacity: 0.35,
                                    }}
                                />
                            ))}
                        {/* <HeatmapLayer data={heatmapData} /> */}
                    </GoogleMap>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}
