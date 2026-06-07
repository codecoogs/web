import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../common/utils";
import FadeInSection from "../common/FadeInSection";

// ─── Hero Buttons ────────────────────────────────────────────────────────────

const JoinUsButton = () => (
	<div className="relative group">
		<div className="absolute -inset-0.5 bg-dark-primary blur-lg rounded-full opacity-50 transform scale-75 group-hover:scale-100 transition-all duration-300" />
		<Link
			to="/join"
			className="flex items-center px-7 py-3 relative font-semibold text-sm tracking-wide rounded-lg bg-dark-primary text-dark-surface hover:brightness-110 transition-all duration-200"
		>
			Join Code Coogs
		</Link>
	</div>
);

const SponsorUsButton = () => (
	<a
		href="/sponsors"
		className="flex items-center px-7 py-3 font-semibold text-sm tracking-wide rounded-lg bg-transparent text-white/80 ring-1 ring-white/20 hover:ring-dark-primary hover:text-dark-primary transition-all duration-200"
	>
		Become a Sponsor
	</a>
);

// ─── Rotating Headline ───────────────────────────────────────────────────────

const HomeTitle = () => {
	const phrases = ["Community", "Creativity", "Collaboration"];
	const [index, setIndex] = useState(0);
	const [fade, setFade] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setIndex((i) => (i + 1) % phrases.length);
				setFade(true);
			}, 400);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="font-display text-white">
			<p className="text-sm font-medium tracking-[0.25em] uppercase text-dark-primary mb-4">
				University of Houston
			</p>
			<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2">
				We Foster
			</h1>
			<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
				<span
					className={`text-dark-primary transition-opacity duration-400 ${
						fade ? "opacity-100" : "opacity-0"
					}`}
				>
					{phrases[index]}
				</span>
			</h1>
		</div>
	);
};

// ─── Hero Photo Collage (right side) ─────────────────────────────────────────

const heroPhotos = [
	"/assets/events/spring2026/code_coogs_spring_2026_first_general_meeting_group_photo.webp",
	"/assets/events/spring2025/code_coogs_spring_2025_cloud_computing_workshop.webp",
	"/assets/events/fall2024/code_coogs_fall_2024_paycom_info_session.webp",
	"/assets/events/spring2026/code_coogs_spring_2026_officer_social_bowling.webp",
	"/assets/events/fall2025/code_coogs_fun_event_photo.webp",
	"/assets/events/spring2026/code_coogs_spring_2026_WISTEM_panel.webp",
];

const HeroCollage = () => (
	<div
		className="absolute inset-y-0 right-0 w-[55%] hidden md:grid"
		style={{ clipPath: "polygon(7% 0, 100% 0, 100% 100%, 0% 100%)" }}
	>
		{/* dark gradient fade on the left edge so text stays readable */}
		<div
			className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
			style={{
				background:
					"linear-gradient(to right, #121212 0%, transparent 100%)",
			}}
		/>
		<div className="grid grid-cols-3 grid-rows-2 w-full h-full gap-1">
			{/* top-left: tall spanning card */}
			<div className="row-span-2 col-span-1 relative overflow-hidden">
				<img
					src={heroPhotos[0]}
					alt="Code Coogs event"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-dark-primary/10" />
			</div>
			{/* top-center */}
			<div className="col-span-1 relative overflow-hidden">
				<img
					src={heroPhotos[1]}
					alt="Code Coogs event"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-dark-primary/5" />
			</div>
			{/* top-right */}
			<div className="col-span-1 relative overflow-hidden">
				<img
					src={heroPhotos[2]}
					alt="Code Coogs event"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-dark-primary/5" />
			</div>
			{/* bottom-center */}
			<div className="col-span-1 relative overflow-hidden">
				<img
					src={heroPhotos[3]}
					alt="Code Coogs event"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-dark-primary/5" />
			</div>
			{/* bottom-right spanning */}
			<div className="col-span-1 relative overflow-hidden">
				<img
					src={heroPhotos[4]}
					alt="Code Coogs event"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-dark-primary/5" />
			</div>
		</div>
		{/* overall dark overlay so photos don't overpower */}
		<div className="absolute inset-0 bg-dark-surface/30 pointer-events-none" />
	</div>
);

// ─── Hero Section ────────────────────────────────────────────────────────────

const HeroSection = () => (
	<div className="relative flex min-h-screen overflow-hidden bg-dark-surface">
		{/*
		  VIDEO BACKGROUND — drop a 10-15s looping clip at /assets/hero-bg.mp4
		  and it will show at 20% opacity behind the entire hero.
		*/}
		<video
			autoPlay
			loop
			muted
			playsInline
			className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none z-0"
		>
			<source src="/assets/hero-bg.mp4" type="video/mp4" />
		</video>

		{/* subtle ambient glow */}
		<div
			className="absolute inset-0 z-0 pointer-events-none"
			style={{
				background:
					"radial-gradient(ellipse 70% 60% at 20% 50%, rgba(117,228,255,0.06) 0%, transparent 70%)",
			}}
		/>

		{/* Right collage */}
		<HeroCollage />

		{/* Left content — z-10 so it sits above the collage + video */}
		<div className="relative z-10 flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 lg:px-24 py-32">
			<div className="animate-fade-down animate-once animate-duration-[1200ms]">
				<HomeTitle />
			</div>

			<p className="mt-6 text-white/60 text-base md:text-lg leading-relaxed max-w-md animate-fade-up animate-once animate-duration-[1400ms]">
				Build projects, compete with teams, and unlock technical and community
				growth — all at the University of Houston.
			</p>

			<div className="flex flex-wrap gap-4 mt-10 animate-fade-up animate-once animate-duration-[1600ms]">
				<JoinUsButton />
				<SponsorUsButton />
			</div>

			{/* Coco mascot — larger and more prominent */}
			<div className="mt-14 animate-fade-up animate-once animate-duration-[1800ms]">
				<img
					src="/assets/coco-border.webp"
					alt="Coco — Code Coogs mascot"
					className="w-48 md:w-60 lg:w-72"
				/>
			</div>
		</div>

		{/* scroll hint */}
		<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase animate-bounce">
			<span>Scroll</span>
			<svg width="12" height="18" viewBox="0 0 12 18" fill="none">
				<path
					d="M6 0v14M1 9l5 5 5-5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	</div>
);

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const stats = [
	{ value: "30+", label: "Events per Semester" },
	{ value: "$3K+", label: "Given in Scholarships" },
	{ value: "Since 2021", label: "& Growing Every Semester" },
	{ value: "Top CS Org", label: "at University of Houston" },
];

const StatsBar = () => (
	<div className="bg-dark-surface-variant border-y border-white/[0.06]">
		<div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
			{stats.map((s) => (
				<FadeInSection key={s.label} className="animate-fade-up">
					<div className="flex flex-col items-center text-center md:px-8">
						<span className="font-display text-2xl md:text-3xl font-bold text-dark-primary">
							{s.value}
						</span>
						<span className="text-white/50 text-xs md:text-sm mt-1 leading-snug">
							{s.label}
						</span>
					</div>
				</FadeInSection>
			))}
		</div>
	</div>
);

// ─── Life at Code Coogs — Bento Gallery ──────────────────────────────────────

interface BentoPhoto {
	src: string;
	label: string;
	/** Tailwind col-span classes (desktop first) */
	col: string;
	/** Tailwind row-span classes */
	row: string;
}

// 9-cell bento — math: 4-col grid
// Row 1-2: [A 2×2] [B 1×1] [C 1×2]
// Row 2  :         [D 1×1]
// Row 3  : [E 2×1] [F 1×1] [G 1×1]
// Row 4  : [H 2×1] [I 2×1]
const bentoPhotos: BentoPhoto[] = [
	{
		src: "/assets/events/spring2026/code_coogs_spring_2026_first_general_meeting_group_photo.webp",
		label: "Spring 2026 General Meeting",
		col: "col-span-2",
		row: "row-span-2",
	},
	{
		src: "/assets/events/fall2024/code_coogs_fall_2024microsoft_info_session.webp",
		label: "Microsoft Info Session",
		col: "col-span-1",
		row: "row-span-1",
	},
	{
		src: "/assets/events/fall2024/code_coogs_fall_2024_web_dev_workshop.webp",
		label: "Web Dev Workshop",
		col: "col-span-1",
		row: "row-span-2",
	},
	{
		src: "/assets/events/fall2024/code_coogs_fall_2024_nintendo_gaming.webp",
		label: "Nintendo Gaming Night",
		col: "col-span-1",
		row: "row-span-1",
	},
	{
		src: "/assets/events/spring2025/code_coogs_spring_2025_first_general_meeting.webp",
		label: "Spring 2025 General Meeting",
		col: "col-span-2",
		row: "row-span-1",
	},
	{
		src: "/assets/events/fall2025/code_coogs_fall_2025_cafe_social.webp",
		label: "Café Social",
		col: "col-span-1",
		row: "row-span-1",
	},
	{
		src: "/assets/events/spring2026/code_coogs_spring_2026_kokee_tea_social.webp",
		label: "Kokee Tea Social",
		col: "col-span-1",
		row: "row-span-1",
	},
	{
		src: "/assets/events/spring2026/code_coogs_spring_2026_banquet_group_photo.webp",
		label: "Spring 2026 Banquet",
		col: "col-span-2",
		row: "row-span-1",
	},
	{
		src: "/assets/events/spring2025/code_coogs_spring_2025_product_pitch.webp",
		label: "Product Pitch Night",
		col: "col-span-2",
		row: "row-span-1",
	},
];

interface BentoCellProps {
	photo: BentoPhoto;
}

const BentoCell = ({ photo }: BentoCellProps) => (
	<div
		className={`${photo.col} ${photo.row} relative overflow-hidden rounded-2xl group cursor-pointer`}
	>
		<img
			src={photo.src}
			alt={photo.label}
			loading="lazy"
			className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
			onError={(e) => {
				(e.currentTarget.closest("div") as HTMLElement).style.display = "none";
			}}
		/>
		{/* gradient + label on hover */}
		<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
		<span className="absolute bottom-3 left-4 text-white text-xs md:text-sm font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
			{photo.label}
		</span>
		{/* subtle teal border on hover */}
		<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-dark-primary/0 group-hover:ring-dark-primary/40 transition-all duration-300 pointer-events-none" />
	</div>
);

const GallerySection = () => (
	<section className="py-20 px-6 bg-dark-surface">
		<div className="max-w-6xl mx-auto">
			<FadeInSection className="animate-fade-up">
				<div className="text-center mb-12">
					<h2 className="font-display text-3xl md:text-4xl font-bold text-white">
						Life at Code Coogs
					</h2>
					<p className="text-white/50 mt-3 text-sm md:text-base">
						Real people. Real projects. Real impact.
					</p>
				</div>
			</FadeInSection>

			{/* Bento grid — 4-col desktop, 2-col mobile */}
			<FadeInSection className="animate-fade-up">
				<div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-3">
					{bentoPhotos.map((photo) => (
						<BentoCell key={photo.src} photo={photo} />
					))}
				</div>
			</FadeInSection>
		</div>
	</section>
);

// ─── Feature Teaser Cards (Teams / Workshops / Competitions) ──────────────────

interface FeatureCardProps {
	image: string;
	title: string;
	description: string;
	linkTo: string;
	accentColor: string;
}

const FeatureCard = ({
	image,
	title,
	description,
	linkTo,
	accentColor,
}: FeatureCardProps) => (
	<div className="group relative flex flex-col bg-dark-surface-variant rounded-2xl overflow-hidden ring-1 ring-white/[0.07] hover:ring-dark-primary/50 transition-all duration-300 hover:-translate-y-1">
		{/* image area */}
		<div className="relative h-44 overflow-hidden bg-dark-surface flex items-center justify-center">
			<img
				src={image}
				alt={title}
				className="h-36 object-contain transition-transform duration-500 group-hover:scale-105"
			/>
			{/* bottom gradient bleed */}
			<div
				className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, transparent, #161616)",
				}}
			/>
		</div>

		{/* text */}
		<div className="flex flex-col flex-1 p-6">
			<h3
				className="font-display text-xl font-semibold mb-2"
				style={{ color: accentColor }}
			>
				{title}
			</h3>
			<p className="text-white/60 text-sm leading-relaxed flex-1">
				{description}
			</p>
			<Link
				to={linkTo}
				className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-dark-primary hover:gap-3 transition-all duration-200"
			>
				Learn more
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M1 7h12M8 2l5 5-5 5"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</Link>
		</div>

		{/* glow accent */}
		<div
			className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
			style={{
				background: `radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%), ${accentColor}18, transparent 40%)`,
			}}
		/>
	</div>
);

const FeatureTeaserSection = () => (
	<section className="py-20 px-6 bg-dark-surface-variant">
		<div className="max-w-5xl mx-auto">
			<FadeInSection className="animate-fade-up">
				<div className="text-center mb-14">
					<h2 className="font-display text-3xl md:text-4xl font-bold text-white">
						What We Do
					</h2>
					<p className="text-white/50 mt-3 text-sm md:text-base max-w-xl mx-auto">
						Three pillars that define the Code Coogs experience.
					</p>
				</div>
			</FadeInSection>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<FadeInSection className="animate-fade-up">
					<FeatureCard
						image="/assets/teams-coco.webp"
						title="Teams"
						description="Join a squad of builders and ship a real project together. Teams are mentored, cross-disciplinary, and built for your portfolio."
						linkTo="/#us"
						accentColor="#75e4ff"
					/>
				</FadeInSection>

				<FadeInSection className="animate-fade-up">
					<FeatureCard
						image="/assets/workshops-coco.webp"
						title="Workshops"
						description="Hands-on sessions led by industry engineers and senior members — from web dev to machine learning, every skill level welcome."
						linkTo="/#us"
						accentColor="#a78bfa"
					/>
				</FadeInSection>

				<FadeInSection className="animate-fade-up">
					<FeatureCard
						image="/assets/competitions-coco.webp"
						title="Competitions"
						description="Hackathons, coding challenges, and invitational events. We've placed at nationals — come compete with us."
						linkTo="/#us"
						accentColor="#34d399"
					/>
				</FadeInSection>
			</div>
		</div>
	</section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Home = () => {
	useTitle("Code Coogs");

	return (
		<div>
			<HeroSection />
			<StatsBar />
			<GallerySection />
			<FeatureTeaserSection />
		</div>
	);
};

export default Home;
