import { useEffect, useState } from "react";
import { Flashcard } from "react-quizlet-flashcard";
import { type Opportunity, fetchOpportunities } from "../data/api";

const style =
	"flex items-start p-7 h-[200px] relative font-bold  rounded-lg bg-[#151515] text-white ring-1 ring-dark-primary ring-inset";

// Mirrors the Flashcard's footprint so the cards do not jump when they arrive.
const OpportunitySkeleton = () => (
	<div
		className="animate-pulse"
		style={{
			flex: "1 1 auto",
			width: "45%",
			height: "200px",
			marginBottom: "1rem",
			marginRight: "1rem",
		}}
	>
		<div className={`${style} flex-col justify-start`}>
			<div className="w-12 h-12 mb-3 rounded bg-white/10" />
			<div className="w-2/3 h-5 mb-2 rounded bg-white/10" />
			<div className="w-1/3 h-5 rounded bg-white/10" />
		</div>
	</div>
);

const renderOpportunity = (role: Opportunity) => (
	<Flashcard
		key={role.id}
		style={{
			flex: "1 1 auto",
			width: "45%",
			height: "200px",
			marginBottom: "1rem",
			marginRight: "1rem",
		}}
		frontHTML={
			<div className="relative group">
				<div className="absolute -inset-0.5 bg-dark-primary blur-lg opacity-30 transform scale-90 group-hover:scale-100 transition-all duration-300" />
				<div className={style}>
					<span className="flex h-full flex-col">
						<img src={role.icon} className="w-12 mb-3" alt="" />
						<h1 className="text-lg">{role.name}</h1>
						<h1 className="text-lg font-normal">{role.year}</h1>
					</span>
				</div>
			</div>
		}
		backHTML={
			<div className="relative group">
				<div className="absolute -inset-0.5 bg-dark-primary blur-lg opacity-30 transform scale-90 group-hover:scale-100 transition-all duration-300" />
				<div className={`${style} justify-around items-start h-full flex-col`}>
					<span className="flex h-full flex-col items-center justify-between font-normal">
						<span className="md:text-sm lg:text-base text-sm">
							{role.description}
						</span>

						{role.applicationLink && (
							<div className="relative group">
								<a
									href={role.applicationLink}
									target="_blank"
									className="flex h-8 w-32 md:h-10 md:w-36 justify-center items-center p-2 relative font-bold text-center rounded-lg bg-black text-white ring-1 ring-dark-primary ring-inset hover:text-black hover:bg-dark-primary"
									rel="noreferrer"
								>
									<span className="flex">
										<span className="text-xs md:text-base">Apply</span>
									</span>
								</a>
							</div>
						)}
					</span>
				</div>
			</div>
		}
	/>
);

const OpportunitiesInfo = () => {
	const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
	const [status, setStatus] = useState<"loading" | "ready" | "error">(
		"loading",
	);

	useEffect(() => {
		let cancelled = false;

		fetchOpportunities()
			.then((data) => {
				if (!cancelled) {
					setOpportunities(data);
					setStatus("ready");
				}
			})
			.catch(() => {
				if (!cancelled) {
					setStatus("error");
				}
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className="text-white p-4" id="opportunitiesInfo">
			<div className="flex flex-wrap flex-col justify-center">
				<div className="rounded md:mx-20 my-4">
					<section className="md:w-3/4 mx-auto">
						<p className="text-lg p-6 opacity-90">
							Join a vibrant team of college students eager to make a difference
							through workshops, projects, competitions, and other coding
							activities. We believe in learning by doing and creating real
							impact along the way.
						</p>
					</section>
				</div>

				<div className="rounded md:mx-20 max-h-[100%] md:max-h-[30rem]">
					<section className="md:w-8/12 mx-auto">
						{status === "loading" && (
							<div className="flex flex-wrap p-6" aria-busy="true">
								{[0, 1, 2].map((index) => (
									<OpportunitySkeleton key={index} />
								))}
							</div>
						)}

						{status === "error" && (
							<p className="text-center text-white/50 text-sm p-6">
								We couldn&apos;t load the opportunities right now. Please try
								again later.
							</p>
						)}

						{status === "ready" && opportunities.length === 0 && (
							<p className="text-center text-white/50 text-sm p-6">
								There are no open opportunities at the moment — check back soon.
							</p>
						)}

						<div className="flex flex-wrap p-6">
							{opportunities.map(renderOpportunity)}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default OpportunitiesInfo;
