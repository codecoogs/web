import React, { useEffect } from "react";

const Members = () => {
    useEffect(() => {
        document.title = "Members";
    });

    return (
        <div className="m-8 text-white bg-dark-surface-variant rounded h-full">
            <h1 className="p-8">Membership</h1>
            <ul className="p-8">
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
        </div>
    );
};

export default Members;
