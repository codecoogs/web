import React from "react";

import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
    return (
        <div className="bg-dark-surface h-screen font-custom">
            <Navbar />
            <main>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
