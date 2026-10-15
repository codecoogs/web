import { useEffect, useRef, useState } from "react";
import { Flashcard } from "react-quizlet-flashcard";
import { type Opportunity, fetchOpportunities } from "../data/api";
import { useScrollLock } from "../common/utils";

const cn = (...classes: Array<string | false | undefined>) =>
	classes.filter(Boolean).join(" ");

const style =
	"flex items-start p-7 h-full relative font-bold  rounded-lg bg-[#151515] text-white ring-1 ring-dark-primary ring-inset";

const CloseIcon = ({ className }: { className?: string }) => (
	<svg
		role="graphics-symbol"
		aria-label="closeIcon"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path d="M18 6 6 18M6 6l12 12" />
	</svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
	<svg
		role="graphics-symbol"
		aria-label="chevronDownIcon"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path d="m6 9 6 6 6-6" />
	</svg>
);

const TRANSITION_MS = 450;

const cardSlotStyle: React.CSSProperties = {
	flex: "1 1 auto",
	width: "45%",
	height: "200px",
	marginBottom: "1rem",
	marginRight: "1rem",
};

type Rect = { top: number; left: number; width: number; height: number };

// Mirrors the Flashcard's footprint so the cards do not jump when they arrive.
const OpportunitySkeleton = () => (
	<div className="animate-pulse" style={cardSlotStyle}>
		<div className={`${style} flex-col justify-start`}>
			<div className="w-12 h-12 mb-3 rounded bg-white/10" />
			<div className="w-2/3 h-5 mb-2 rounded bg-white/10" />
			<div className="w-1/3 h-5 rounded bg-white/10" />
		</div>
	</div>
);

// Flipping reveals the back face in place, then promotes the card to a
// centered modal — the back face's content (description + apply link) can
// be taller than the grid cell, and the library doesn't clip overflow, so
// without this the flipped content visually spills onto neighboring cards.
//
// The card is pinned to its exact on-screen rect (position: fixed with the
// measured pixel values) the instant it detaches, so nothing jumps; only on
// the next frame do top/left/width/height animate toward the centered modal
// rect, which is what actually makes the transition smooth (you can't
// transition a `position: relative` -> `fixed` switch itself).
const OpportunityCard = ({ role }: { role: Opportunity }) => {
	const [expanded, setExpanded] = useState(false);
	const [detached, setDetached] = useState(false);
	const [startRect, setStartRect] = useState<Rect | null>(null);
	const [hasOverflow, setHasOverflow] = useState(false);
	const [atBottom, setAtBottom] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLDivElement>(null);
	const flipRef = useRef<() => void>(() => {});
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

	const open = () => {
		window.clearTimeout(closeTimeoutRef.current);
		const el = cardRef.current;
		if (el) {
			const r = el.getBoundingClientRect();
			setStartRect({ top: r.top, left: r.left, width: r.width, height: r.height });
		}
		setDetached(true);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setExpanded(true);
				flipRef.current();
			});
		});
	};

	const close = () => {
		setExpanded(false);
		flipRef.current();
		closeTimeoutRef.current = setTimeout(() => {
			setDetached(false);
			setStartRect(null);
		}, TRANSITION_MS);
	};

	useScrollLock(detached);

	useEffect(
		() => () => {
			window.clearTimeout(closeTimeoutRef.current);
		},
		[],
	);

	// Tracks whether the description overflows and whether it's scrolled to
	// the bottom, so the "scroll for more" hint only shows when it's true.
	useEffect(() => {
		const el = descRef.current;
		if (!detached || !el) return;

		const update = () => {
			setHasOverflow(el.scrollHeight > el.clientHeight + 1);
			setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 4);
		};

		el.addEventListener("scroll", update);
		window.addEventListener("resize", update);
		// The card's box only reaches its final size after the open
		// transition settles, so the first real measurement has to wait too.
		const settleTimer = setTimeout(update, TRANSITION_MS + 20);

		return () => {
			el.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
			clearTimeout(settleTimer);
		};
	}, [detached]);

	const boxStyle: React.CSSProperties =
		detached && startRect
			? {
					position: "fixed",
					top: expanded ? "50%" : startRect.top,
					left: expanded ? "50%" : startRect.left,
					width: expanded ? "min(95vw, 45rem)" : startRect.width,
					height: expanded ? "min(85vh, 36rem)" : startRect.height,
					transform: expanded ? "translate(-50%, -50%)" : "translate(0, 0)",
					zIndex: 50,
					transition: `top ${TRANSITION_MS}ms ease, left ${TRANSITION_MS}ms ease, width ${TRANSITION_MS}ms ease, height ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
				}
			: { position: "relative", ...cardSlotStyle };

	return (
		<>
			{/* Reserves the grid slot while the real card is detached (fixed), so
			    siblings don't reflow into the gap. */}
			{detached && <div aria-hidden="true" style={cardSlotStyle} />}

			<div
				className={cn(
					"fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
					expanded
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none",
				)}
				onClick={close}
				aria-hidden="true"
			/>

			<div ref={cardRef} style={boxStyle}>
				<Flashcard
					manualFlipRef={flipRef}
					height="100%"
					width="100%"
					frontHTML={
						<div
							className="relative group h-full cursor-pointer"
							onClick={open}
						>
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
						<div className="relative group h-full">
							<div className="absolute -inset-0.5 bg-dark-primary blur-lg opacity-30 transform scale-90 group-hover:scale-100 transition-all duration-300" />
							<div
								className={`${style} items-stretch h-full flex-col gap-3`}
							>
								<button
									type="button"
									aria-label="Close"
									onClick={close}
									className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
								>
									<CloseIcon className="h-5 w-5" />
								</button>

								<div className="relative min-h-0 flex-1">
									<div
										ref={descRef}
										className="hide-scrollbar h-full overflow-y-auto pr-1 font-normal"
									>
										<span className="md:text-sm lg:text-base text-sm whitespace-pre-line">
											{role.description}
										</span>
									</div>

									{expanded && hasOverflow && !atBottom && (
										<div
											aria-hidden="true"
											className="pointer-events-none absolute inset-x-0 bottom-0 flex h-10 items-end justify-center bg-gradient-to-t from-[#151515] to-transparent pb-1"
										>
											<ChevronDownIcon className="h-4 w-4 animate-bounce text-white/60" />
										</div>
									)}
								</div>

								{role.applicationLink && (
									<div className="relative group flex shrink-0 justify-center">
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
							</div>
						</div>
					}
				/>
			</div>
		</>
	);
};

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
							{opportunities.map((role) => (
								<OpportunityCard key={role.id} role={role} />
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default OpportunitiesInfo;
