import type React from "react";
import { useState } from "react";

import { InstagramIcon, LinkedInIcon } from "../home/AboutIcons";
import FadeInSection from "../common/FadeInSection";
import { officers } from "../data/about";

// ─── Department system ────────────────────────────────────────────────────────

type Dept = "president" | "internal" | "external" | "admin";

interface DeptMeta {
	label: string;
	color: string;       // hex — used inline for card bar + heading
	ring: string;        // Tailwind ring class for hover
	bg: string;          // subtle card tint class
}

const DEPTS: Record<Dept, DeptMeta> = {
	president: {
		label: "President",
		color: "#75e4ff",
		ring: "hover:ring-[#75e4ff]/50",
		bg: "hover:bg-[#75e4ff]/[0.04]",
	},
	internal: {
		label: "Internal",
		color: "#a78bfa",
		ring: "hover:ring-[#a78bfa]/50",
		bg: "hover:bg-[#a78bfa]/[0.04]",
	},
	external: {
		label: "External",
		color: "#f87171",
		ring: "hover:ring-[#f87171]/50",
		bg: "hover:bg-[#f87171]/[0.04]",
	},
	admin: {
		label: "Administration",
		color: "#fbbf24",
		ring: "hover:ring-[#fbbf24]/50",
		bg: "hover:bg-[#fbbf24]/[0.04]",
	},
};

// Dept ordering for section display
const DEPT_ORDER: Dept[] = ["president", "admin", "internal", "external"];

const getDept = (position: string): Dept => {
	const p = position.toLowerCase();
	if (/president/.test(p)) return "president";
	if (
		/\b(internal|software|team|workshop|competition)\b/.test(p)
	)
		return "internal";
	if (
		/\b(external|corporate|academic|public.?relation|community|social|collaboration)\b/.test(
			p,
		)
	)
		return "external";
	// administration, marketing, historian, activities, artist, events, operations, vp admin
	return "admin";
};

// ─── Officer Card ─────────────────────────────────────────────────────────────

interface SocialsObj {
	instagram?: string;
	linkedin: string;
}

interface OfficerCardProps {
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
	const dept = getDept(props.position);
	const { color, ring, bg } = DEPTS[dept];

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
		<div
			className={`group relative flex flex-col bg-dark-surface-variant rounded-xl overflow-hidden ring-1 ring-inset ring-white/10 ${ring} ${bg} transform transition-all hover:-translate-y-1 duration-300`}
		>
			{/* Department colour bar */}
			<div
				className="h-1 w-full flex-shrink-0"
				style={{ backgroundColor: color }}
			/>

			<div className="flex flex-col flex-1 p-4 text-center">
				{/* Avatar */}
				<div className="w-20 h-20 md:w-24 md:h-24 mx-auto mt-2 mb-3">
					<img
						className="w-full h-full object-cover rounded-full ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300"
						src={image}
						alt={props.name}
						onError={(e) => {
							e.currentTarget.src = "/assets/happy-coco.webp";
						}}
					/>
				</div>

				<span className="block text-sm font-bold text-white leading-snug">
					{props.name}
				</span>
				<span className="block text-xs mt-0.5 font-medium" style={{ color }}>
					{props.position}
				</span>
				{props.retired && (
					<span className="block text-xs text-white/30 mt-0.5">(retired)</span>
				)}

				{/* Socials */}
				{(instagram || linkedin) && (
					<div className="flex gap-2 justify-center mt-3">
						{instagram && (
							<a
								href={instagram}
								target="_blank"
								rel="noreferrer"
								aria-label="Instagram"
								className="opacity-40 hover:opacity-100 transition-opacity duration-200"
							>
								<InstagramIcon />
							</a>
						)}
						{linkedin && (
							<a
								href={linkedin}
								target="_blank"
								rel="noreferrer"
								aria-label="LinkedIn"
								className="opacity-40 hover:opacity-100 transition-opacity duration-200"
							>
								<LinkedInIcon />
							</a>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

// ─── Department Section ───────────────────────────────────────────────────────

interface DeptSectionProps {
	dept: Dept;
	officerList: typeof officers[0]["list"];
	semester: number;
	opacity: string;
}

const DeptSection = ({ dept, officerList, semester, opacity }: DeptSectionProps) => {
	const { label, color } = DEPTS[dept];
	const filtered = officerList.filter((o) => getDept(o.position) === dept);
	if (filtered.length === 0) return null;

	// President: single card, centred
	const isPresident = dept === "president";

	return (
		<div className={`mb-10 transition-opacity duration-500 ${opacity}`}>
			{/* Section header */}
			<div className="flex items-center gap-3 mb-5">
				<span
					className="block h-0.5 w-5 rounded-full flex-shrink-0"
					style={{ backgroundColor: color }}
				/>
				<h2
					className="font-display text-sm font-bold tracking-[0.2em] uppercase"
					style={{ color }}
				>
					{label}
				</h2>
				<span
					className="flex-1 h-px"
					style={{ background: `linear-gradient(to right, ${color}30, transparent)` }}
				/>
			</div>

			{isPresident ? (
				<div className="flex justify-center">
					<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
						{filtered.map((officer) => (
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
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
					{filtered.map((officer) => (
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
	);
};

// ─── Legend ───────────────────────────────────────────────────────────────────

const DeptLegend = () => (
	<div className="flex flex-wrap justify-center gap-4 mb-10">
		{DEPT_ORDER.map((d) => (
			<div key={d} className="flex items-center gap-1.5">
				<span
					className="w-3 h-3 rounded-full flex-shrink-0"
					style={{ backgroundColor: DEPTS[d].color }}
				/>
				<span className="text-xs text-white/50 font-medium">{DEPTS[d].label}</span>
			</div>
		))}
	</div>
);

// ─── Semester Selector ────────────────────────────────────────────────────────

interface SemesterSelectorProps {
	semester: number;
	total: number;
	onPrev: () => void;
	onNext: () => void;
}

const SemesterSelector = ({ semester, total, onPrev, onNext }: SemesterSelectorProps) => (
	<div className="flex items-center justify-center gap-4 mb-10">
		<button
			onClick={onPrev}
			disabled={semester === 0}
			aria-label="Previous semester"
			className="w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-white/10 text-white/40 hover:text-white hover:ring-dark-primary/60 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
		>
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
				<path
					d="M9 2L4 7l5 5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>

		<span className="font-display font-semibold text-dark-primary text-sm tracking-wide min-w-[140px] text-center">
			{officers[semester].semester}
		</span>

		<button
			onClick={onNext}
			disabled={semester === total - 1}
			aria-label="Next semester"
			className="w-8 h-8 flex items-center justify-center rounded-full ring-1 ring-white/10 text-white/40 hover:text-white hover:ring-dark-primary/60 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
		>
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
				<path
					d="M5 2l5 5-5 5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	</div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const OfficersPage = () => {
	const total = officers.length;
	const [semester, setSemester] = useState(total - 1);
	const [opacity, setOpacity] = useState("opacity-100");

	const changeSemester = (next: number) => {
		setOpacity("opacity-0");
		setTimeout(() => {
			setSemester(next);
			setOpacity("opacity-100");
		}, 350);
	};

	const currentList = officers[semester].list;

	return (
		<div className="text-white min-h-screen">
			{/* Hero header */}
			<div className="relative py-16 px-6 text-center overflow-hidden">
				{/* ambient glow */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"radial-gradient(ellipse 60% 50% at 50% 0%, rgba(117,228,255,0.07) 0%, transparent 70%)",
					}}
				/>
				<FadeInSection className="animate-fade-down">
					<p className="text-xs font-semibold tracking-[0.3em] uppercase text-dark-primary mb-3">
						Code Coogs Leadership
					</p>
				</FadeInSection>
				<FadeInSection className="animate-fade-up">
					<h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
						Meet the team that
						<br />
						<span className="text-dark-primary">makes it happen</span>
					</h1>
				</FadeInSection>
				<FadeInSection className="animate-fade-up">
					<p className="text-white/50 mt-4 text-sm max-w-md mx-auto">
						Every event, workshop, and competition is driven by these dedicated
						officers — past and present.
					</p>
				</FadeInSection>
			</div>

			{/* Main content */}
			<div className="max-w-5xl mx-auto px-4 pb-20">
				{/* Semester nav */}
				<SemesterSelector
					semester={semester}
					total={total}
					onPrev={() => changeSemester(Math.max(0, semester - 1))}
					onNext={() => changeSemester(Math.min(total - 1, semester + 1))}
				/>

				{/* Dept legend */}
				<DeptLegend />

				{/* Department sections */}
				{DEPT_ORDER.map((dept) => (
					<DeptSection
						key={dept}
						dept={dept}
						officerList={currentList}
						semester={semester}
						opacity={opacity}
					/>
				))}
			</div>
		</div>
	);
};

export default OfficersPage;
