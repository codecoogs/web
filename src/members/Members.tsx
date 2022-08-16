import React, { useEffect } from "react";

interface MembersButtonProps {
    link: string;
    children: string;
};

const MembersButton = (props: MembersButtonProps) => {
    return (
        <a
            className="font-semibold"
            target="_blank"
            href={props.link}
        >
            <div className="bg-dark-primary w-40 h-10 mx-auto text-center rounded leading-10">
                {props.children}
            </div>
        </a>
    );
};

const Members = () => {
    useEffect(() => {
        document.title = "Members";
    });

    return (
        <div className="m-8 text-white bg-dark-surface-variant rounded h-full pb-8">
            <h1 className="p-8 font-bold text-xl">Membership</h1>
            <h2 className="px-8 font-bold text-lg">Benefits</h2>
            <ul className="px-10 pb-8">
                <li>
                    <span>T-shirt</span>
                </li>
                <li>
                    <span>Discord Role</span>
                </li>
                <li>
                    <span>Teams System</span>
                </li>
                <li>
                    <span>Swag</span>
                </li>
                <li>
                    <span>Socials</span>
                </li>
                <li>
                    <span>Special workshops</span>
                </li>
            </ul>
            <div className="text-black">
                <MembersButton link="https://forms.gle/qpz35Memf9Zqdimn9">Sign Up</MembersButton>
            </div>
        </div>
    );
};

export default Members;
