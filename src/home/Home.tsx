import React, { useEffect } from "react";

import banner from "../assets/banner.png";

interface HomeButtonProps {
    link: string;
    children: string;
};

const HomeButton = (props: HomeButtonProps) => {
    return (
        <div className="bg-dark-primary w-40 h-10 mx-auto text-center rounded leading-10">
            <a
                className="font-semibold"
                href={props.link}
            >
                {props.children}
            </a>
        </div>
    );
};

const Home = () => {

    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <div className="bg-dark-surface h-full pb-8">
            <div className="pt-16">
                <img className="my-0 mx-auto" src={banner} alt="Banner" width="800" height="240"/>
            </div>
            <div className="my-16 text-center">
                <span className="text-2xl text-white">Socials | Teams | Competitions | Workshops</span>
            </div>
            <div className="table my-0 mx-auto">
                <ul className="flex flex-col items-center space-x-0 space-y-4 md:space-x-24 md:space-y-0 md:flex-row">
                    <li>
                        <HomeButton link="/about">About Us</HomeButton>
                    </li>
                    <li>
                        <HomeButton link="/members">Membership</HomeButton>
                    </li>
                    <li>
                        <HomeButton link="https://linktr.ee/codecoogs">LinkTree</HomeButton>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
