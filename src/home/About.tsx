import type React from "react";
import { useState } from "react";

import { InstagramIcon, LinkedInIcon } from "./AboutIcons";
import { companyLogos } from "./AboutLogos";

import {
	aboutUsDesc,
	socialsDesc,
	teamsDesc,
	competitionsDesc,
	workshopsDesc,
	officers,
	sponsors,
	partners,
} from "../data/about";
import FadeInSection from "../common/FadeInSection";

interface AboutSectionProps {
	id: string;
	children: React.ReactNode;
}

const AboutSection = (props: AboutSectionProps) => {
	return (
		<section id={props.id} className="md:w-3/4 mx-auto">
			{props.children}
		</section>
	);
};

interface AboutSectionTitleProps {
	children: React.ReactNode;
}

const AboutSectionTitle = (props: AboutSectionTitleProps) => {
	return <h1 className="text-2xl font-bold">{props.children}</h1>;
};

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
	semester: number;
	socials: SocialsObj;
}

// TODO: fix video hover
const OfficerCard = (props: OfficerCardProps) => {
	const { instagram, linkedin } = props.socials;

	let image = props.photo;
	if (!image) {
		const folderName = officers[props.semester].semester
			.split(" ")
			.reverse()
			.join("")
			.toLowerCase();
		image = `/assets/officers/${folderName}/${props.name.replace(
			" ",
			"",
		)}.webp`;
	}

	console.log(image);

	return (
		<div className="flex flex-col bg-dark-surface-variant rounded-xl text-center p-4 hover:ring-dark-primary ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300">
			<div className="flex-grow">
				<div className="w-24 h-24 md:w-32 md:h-32 mx-auto">
					<img
						className="w-full h-full relative object-cover rounded-full"
						src={image}
						alt={props.name}
						// onMouseOver={e => (e.currentTarget.src = props.video ? props.video : props.photo)}
						// onMouseOut={e => (e.currentTarget.src = props.photo)}
					/>
				</div>
				<span className="block text-sm font-bold pt-4">{props.name}</span>
				<span className="block text-sm opacity-50">{props.position}</span>
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

// TODO: smooth the semester change transition
const OfficerSection = () => {
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

	return (
		<div className="px-2  text-center mx-auto md:w-3/4">
			<AboutSectionTitle>Meet the people behind the scenes</AboutSectionTitle>
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
							{semester + 1 < numOfficers && officers[semester + 1].semester}
						</span>
					</div>
				</div>
				<span className="flex-1 text-left relative z-10 ml-4">Officers</span>
			</div>
			<div
				className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-8 ease-in-out transition-opacity duration-500 ${officerCardOpacity}`}
			>
				{officers[semester].list.map((officer, index) => {
					return (
						<OfficerCard
							key={officer.name}
							name={officer.name}
							position={officer.position}
							photo={officer.photo}
							video={officer.video}
							socials={officer.socials}
							semester={semester}
						/>
					);
				})}
			</div>
		</div>
	);
};

const CompanySection = () => {
	return (
		<div className="text-center md:pt-8">
			<FadeInSection className={"animate-fade-down"}>
				<>
					<AboutSectionTitle>Where our alumni work</AboutSectionTitle>

					<div className="flex flex-wrap justify-center items-center md:w-1/3 mx-auto pt-8">
						{companyLogos.map(({ name, component: Component }) => (
							<div key={name} className="p-4">
								<Component />
							</div>
						))}
					</div>
				</>
			</FadeInSection>
		</div>
	);
};

const About = () => {
	return (
		<div className="text-white p-4">
			<div className="flex flex-wrap flex-col justify-center">
				<CompanySection />

				<div className="flex justify-center">
					<div className="p-8 text-center">
						<FadeInSection className={"animate-fade-right"}>
							<>
								<AboutSectionTitle>Our sponsors</AboutSectionTitle>
								<div className="flex flex-wrap justify-center items-center pt-8">
									{sponsors.map((sponsor, index) => {
										return (
											<div key={sponsor.name} className="p-4">
												<a href={sponsor.link} target="_blank" rel="noreferrer">
													<img
														className={
															sponsor.name === "HCSS" ? "" : "rounded-full"
														}
														src={sponsor.logo}
														alt={sponsor.name}
														width={
															sponsor.name === "Energy AI Solutions"
																? "120"
																: "60"
														}
														height={
															sponsor.name === "Energy AI Solutions"
																? "70"
																: "60"
														}
													/>
												</a>
											</div>
										);
									})}
								</div>
							</>
						</FadeInSection>
					</div>
					<div className="p-8 text-center">
						<FadeInSection className={"animate-fade-left"}>
							<>
								<AboutSectionTitle>Our partners</AboutSectionTitle>
								<div className="flex flex-wrap justify-center items-center pt-8">
									{partners.map((partner, index) => {
										return (
											<div key={partner.name} className="p-4">
												<a href={partner.link} target="_blank" rel="noreferrer">
													<img
														className=""
														src={partner.logo}
														alt={partner.name}
														width="60"
														height="60"
													/>
												</a>
											</div>
										);
									})}
								</div>
							</>
						</FadeInSection>
					</div>
				</div>
			</div>

			<div className="rounded md:mx-24 my-8">
				<AboutSection id="us">
					<div className="p-6 text-center">
						<AboutSectionTitle>About Us</AboutSectionTitle>
						<p className="text-sm p-6 opacity-90">{aboutUsDesc}</p>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<div className="p-8 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
							<div className="w-56 h-36 flex-shrink-0 md:border-r-2 border-white/[.8]">
								<FadeInSection
									className={
										"animate-fade-right animate-once animate-duration-[1700ms]"
									}
								>
									<img
										className="w-36 h-full mx-auto md:mr-5"
										src={"/assets/socials-coco.webp"}
										alt="Socials CoCo"
									/>
								</FadeInSection>
							</div>
							<div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
								<FadeInSection
									className={
										"animate-fade-left animate-once animate-duration-[1700ms]"
									}
								>
									<>
										<h2 className="text-lg text-dark-primary">Socials</h2>
										<p className="text-sm opacity-70">{socialsDesc}</p>
									</>
								</FadeInSection>
							</div>
						</div>
						<div className="p-8 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
							<div className="w-56 h-36 flex-shrink-0 md:border-r-2 border-white/[.8]">
								<FadeInSection
									className={
										"animate-fade-right animate-once animate-duration-[1700ms]"
									}
								>
									<img
										className="w-48 h-full mx-auto md:mr-2"
										src={"/assets/teams-coco.webp"}
										alt="Teams CoCo"
									/>
								</FadeInSection>
							</div>
							<div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
								<FadeInSection
									className={
										"animate-fade-left animate-once animate-duration-[1700ms]"
									}
								>
									<>
										<h2 className="text-lg text-dark-primary">Teams</h2>
										<p className="text-sm opacity-70">{teamsDesc}</p>
									</>
								</FadeInSection>
							</div>
						</div>
						<div className="p-8 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
							<div className="w-56 h-36 flex-shrink-0 md:border-r-2 border-white/[.8]">
								<FadeInSection
									className={
										"animate-fade-right animate-once animate-duration-[1700ms]"
									}
								>
									<img
										className="w-full h-full mx-auto md:mr-0"
										src={"/assets/competitions-coco.webp"}
										alt="Competitions CoCo"
									/>
								</FadeInSection>
							</div>
							<div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
								<FadeInSection
									className={
										"animate-fade-left animate-once animate-duration-[1700ms]"
									}
								>
									<>
										<h2 className="text-lg text-dark-primary">Competitions</h2>
										<p className="text-sm opacity-70">{competitionsDesc}</p>
									</>
								</FadeInSection>
							</div>
						</div>
						<div className="p-8 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
							<div className="w-56 h-36 flex-shrink-0 md:border-r-2 border-white/[.8]">
								<FadeInSection
									className={
										"animate-fade-right animate-once animate-duration-[1700ms]"
									}
								>
									<img
										className="w-36 h-full mx-auto md:mr-0"
										src={"/assets/workshops-coco.webp"}
										alt="Workshops CoCo"
									/>
								</FadeInSection>
							</div>
							<div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
								<FadeInSection
									className={
										"animate-fade-left animate-once animate-duration-[1700ms]"
									}
								>
									<>
										<h2 className="text-lg text-dark-primary">Workshops</h2>
										<p className="text-sm opacity-70">{workshopsDesc}</p>
									</>
								</FadeInSection>
							</div>
						</div>
					</div>
				</AboutSection>
			</div>

			<OfficerSection />
		</div>
	);
};

export default About;
