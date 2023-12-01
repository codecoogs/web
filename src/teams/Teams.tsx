import React, { useState } from "react";

import { GitHubIcon } from "./TeamsIcons";

import teams from "../data/teams";

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
    const numTeams = teams.length;
    const [year, setYear] = useState(numTeams - 1);

    return (
        <div className="bg-dark-surface">
            <div className="text-center">
                <h1 className="text-xl text-white font-bold mt-8">Teams[{teams[year].year}]</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:flex-row mx-8 bg-dark-surface pb-4">
                    { teams[year].list.map((team, index) => {
                            return (
                                <TeamCard key={index}>  
                                    {team.photo && <img className="relative object-cover w-full h-full" src={team.photo} alt={`${team.name} photo`}/>}
                                    <h1 className="font-bold">{team.name}</h1>
                                    <h2 className="pt-2">Leads: {team.leads.join(", ")}</h2>
                                    <div className="table mx-auto pt-4">
                                      <div className="flex flex-row">
                                        <a href={team.github} target="_blank" aria-label="Go to GitHub">
                                          <GitHubIcon/>
                                        </a>
                                      </div>
                                    </div>
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
