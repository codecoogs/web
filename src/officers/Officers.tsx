import type React from "react";
import { useState } from "react";

import { InstagramIcon, LinkedInIcon } from "../home/AboutIcons";
import FadeInSection from "../common/FadeInSection";
import { officers } from "../data/about";

interface SocialsObj {
	instagram?: string;
	linkedin: string;
}

interface OfficerCardProps {
	key: React.Key;
	name: string;
	position: string;
	photo?: string;
	video?: string;
	retired?: boolean;
	semester: number;
	socials: SocialsObj;
}

const OfficerCard = (props: OfficerCardProps) => {
	const { instagram, linkedin } = props.socials;

	let image = props.photo;
	if (!image) {
		const folderName = officers[props.semester].semester
			.split(" ")
			.reverse()
			.join("")
			.toLowerCase();

		image = `/assets/officers/${folderName}/${props.name.replace(/ /g, "").toLowerCase()}.webp`;
	}

	return (
		<div className="flex flex-col bg-dark-surface-variant rounded-xl text-center p-4 hover:ring-dark-primary ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300">
			<div className="flex-grow">
				<div className="w-24 h-24 md:w-32 md:h-32 mx-auto">
					<img
						className="w-full h-full relative object-cover rounded-full"
						src={image}
						alt={props.name}
						onError={(e) => {
							e.currentTarget.src = "/assets/happy-coco.webp";
						}}
					/>
				</div>
				<span className="block text-sm font-bold pt-4">{props.name}</span>
				<span className="block text-sm opacity-50">{props.position}</span>
				{props.retired && (
					<span className="block text-xs opacity-50">(retired)</span>
				)}
			</div>
			<div className="pt-4">
				<div className="flex space-x-2 justify-end">
					{instagram && (
						<a
							href={instagram}
							target="_blank"
							rel="noreferrer"
							aria-label="Go to our Instagram"
						>
							<InstagramIcon />
						</a>
					)}
					{linkedin && (
						<a
							href={linkedin}
							target="_blank"
							rel="noreferrer"
							aria-label="Go to our LinkedIn"
						>
							<LinkedInIcon />
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

const OfficersPage = () => {
	const numOfficers = officers.length;
	const [semester, setSemester] = useState<number>(numOfficers - 1);
	const [officerCardOpacity, setOfficerCardOpacity] =
		useState<string>("opacity-100");

	const changeSemester = (newSemester: number) => {
		setOfficerCardOpacity("opacity-0");
		setTimeout(() => {
			setSemester(newSemester);
			setOfficerCardOpacity("opacity-100");
		}, 500);
	};

	const handleDecrementSemester = () => {
		if (semester > 0) {
			changeSemester(semester - 1);
		}
	};

	const handleIncrementSemester = () => {
		if (semester < numOfficers - 1) {
			changeSemester(semester + 1);
		}
	};

	// new: categorize officers by hierarchy
	const currentList = officers[semester].list;
	const isPresident = (p: string) => /president/i.test(p);
	const isVP = (p: string) => /\bvp\b|vice\s*president/i.test(p);

	const presidents = currentList.filter((o) => isPresident(o.position));
	const vps = currentList.filter(
		(o) => !isPresident(o.position) && isVP(o.position),
	);
	const others = currentList.filter(
		(o) => !isPresident(o.position) && !isVP(o.position),
	);

	return (
		<div className="text-white p-4">
			<div className="md:w-3/4 mx-auto">
				<FadeInSection className={"animate-fade-down"}>
					<h1 className="text-2xl font-bold text-center">Officers</h1>
				</FadeInSection>

				<div className="px-2 text-center mx-auto md:mt-6">
					{/* semester navigation (unchanged) */}
					<div className="flex text-lg justify-center items-center space-x-4 my-8">
						<div className="flex-1 relative">
							<div className="relative flex justify-end">
								<span
									className={
										"absolute transition-transform duration-300 opacity-30 cursor-pointer translate-x-0 -translate-y-6"
									}
									onClick={handleDecrementSemester}
									onKeyDown={handleDecrementSemester}
								>
									{semester - 1 >= 0 && officers[semester - 1].semester}
								</span>
								<span className={"text-dark-primary opacity-100 z-10"}>
									{officers[semester].semester}
								</span>
								<span
									className={
										"absolute transition-transform duration-300 opacity-30 cursor-pointer translate-y-6"
									}
									onClick={handleIncrementSemester}
									onKeyUp={handleIncrementSemester}
								>
									{semester + 1 < numOfficers &&
										officers[semester + 1].semester}
								</span>
							</div>
						</div>
						<span className="flex-1 text-left relative z-10 ml-4">
							Officers
						</span>
					</div>

					{/* President section */}
					{presidents.length > 0 && (
						<div className="mb-8">
							<h2 className="text-2xl text-dark-primary font-bold mb-4">
								President
							</h2>
							<div
								className={`flex justify-center transition-opacity duration-500 ${officerCardOpacity}`}
							>
								<div className="w-full md:w-1/3">
									<div className="grid grid-cols-1 gap-4">
										{presidents.map((officer) => (
											<OfficerCard
												key={officer.name}
												name={officer.name}
												position={officer.position}
												photo={officer.photo}
												video={officer.video}
												socials={officer.socials}
												retired={officer.retired}
												semester={semester}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Vice Presidents section (larger title; responsive layout for 3 VPs) */}
					{vps.length > 0 && (
						<div className="mb-8">
							<h2 className="text-2xl text-dark-primary font-bold mb-4">
								Vice Presidents
							</h2>
							<div
								className={`transition-opacity duration-500 ${officerCardOpacity}`}
							>
								{/* If exactly 3 VPs: show single-row on md+, stacked with top centered on small screens */}
								{vps.length === 3 ? (
									<>
										{/* md+: three in one row */}
										<div className="hidden md:grid md:grid-cols-3 md:gap-4">
											{vps.map((officer) => (
												<OfficerCard
													key={officer.name}
													name={officer.name}
													position={officer.position}
													photo={officer.photo}
													video={officer.video}
													socials={officer.socials}
													retired={officer.retired}
													semester={semester}
												/>
											))}
										</div>
										{/* sm: first centered, next two underneath */}
										<div className="md:hidden">
											<div className="flex justify-center mb-4">
												<div className="w-full sm:w-2/3">
													<OfficerCard
														key={vps[0].name}
														name={vps[0].name}
														position={vps[0].position}
														photo={vps[0].photo}
														video={vps[0].video}
														socials={vps[0].socials}
														retired={vps[0].retired}
														semester={semester}
													/>
												</div>
											</div>
											<div className="grid grid-cols-2 gap-4">
												{[vps[1], vps[2]].map((officer) => (
													<OfficerCard
														key={officer.name}
														name={officer.name}
														position={officer.position}
														photo={officer.photo}
														video={officer.video}
														socials={officer.socials}
														retired={officer.retired}
														semester={semester}
													/>
												))}
											</div>
										</div>
									</>
								) : (
									<div
										className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-500 ${officerCardOpacity}`}
									>
										{vps.map((officer) => (
											<OfficerCard
												key={officer.name}
												name={officer.name}
												position={officer.position}
												photo={officer.photo}
												video={officer.video}
												socials={officer.socials}
												retired={officer.retired}
												semester={semester}
											/>
										))}
									</div>
								)}
							</div>
						</div>
					)}

					{/* Regular officers section */}
					{others.length > 0 && (
						<div className="mb-8">
							<h2 className="text-2xl text-dark-primary font-bold mb-4">
								Officers
							</h2>
							<div
								className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-8 ease-in-out transition-opacity duration-500 ${officerCardOpacity}`}
							>
								{others.map((officer) => (
									<OfficerCard
										key={officer.name}
										name={officer.name}
										position={officer.position}
										photo={officer.photo}
										video={officer.video}
										socials={officer.socials}
										retired={officer.retired}
										semester={semester}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OfficersPage;
