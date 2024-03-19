import {email} from "../data/about";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark-surface border-t border-white border-opacity-10 lg:h-16 md:h-14 text-center flex flex-col justify-center">
            <span className="text-white">Contact: <span className="hover:text-dark-primary">{email}</span></span>
        </footer>
    );
};

export default Footer;