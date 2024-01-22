import React, { useState } from "react";

import { GitHubIcon } from "./TeamsIcons";

import teams from "../data/teams";

interface TeamCardProps {
    key: number;
    children: React.ReactNode;
};

const TeamCard = (props: TeamCardProps) => {
    return (
        <li className="bg-dark-surface-variant rounded text-white flex flex-col p-4 m-4">
            {props.children}
        </li>
    );
};

const Teams = () => {
    const numTeams = teams.length;
    const [year, setYear] = useState(numTeams - 1);

    const handleDecrementYear = () => {
      setYear(prevYear => Math.max(0, prevYear - 1));
    };

    const handleIncrementYear = () => {
      setYear(prevYear => Math.min(numTeams - 1, prevYear + 1));
    }

    return (
        <div className="bg-dark-surface text-center">
            <div className="flex justify-center items-center space-x-4 text-white mt-8">
              { year > 0 && <button onClick={handleDecrementYear} className="text-3xl hover:text-dark-primary">&#129190;</button>}
              <h1 className="text-2xl font-bold">Teams[<span className="text-dark-primary">{teams[year].year}</span>]</h1>
              { year < numTeams - 1 && <button className="text-3xl hover:text-dark-primary" onClick={handleIncrementYear}>&#129191;</button>}
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:flex-row mx-8 bg-dark-surface pb-4">
                { teams[year].list.map((team, index) => {
                        return (
                            <TeamCard key={index}>  
                                {team.photo && <img className="relative object-cover w-full h-full" src={team.photo} alt={`${team.name} photo`}/>}
                                <h1 className="font-bold pt-2">{team.name}</h1>
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
    );
};

export default Teams;
