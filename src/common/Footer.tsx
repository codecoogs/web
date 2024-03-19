import React, {useState} from "react";
import {DiscordIcon, GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon} from "./FooterIcons";
import {email} from "../data/about";
import happyCoCo from "../assets/happy-coco.webp";
import determinedCoCo from "../assets/determined-coco.webp";
import {Link} from "react-router-dom";


const Footer = () => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <footer className="bg-dark-surface border-t border-white border-opacity-10 h-full text-white py-8 px-8 md:px-24">
            <div className="flex flex-col md:flex-row space-y-2">
                <div className="flex-1 mx-auto">
                    <div
                        className="flex items-center ml-4 md:ml-14"
                    >
                        <img className="mr-4" src={!isHover ? happyCoCo : determinedCoCo} alt="Logo" width="72" height="72"/>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-1">
                    <h2>Pages</h2>
                    <div className="opacity-50 hover:opacity-90">
                        <Link
                            className="text-sm"
                            to="/"
                        >
                            Home
                        </Link>
                    </div>
                    <div className="opacity-50 hover:opacity-90">
                        <a
                            className="text-sm"
                            href="/#us"
                        >
                            About Us
                        </a>
                    </div>
                    <div className="opacity-50 hover:opacity-90">
                        <Link
                            className="text-sm"
                            to="/events"
                        >
                            Events
                        </Link>
                    </div>
                    <div className="opacity-50 hover:opacity-90">
                        <Link
                            className="text-sm"
                            to="/join"
                        >
                            Join Us
                        </Link>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-1 gap-1">
                    <h2>Links</h2>
                    <div className="flex space-x-4 justify-start items-center opacity-50 hover:opacity-90">
                        <div>
                            <MailIcon/>
                        </div>
                        <a className="text-sm" href={`mailto: ${email}`}>{email}</a>
                    </div>
                    <div className="flex space-x-4 justify-start items-center opacity-50 hover:opacity-90">
                        <div>
                            <DiscordIcon/>
                        </div>
                        <a className="text-sm" href={`mailto: ${email}`}>discord</a>
                    </div>
                    <div className="flex space-x-4 justify-start items-center opacity-50 hover:opacity-90">
                        <div>
                            <InstagramIcon/>
                        </div>
                        <a className="text-sm"
                           href="https://www.instagram.com/uh_codecoogs/">uh_codecoogs</a>
                    </div>
                    <div className="flex space-x-4 justify-start items-center opacity-50 hover:opacity-90">
                        <div>
                            <LinkedInIcon/>
                        </div>
                        <a className="text-sm"
                           href="https://www.linkedin.com/company/code-coogs">company/code-coogs</a>
                    </div>
                    <div className="flex space-x-4 justify-start items-center opacity-50 hover:opacity-90">
                        <div>
                            <GitHubIcon/>
                        </div>
                        <a className="text-sm" href="https://github.com/codecoogs">codecoogs</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;