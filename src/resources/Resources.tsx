import { useEffect, useMemo, useRef, useState } from "react";
import FadeInSection from "../common/FadeInSection";
import { getDateFromResourceName, useTitle } from "../common/utils";
import { resources } from "../data/resources";
import { ResourceCategory } from "./ResourceCategory";
import ResourceItem from "./ResourceItem";

function Resources() {
	useTitle("Resources");

	// Set up
	const searchElement = useRef<HTMLInputElement>(null);
	const images = ["teams", "workshops", "competitions"];
	const categories = useMemo(() => {
		const arr = new Array<string>();

		resources.sort((a, b) => {
			const dateA = getDateFromResourceName(a);
			const dateB = getDateFromResourceName(b);

			if (dateA && !dateB) {
				return -1;
			}

			if (!dateA && dateB) {
				return 1;
			}

			if (dateA && dateB) {
				return dateA < dateB ? 1 : -1;
			}

			return 1;
		});

		for (const resource of resources) {
			if (!arr.includes(resource.category)) {
				arr.push(resource.category);
			}
		}

		return arr;
	}, []);
	const queries = useMemo(
		() => new URLSearchParams(window.location.search),
		[],
	);

	// State
	const [selected, setSelected] = useState<string>(() => {
		const categoryQuery = queries.get("category");

		if (
			categoryQuery &&
			categoryQuery !== "" &&
			categories.includes(categoryQuery)
		) {
			return categoryQuery;
		}

		return categories[0];
	});
	const [search, setSearch] = useState<string>(() => {
		const searchQuery = queries.get("search");

		if (searchQuery && searchQuery !== "") {
			return searchQuery;
		}

		return "";
	});

	useEffect(() => {
		if (searchElement.current) {
			searchElement.current.value = search;
		}
	});

	useEffect(() => {
		window.history.replaceState(
			"",
			"",
			`${window.location.pathname}?category=${selected}&search=${search}`,
		);
	}, [selected, search]);

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
						Learning Materials
					</p>
				</FadeInSection>
				<FadeInSection className="animate-fade-up">
					<h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
						Slides, notebooks &amp;
						<br />
						<span className="text-dark-primary">workshop resources</span>
					</h1>
				</FadeInSection>
				<FadeInSection className="animate-fade-up">
					<p className="text-white/50 mt-4 text-sm max-w-md mx-auto">
						Browse materials from our workshops, competitions, and
						collaborations — everything we&apos;ve shared, in one place.
					</p>
				</FadeInSection>
			</div>

			{/* Main content */}
			<div className="max-w-5xl mx-auto px-4 pb-20">
				{/* Category tabs */}
				<div className="flex flex-wrap justify-center gap-3 mb-8">
					{categories.map((category) => (
						<ResourceCategory
							key={category}
							category={category}
							selected={selected === category}
							onClick={() => setSelected(category)}
						/>
					))}
				</div>

				{/* Search + mascot */}
				<div className="flex flex-col items-center gap-6 mb-12">
					<div className="relative w-full max-w-sm">
						<svg
							className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden="true"
						>
							<circle
								cx="7"
								cy="7"
								r="5"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M11 11l3 3"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
						<input
							ref={searchElement}
							type="text"
							placeholder="Search resources"
							onChange={(e) => setSearch(e.target.value)}
							className="w-full bg-dark-surface-variant text-white placeholder-white/40 pl-11 pr-4 py-3 rounded-full outline-none ring-1 ring-inset ring-white/10 focus:ring-dark-primary/60 transition-all"
						/>
					</div>

					<img
						className="max-h-28 object-cover rounded-md"
						src={`/assets/${images.find((image) => image.includes(selected.toLowerCase())) ?? "socials"}-coco.webp`}
						alt={selected}
					/>
				</div>

				<ul className="flex flex-row flex-wrap gap-6 justify-center">
					{resources.map((resource) => (
						<ResourceItem
							key={resource.id}
							visible={
								selected === resource.category &&
								(search === "" ||
									resource.name.toLowerCase().includes(search.toLowerCase()))
							}
							{...resource}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Resources;
