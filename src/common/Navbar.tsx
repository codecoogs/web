import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavlinkProps {
    to: string;
    children: React.ReactNode;
};

const Navlink = (props: NavlinkProps) => {
    const location = useLocation();

    let textColor = "text-white";
    if (location.pathname == props.to) textColor = "text-dark-primary";

    return (
        <Link
            className={"mr-6 h-full "+ textColor +" font-semibold hover:text-dark-primary"}
            to={props.to}
        >
            {props.children}
        </Link>
    );
};

const Navbar = () => {
    return (
        <nav className="bg-dark-surface-variant lg:h-16 sm:h-14">
            <div className="flex">
                <div className="pl-4 pt-2.5 pb-2.5 text-4xl h-16">
                    <Navlink to="/">
                        Code <span className="text-dark-error">Coogs</span>
                    </Navlink>
                </div>
                <div className="my-auto ml-auto">
                    <Navlink to="/events">Events</Navlink>
                    <Navlink to="/projects">Projects</Navlink>
                    <Navlink to="/about">About</Navlink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
