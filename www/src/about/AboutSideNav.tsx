import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
    InfoIcon,
    OfficerIcon,
    AlumniIcon,
    SponsorIcon,
    PartnerIcon,
    QuestionIcon
} from "./AboutIcons";

interface SideNavlinkProps {
    to: string;
    currentHash: string;
    children: React.ReactNode;
};

const SideNavlink = (props: SideNavlinkProps) => {
    let color = (props.currentHash == `#${props.to}`) ? "dark-primary" : "white";

    return (
        <li>
            <a 
                className={`flex flex-row items-center gap-x-3 fill-${color} text-${color} hover:fill-dark-primary hover:text-dark-primary scroll-smooth`}
                href={`#${props.to}`}
                aria-label={`Go to '${props.to}' page section`}
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
    const location = useLocation();
    const [currentHash, setCurrentHash] = useState<string>(location.hash);

    useEffect(() => {
        setCurrentHash(location.hash);
    }, [location]);

    return (
        <ul className="flex flex-col fixed group bg-dark-surface-variant z-1 top-1/2 left-3 white transform -translate-y-1/2 gap-y-4 p-2 rounded text-white fill-white font-semibold">
            <SideNavlink to="us" currentHash={currentHash}>
                <InfoIcon/>
                <SideNavtext>About Us</SideNavtext>
            </SideNavlink>
            <SideNavlink to="officers" currentHash={currentHash}>
                <OfficerIcon/>
                <SideNavtext>Officers</SideNavtext>
            </SideNavlink>
            <SideNavlink to="alumni" currentHash={currentHash}>
                <AlumniIcon/>
                <SideNavtext>Alumni</SideNavtext>
            </SideNavlink>
            <SideNavlink to="sponsors" currentHash={currentHash}>
                <SponsorIcon/>
                <SideNavtext>Sponsors</SideNavtext>
            </SideNavlink>
            <SideNavlink to="partners" currentHash={currentHash}>
                <PartnerIcon/>
                <SideNavtext>Partners</SideNavtext>
            </SideNavlink>
            <SideNavlink to="faq" currentHash={currentHash}>
                <QuestionIcon />
                <SideNavtext>FAQ</SideNavtext>
            </SideNavlink>
        </ul>
    );
};

export default AboutSideNav;
