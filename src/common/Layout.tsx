import React from "react";

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
    return (
        <React.Fragment>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
};

export default Layout;
