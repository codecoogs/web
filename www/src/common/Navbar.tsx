import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import happyCoCo from "../assets/happy-coco.webp";
import determinedCoCo from "../assets/determined-coco.webp";

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

const MenuIcon = () => {
    return (
        <svg className="w-6 h-6" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd">
            </path>
        </svg>
    );
};

const Navbar = () => {
    const [clicked, setClicked] = useState<boolean>(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav className="bg-dark-surface-variant lg:h-16 md:h-14">
            <div className="flex flex-wrap justify-between items-center mx-auto">
                <Navhome />
                <button 
                    className="inline-flex items-center fill-white md:hidden" 
                    onClick={handleClick}
                    type="button"
                    aria-label="Hamburger menu"
                >
                    <MenuIcon />
                </button>
                <div className={`${clicked ? "hidden": "block"} relative w-full md:w-auto md:block`}>
                    <ul className="flex flex-col space-y-4 pb-4 items-center bg-dark-surface-variant md:pb-0 md:space-y-0 md:flex-row md:space-x-4 md:mr-4">
                        <Navlink to="/about" text="About"/>
                        <Navlink to="/events" text="Events"/>
                        <Navlink to="/teams" text="Teams"/>
                        <Navlink to="/members" text="Members"/>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
