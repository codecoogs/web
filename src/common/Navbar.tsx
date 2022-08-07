import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import happyCoCo from "../assets/happy-coco.png";
import determinedCoCo from "../assets/determined-coco.png";

const setTextColor = (to: string) => {
    const location = useLocation();

    if (location.pathname == to) {
        return "text-dark-primary"
    }

    return "text-white";
};

interface NavlinkProps {
    to: string;
    text: string;
};

const Navlink = (props: NavlinkProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const textColor = setTextColor(props.to);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <li>
            <Link
                className={`block h-full ${textColor} font-semibold hover:text-dark-primary`}
                to={props.to}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {isHover ? 
                    <span>[{props.text}]</span>
                    :
                    <span>&nbsp;{props.text}&nbsp;</span>
                }
            </Link>
        </li>
    );
};

const Navhome = () => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const textColor = setTextColor("/");

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <Link
            className={"flex items-center ml-4"}
            to="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img className="mr-4" src={!isHover ? happyCoCo : determinedCoCo} alt="Logo" width="64" height="64"/>
            <span className={`self-center text-2xl ${textColor} font-semibold hover:text-dark-primary`} >
                Code{isHover ? "[" : " "}<span className="text-dark-error">Coogs</span>{isHover ? "]" : " "}
            </span>
        </Link>
    );
};

const Navbar = () => {
    return (
        <nav className="bg-dark-surface-variant lg:h-16 sm:h-14">
            <div className="flex flex-wrap justify-between items-center mx-auto">
                <Navhome />
                <div className="w-auto block">
                    <ul className="flex flex-row space-x-8 mr-4">
                        <Navlink to="/events" text="Events"/>
                        <Navlink to="/teams" text="Teams"/>
                        <Navlink to="/projects" text="Projects"/>
                        <Navlink to="/about" text="About"/>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
