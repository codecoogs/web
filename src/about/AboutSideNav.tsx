import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
    InfoIcon,
    OfficerIcon,
    SponsorIcon,
    PartnerIcon,
    QuestionIcon
} from "./AboutIcons";

const setColor = (to: string) => {
    const location = useLocation();
    console.log(location.hash == `#${to}`, location.hash);
    if (location.hash == `#${to}`) { 
        return "dark-primary";
    }

    return "white";
}

interface SideNavlinkProps {
    to: string;
    children: React.ReactNode;
};

const SideNavlink = (props: SideNavlinkProps) => {
    const color = setColor(props.to);

    return (
        <li>
            <a 
                className={`flex flex-row items-center gap-x-3 fill-${color} text-${color} hover:fill-dark-primary hover:text-dark-primary scroll-smooth`}
                href={`#${props.to}`}
            >
                {props.children}
            </a>
        </li>
    );
};

interface SideNavtextProps {
    children: React.ReactNode;
};

const SideNavtext = (props: SideNavtextProps) => {
    return (
        <span className="hidden group-hover:block">
            {props.children}
        </span>
    );
};

const AboutSideNav = () => {
    return (
        <ul className="flex flex-col fixed group bg-dark-surface-variant z-1 top-1/2 left-3 white transform -translate-y-1/2 gap-y-4 p-2 rounded text-white font-semibold">
            <SideNavlink to="us">
                <InfoIcon/>
                <SideNavtext>About Us</SideNavtext>
            </SideNavlink>
            <SideNavlink to="officers">
                <OfficerIcon/>
                <SideNavtext>Officers</SideNavtext>
            </SideNavlink>
            <SideNavlink to="sponsors">
                <SponsorIcon/>
                <SideNavtext>Sponsors</SideNavtext>
            </SideNavlink>
            <SideNavlink to="partners">
                <PartnerIcon/>
                <SideNavtext>Partners</SideNavtext>
            </SideNavlink>
            <SideNavlink to="faq">
                <QuestionIcon />
                <SideNavtext>FAQ</SideNavtext>
            </SideNavlink>
        </ul>
    );
};

export default AboutSideNav;
