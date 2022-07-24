import React from "react";

import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
    return (
        <>
            <Navbar />
            <main>
                {props.children}
            </main>
        </>
    );
};

export default Layout;
