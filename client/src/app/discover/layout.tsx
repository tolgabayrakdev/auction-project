import Sidebar from "@/components/discover/sidebar";
import React from "react";

function DiscoverLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    return (
        <section>
            <Sidebar />
            {children}
        </section>
    )
}

export default DiscoverLayout;