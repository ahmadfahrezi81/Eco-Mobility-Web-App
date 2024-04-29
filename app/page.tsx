import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return (
        <div>
            <div className="flex items-center justify-center p-4 border-b-[1px]">
                <Link href="/dashboard" className="flex items-center">
                    <Image
                        src="./leaf-eco.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <h1 className="text-lg font-bold ml-2">UM Eco-Mobility</h1>
                </Link>
                <Button className="ml-auto">Request Access</Button>
            </div>

            <div className="flex flex-col justify-center gap-3 items-center h-[80vh]">
                <h1
                    className={cn(
                        "text-center text-5xl font-bold leading-tight tracking-tighter"
                    )}
                >
                    UM Eco-Mobility: <br /> A Campus Sustainability Tracker
                </h1>
                <p className="text-center text-lg font-light text-foreground">
                    Discover how your university community is progressing
                    towards <br /> sustainability with UM Eco-Mobility.
                </p>
                <Link href={"/sign-in"}>
                    <Button className="mx-auto">Sign In</Button>
                </Link>
            </div>
        </div>
    );
}
