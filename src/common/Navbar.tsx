import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavlinkProps {
    to: string;
    text: string;
};

const Navlink = (props: NavlinkProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClick = useCallback(() => {
        navigate(props.to, {replace: true});
    }, [navigate]);

    let textColor = "text-white";
    if (location.pathname == props.to) textColor = "text-dark-primary";

    return (
        <button
            className={"mr-6 h-full "+ textColor +" font-semibold hover:text-dark-primary"}
            onClick={handleOnClick}
            to={props.to}
        >
            {props.text}
        </button>
    );
};

const Navbar = () => {
    return (
        <div className="bg-dark-surface-variant lg:h-16 sm:h-14 font-custom">
            <nav className="flex flex-row"> 
                <div className="pl-4 pt-2.5 pb-2.5 text-4xl h-16">
                    <Navlink 
                        to="/" 
                        text="Code Coogs" 
                    />
                </div>
                <div className="my-auto ml-auto">
                    <Navlink to="/events" text="Events" />
                    <Navlink to="/projects" text="Projects" />
                    <Navlink to="/about" text="About" />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
