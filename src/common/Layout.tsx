import type React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen font-custom">
            <Navbar />
            <main className="flex-1 bg-dark-surface">
                {props.children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
