import React from "react";

import { teams } from "../data/teams";

interface TeamCardProps {
    key: number;
    children: React.ReactNode;
};

const TeamCard = (props: TeamCardProps) => {
    return (
        <li className="bg-dark-surface-variant rounded text-white p-8 m-8">
            {props.children}
        </li>
    );
};

const Teams = () => {
    return (
        <div className="bg-dark-surface">
            <div className="text-center">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:flex-row m-8 bg-dark-surface pb-4">
                    { teams.map((team, index) => {
                            return (
                                <TeamCard key={index}>  
                                    <img src={team.photo} alt={`${team.name} photo`}/>
                                    <h1>{team.name}</h1>
                                </TeamCard>
                            );
                      })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Teams;
