import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// import happyCoCo from "../assets/happy-coco.webp";
// import determinedCoCo from "../assets/determined-coco.webp";
import { DiscordIcon, MenuIcon } from "./NavbarIcons";
import { discordLink } from "../data/members";

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
                className={`block h-full ${textColor} hover:text-dark-primary`}
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
            className={"flex items-center ml-4 md:ml-14"}
            to="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img className="mr-4" src={!isHover ? "/assets/happy-coco.webp" : "/assets/determined-coco.webp"} alt="Logo" width="64" height="64" />
            <span className={`self-center text-2xl ${textColor} font-semibold hover:text-dark-primary`} >
                Code{isHover ? "[" : " "}<span className="text-dark-error">Coogs</span>{isHover ? "]" : " "}
            </span>
        </Link>
    );
};

const Navbar = () => {
    const [clicked, setClicked] = useState<boolean>(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav className="bg-dark-surface border-b border-white border-opacity-10 lg:h-16 md:h-14">
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
                <div className={`${clicked ? "hidden" : "block"} relative w-full md:w-auto md:block`}>
                    <ul className="flex flex-col space-y-4 pb-4 items-center md:pb-0 md:space-y-0 md:flex-row md:space-x-4 md:mr-4">
                        <Navlink to="/events" text="Events" />
                        <Navlink to="/join" text="Membership" />
                        <Navlink to="/teams" text="Teams" />
                        <Navlink to="/opportunities" text="Opportunities" />
                        <Navlink to="/sponsors" text="Sponsor" />
                        <a href={discordLink} target="_blank">
                            <div className="fill-white self-center">
                                <DiscordIcon />
                            </div>
                        </a>
                    </ul>
                </div>
            </div>
        </nav>
    )
        ;
};

export default Navbar;
