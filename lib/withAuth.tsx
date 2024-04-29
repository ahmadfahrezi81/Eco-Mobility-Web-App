"use client";

import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FIREBASE_AUTH } from "@/firebaseconfig";

type Props = {
    user: User;
};

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P & Props>
): React.FC<P> => {
    const HOC: React.FC<P> = (props: P) => {
        const [user, setUser] = useState<User | null>(null);
        const router = useRouter();

        useEffect(() => {
            const auth = FIREBASE_AUTH;

            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    router.push("/login");
                }
            });

            return () => unsubscribe();
        }, [router]);

        return user ? <WrappedComponent {...props} user={user} /> : null;
    };

    return HOC;
};

export default withAuth;
