import React from "react";

function DiscoverLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {children}
        </section>
    )
}

export default DiscoverLayout;