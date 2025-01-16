import type React from "react";
import { useState } from "react";

import { GitHubIcon } from "./TeamsIcons";

import teams from "../data/teams";

interface TeamCardProps {
	key: string;
	children: React.ReactNode;
}

const TeamCard = (props: TeamCardProps) => {
	return (
		<li className="bg-dark-surface-variant rounded-lg text-white flex flex-col pt-2 ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300 hover:ring-dark-primary">
			{props.children}
		</li>
	);
};

enum Direction {
	None = 0,
	Up = 1,
	Down = 2,
}

// TODO: smooth the year change transition
const TeamsMembers = () => {
	const numTeams = teams.length;
	const [year, setYear] = useState(numTeams - 1);
	const [teamCardOpacity, setTeamCardOpacity] = useState<string>("opacity-100");

	const handleYearChange = (direction: Direction) => {
		setTeamCardOpacity("opacity-0");

		setTimeout(() => {
			if (direction === Direction.Up) {
				setYear((prevYear) => Math.min(numTeams - 1, prevYear + 1));
			} else if (direction === Direction.Down) {
				setYear((prevYear) => Math.max(0, prevYear - 1));
			}
			setTeamCardOpacity("opacity-100");
		}, 500);
	};

	return (
		<div
			id="teamMembers"
			className="bg-dark-surface text-center md:w-3/4 mx-auto"
		>
			<h1 className="text-2xl font-bold text-white m-6">Explore our teams</h1>
			<div className="text-center text-lg text-white my-8 flex items-center justify-center space-x-4">
				<div className="relative">
					<div className="relative flex items-center">
						<span
							className={
								"absolute transition-transform duration-300 opacity-30 cursor-pointer -translate-y-6"
							}
							onClick={() => handleYearChange(Direction.Down)}
							onKeyDown={() => {}}
						>
							{year - 1 >= 0 && teams[year - 1].year}
						</span>
						<span className={"text-dark-primary opacity-100 z-10"}>
							{teams[year].year}
						</span>
						<span
							className={
								"absolute transition-transform duration-300 opacity-30 cursor-pointer translate-y-6"
							}
							onClick={() => handleYearChange(Direction.Up)}
							onKeyDown={() => {}}
						>
							{year + 1 < numTeams && teams[year + 1].year}
						</span>
					</div>
				</div>
				<span className="relative z-10 ml-4">Teams</span>
			</div>
			<ul
				className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:flex-row mx-8 bg-dark-surface pb-4 my-4 ease-in-out transition-opacity duration-500 ${teamCardOpacity}`}
			>
				{teams[year].list.map((team, index) => {
					return (
						<TeamCard key={team.name}>
							<div className="flex flex-col px-4">
								<div className="flex-grow">
									{team.photo && (
										<div className="w-24 h-24 md:w-40 md:h-40 my-4 mx-auto">
											<img
												className="object-cover w-full h-full rounded-full"
												src={team.photo}
												alt={team.name}
											/>
										</div>
									)}
									<h1 className="font-bold pt-2">{team.name}</h1>
									{/**<h2 className="pt-2">Leads: {team.leads.join(", ")}</h2>**/}
								</div>
								<div className="pt-4">
									<div className="flex justify-end pb-4">
										<a
											href={team.github}
											target="_blank"
											aria-label="Go to GitHub"
											rel="noreferrer"
										>
											<GitHubIcon />
										</a>
									</div>
								</div>
							</div>
						</TeamCard>
					);
				})}
			</ul>
		</div>
	);
};

export default TeamsMembers;
