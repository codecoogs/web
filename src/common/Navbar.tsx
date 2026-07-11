import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { DiscordIcon } from "./NavbarIcons";
import { discordLink } from "../data/members";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavlinkProps {
	to: string;
	text: string;
	onClick?: () => void;
}

// ─── Desktop underline-slide link ────────────────────────────────────────────

const Navlink = ({ to, text, onClick }: NavlinkProps) => {
	const { pathname } = useLocation();
	const isActive = pathname === to;

	return (
		<li>
			<Link
				to={to}
				onClick={onClick}
				className="relative block py-1 text-sm font-medium tracking-wide group"
			>
				{/* text colour */}
				<span
					className={`transition-colors duration-200 ${
						isActive
							? "text-dark-primary"
							: "text-white/70 group-hover:text-white"
					}`}
				>
					{text}
				</span>
				{/* underline that slides in from the left */}
				<span
					className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-dark-primary transition-all duration-300 ${
						isActive ? "w-full" : "w-0 group-hover:w-full"
					}`}
				/>
			</Link>
		</li>
	);
};

// ─── Logo / home link ─────────────────────────────────────────────────────────

const Navhome = ({ onClick }: { onClick?: () => void }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<Link
			to="/"
			onClick={onClick}
			className="flex items-center gap-1 ml-4 md:ml-10 flex-shrink-0"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<img
				src={
					hovered ? "/assets/determined-coco.webp" : "/assets/happy-coco.webp"
				}
				alt="Coco mascot"
				width={40}
				height={40}
				className="transition-all duration-200"
			/>
			<img
				src={hovered ? "/assets/coco.webp" : "/assets/coco-border.webp"}
				alt="Code Coogs"
				width={140}
				className="my-[-14px] transition-all duration-200"
			/>
		</Link>
	);
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const drawerRef = useRef<HTMLDivElement>(null);

	// Frosted-glass on scroll
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close drawer on outside click
	useEffect(() => {
		if (!drawerOpen) return;
		const handler = (e: MouseEvent) => {
			if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
				setDrawerOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [drawerOpen]);

	// Prevent body scroll when drawer is open
	useEffect(() => {
		document.body.style.overflow = drawerOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [drawerOpen]);

	const closeDrawer = () => setDrawerOpen(false);

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between transition-all duration-300 ${
					scrolled
						? "bg-dark-surface/80 backdrop-blur-md border-b border-white/[0.07] shadow-lg shadow-black/20"
						: "bg-transparent"
				}`}
			>
				{/* Logo */}
				<Navhome onClick={closeDrawer} />

				{/* Desktop nav links — centre */}
				<ul className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
					<Navlink to="/#us" text="About" />
					<Navlink to="/events" text="Events" />
					<Navlink to="/opportunities" text="Opportunities" />
					<Navlink to="/resources" text="Resources" />
					<Navlink to="/officers" text="Officers" />
				</ul>

				{/* Desktop CTAs — right */}
				<div className="hidden md:flex items-center gap-3 mr-6">
					{/* Discord */}
					<a
						href={discordLink}
						target="_blank"
						rel="noreferrer"
						aria-label="Join our Discord"
						className="fill-white/60 hover:fill-white transition-colors duration-200"
					>
						<DiscordIcon />
					</a>

					{/* Sponsor ghost button */}
					<Link
						to="/sponsors"
						className="px-4 py-1.5 text-sm font-semibold rounded-lg text-white/70 ring-1 ring-white/20 hover:ring-dark-primary hover:text-dark-primary transition-all duration-200"
					>
						Sponsor Us
					</Link>

					{/* Join CTA */}
					<Link
						to="/join"
						className="relative px-4 py-1.5 text-sm font-bold rounded-lg bg-dark-primary text-dark-surface hover:brightness-110 transition-all duration-200"
					>
						Join via CoCo ↗
					</Link>
				</div>

				{/* Mobile hamburger — always visible on small screens */}
				<button
					type="button"
					className="md:hidden mr-4 flex flex-col justify-center gap-[5px] w-8 h-8 group"
					onClick={() => setDrawerOpen((o) => !o)}
					aria-label="Toggle menu"
					aria-expanded={drawerOpen}
				>
					<span
						className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
							drawerOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
						}`}
					/>
					<span
						className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
							drawerOpen ? "opacity-0 w-0" : "w-4"
						}`}
					/>
					<span
						className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
							drawerOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
						}`}
					/>
				</button>
			</nav>

			{/* Mobile drawer backdrop */}
			<div
				className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
					drawerOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
				aria-hidden="true"
			/>

			{/* Mobile slide-in drawer from right */}
			<div
				ref={drawerRef}
				className={`fixed top-0 right-0 z-50 h-full w-72 bg-dark-surface border-l border-white/[0.08] flex flex-col pt-20 pb-8 px-6 transition-transform duration-300 ease-in-out md:hidden ${
					drawerOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Nav links */}
				<nav className="flex flex-col gap-1">
					{[
						{ to: "/#us", text: "About" },
						{ to: "/events", text: "Events" },
						{ to: "/opportunities", text: "Opportunities" },
						{ to: "/resources", text: "Resources" },
						{ to: "/officers", text: "Officers" },
					].map(({ to, text }) => (
						<Link
							key={to}
							to={to}
							onClick={closeDrawer}
							className="flex items-center justify-between py-3 border-b border-white/[0.06] text-white/70 hover:text-white font-medium text-sm tracking-wide transition-colors duration-200 group"
						>
							{text}
							<svg
								width="14"
								height="14"
								viewBox="0 0 14 14"
								fill="none"
								aria-hidden="true"
								className="text-white/20 group-hover:text-dark-primary transition-colors duration-200"
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
					))}
				</nav>

				{/* Mobile CTAs */}
				<div className="mt-auto flex flex-col gap-3">
					<a
						href={discordLink}
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-2 py-2.5 px-4 rounded-lg ring-1 ring-white/10 text-white/60 hover:ring-dark-primary hover:text-white text-sm font-medium transition-all duration-200"
					>
						<span className="fill-current">
							<DiscordIcon />
						</span>
						Join our Discord
					</a>
					<Link
						to="/sponsors"
						onClick={closeDrawer}
						className="py-2.5 px-4 text-center rounded-lg ring-1 ring-white/20 text-white/70 hover:ring-dark-primary hover:text-dark-primary text-sm font-semibold transition-all duration-200"
					>
						Sponsor Us
					</Link>
					<Link
						to="/join"
						onClick={closeDrawer}
						className="py-2.5 px-4 text-center rounded-lg bg-dark-primary text-dark-surface text-sm font-bold hover:brightness-110 transition-all duration-200"
					>
						Join via CoCo ↗
					</Link>
				</div>
			</div>

			{/* Spacer so page content clears the fixed nav */}
			<div className="h-14" />
		</>
	);
};

export default Navbar;
