import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { FIREBASE_AUTH } from "@/firebaseconfig";
import withAuth from "@/lib/withAuth";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const auth = FIREBASE_AUTH;

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 border-r-[1px]">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
