import { useEffect, useRef, useState } from "react";
import { type CalendarEvent, fetchEvents } from "../data/api";
import { downloadIcs, eventEnd, googleCalendarUrl } from "./calendar";

export const formatDay = (date: Date) =>
	date.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

export const formatTime = (date: Date) =>
	date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export const formatMonth = (date: Date) =>
	date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const formatTimeRange = (event: CalendarEvent) => {
	if (event.allDay) return "All day";
	const end = eventEnd(event);
	return end
		? `${formatTime(event.start)} to ${formatTime(end)}`
		: formatTime(event.start);
};

/** "Today", "Tomorrow", "In 5 days", or "3 days ago" relative to now. */
export const relativeDay = (date: Date) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const day = new Date(date);
	day.setHours(0, 0, 0, 0);
	const diff = Math.round((day.getTime() - today.getTime()) / 86_400_000);

	if (diff === 0) return "Today";
	if (diff === 1) return "Tomorrow";
	if (diff === -1) return "Yesterday";
	return diff > 0 ? `In ${diff} days` : `${-diff} days ago`;
};

export const isPast = (date: Date) => {
	const startOfToday = new Date();
	startOfToday.setHours(0, 0, 0, 0);
	return date < startOfToday;
};

/**
 * Flyers are portrait posters with text on them, so they are never cropped:
 * the poster sits contained over a blurred copy of itself to fill the frame.
 */
export const FlyerFrame = ({
	event,
	className = "",
	onOpen,
}: {
	event: CalendarEvent;
	className?: string;
	onOpen?: () => void;
}) => {
	if (!event.flyerUrl) {
		return <FlyerPlaceholder event={event} className={className} />;
	}

	return (
		<button
			type="button"
			onClick={onOpen}
			className={`group relative overflow-hidden rounded-lg bg-black ring-1 ring-white/[.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-primary ${className}`}
			aria-label={`View flyer for ${event.name}`}
		>
			<img
				src={event.flyerUrl}
				alt=""
				aria-hidden
				className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
			/>
			<img
				src={event.flyerUrl}
				alt={`Flyer for ${event.name}`}
				loading="lazy"
				className="relative w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
			/>
			<span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
				View flyer
			</span>
		</button>
	);
};

/** Typographic stand-in for events that have no flyer uploaded yet. */
export const FlyerPlaceholder = ({
	event,
	className = "",
}: {
	event: CalendarEvent;
	className?: string;
}) => (
	<div
		className={`relative flex flex-col justify-between overflow-hidden rounded-lg bg-dark-surface-variant p-5 ring-1 ring-white/[.12] ${className}`}
		style={{
			backgroundImage:
				"linear-gradient(rgba(117,228,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(117,228,255,.06) 1px, transparent 1px)",
			backgroundSize: "24px 24px",
		}}
	>
		<span className="font-custom text-xs text-dark-primary/80">
			{"</"}code coogs{">"}
		</span>
		<div>
			<div className="font-custom text-6xl font-bold leading-none text-white/90">
				{String(event.start.getDate()).padStart(2, "0")}
			</div>
			<div className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-dark-primary">
				{event.start.toLocaleDateString("en-US", { month: "long" })}
			</div>
		</div>
		<span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
			Flyer coming soon
		</span>
	</div>
);

export const CategoryChip = ({ category }: { category: string }) =>
	category ? (
		<span className="inline-flex items-center rounded-full bg-dark-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-dark-primary ring-1 ring-dark-primary/20">
			{category}
		</span>
	) : null;

/** Full-screen flyer viewer built on the native <dialog> element. */
export const FlyerLightbox = ({
	event,
	onClose,
}: {
	event: CalendarEvent | null;
	onClose: () => void;
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (event && !dialog.open) dialog.showModal();
		if (!event && dialog.open) dialog.close();
	}, [event]);

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") onClose();
			}}
			className="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
		>
			{event && (
				<div className="relative">
					<img
						src={event.flyerUrl}
						alt={`Flyer for ${event.name}`}
						className="max-h-[88vh] w-auto rounded-lg"
					/>
					<button
						type="button"
						onClick={onClose}
						className="absolute right-3 top-3 h-10 w-10 rounded-full bg-black/70 text-lg text-white backdrop-blur hover:bg-black"
						aria-label="Close flyer"
					>
						×
					</button>
				</div>
			)}
		</dialog>
	);
};

/** Long descriptions collapse to a few lines with a toggle to expand. */
export const ExpandableText = ({
	text,
	lines = 4,
	className = "",
}: {
	text: string;
	lines?: number;
	className?: string;
}) => {
	const [expanded, setExpanded] = useState(false);
	const long = text.length > 220 || text.split("\n").length > lines;

	return (
		<div className={className}>
			<p
				className="whitespace-pre-line [text-wrap:pretty]"
				style={
					expanded || !long
						? undefined
						: {
								display: "-webkit-box",
								WebkitLineClamp: lines,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}
				}
			>
				{text}
			</p>
			{long && (
				<button
					type="button"
					onClick={() => setExpanded((value) => !value)}
					className="mt-2 text-xs font-semibold tracking-wide text-dark-primary hover:underline"
				>
					{expanded ? "Show less" : "Read more"}
				</button>
			)}
		</div>
	);
};

const CalendarIcon = () => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
		<title>Calendar</title>
		<rect
			x="2"
			y="3"
			width="12"
			height="11"
			rx="2"
			stroke="currentColor"
			strokeWidth="1.5"
		/>
		<path
			d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3M8 8.5v3M6.5 10h3"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);

/** Button that opens a small menu: Google Calendar, or an .ics for everything else. */
export const AddToCalendar = ({
	event,
	variant = "primary",
}: {
	event: CalendarEvent;
	variant?: "primary" | "ghost";
}) => {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onPointer = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("pointerdown", onPointer);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onPointer);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const buttonStyle =
		variant === "primary"
			? "bg-dark-primary text-dark-surface hover:brightness-110 px-5 py-2.5 text-sm"
			: "text-white/80 ring-1 ring-white/20 hover:text-dark-primary hover:ring-dark-primary px-3 py-1.5 text-xs";

	const itemStyle =
		"block w-full rounded-md px-3 py-2 text-left text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-dark-primary";

	return (
		<div ref={rootRef} className="relative inline-block">
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-haspopup="menu"
				aria-expanded={open}
				className={`inline-flex items-center gap-2 rounded-lg font-semibold tracking-wide transition-all duration-200 ${buttonStyle}`}
			>
				<CalendarIcon />
				Add to calendar
			</button>

			{open && (
				<div
					role="menu"
					className={`absolute left-0 z-30 w-56 ${
						variant === "primary" ? "bottom-full mb-2" : "top-full mt-2"
					} rounded-xl bg-dark-surface-variant p-1.5 shadow-2xl shadow-black/60 ring-1 ring-white/15`}
				>
					<a
						role="menuitem"
						href={googleCalendarUrl(event)}
						target="_blank"
						rel="noreferrer"
						onClick={() => setOpen(false)}
						className={itemStyle}
					>
						Google Calendar
					</a>
					<button
						role="menuitem"
						type="button"
						onClick={() => {
							downloadIcs(event);
							setOpen(false);
						}}
						className={itemStyle}
					>
						Apple / Outlook (.ics)
					</button>
				</div>
			)}
		</div>
	);
};

export const DateTile = ({
	date,
	size = "sm",
}: { date: Date; size?: "sm" | "lg" }) => (
	<div
		className={`flex shrink-0 flex-col items-center justify-center rounded-lg bg-white/[.04] ring-1 ring-white/10 ${
			size === "lg" ? "h-24 w-24" : "h-14 w-14 md:h-16 md:w-16"
		}`}
	>
		<span
			className={`font-semibold uppercase tracking-[0.2em] text-dark-primary ${
				size === "lg" ? "text-xs" : "text-[9px] md:text-[10px]"
			}`}
		>
			{date.toLocaleDateString("en-US", { month: "short" })}
		</span>
		<span
			className={`font-custom font-bold leading-none text-white ${
				size === "lg" ? "mt-1 text-4xl" : "mt-0.5 text-xl md:text-2xl"
			}`}
		>
			{date.getDate()}
		</span>
	</div>
);

/** The single nearest upcoming event, given the stage. */
export const Spotlight = ({
	event,
	onOpenFlyer,
}: {
	event: CalendarEvent;
	onOpenFlyer: (event: CalendarEvent) => void;
}) => (
	<section className="relative mb-16 overflow-hidden rounded-2xl bg-dark-surface-variant ring-1 ring-white/[.12]">
		<div className="relative grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_320px] md:p-10">
			<div className="flex flex-col">
				<span className="text-xs font-semibold uppercase tracking-[0.25em] text-dark-primary">
					Next up · {relativeDay(event.start)}
				</span>

				<h2 className="mt-4 text-3xl font-extrabold leading-[1.05] text-white md:text-5xl [text-wrap:balance]">
					{event.name}
				</h2>

				<div className="mt-6 flex items-center gap-5">
					<DateTile date={event.start} size="lg" />
					<div className="flex flex-col gap-1">
						<span className="text-base font-semibold text-white">
							{formatDay(event.start)}
						</span>
						<span className="text-sm text-white/70">
							{formatTimeRange(event)}
						</span>
						<span className="text-sm text-white/70">
							{event.location || "Location TBA"}
						</span>
					</div>
				</div>

				{event.description && (
					<ExpandableText
						text={event.description}
						lines={5}
						className="mt-6 max-w-prose text-[15px] leading-relaxed text-white/75"
					/>
				)}

				<div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
					<AddToCalendar event={event} />
					<CategoryChip category={event.pointCategory} />
				</div>
			</div>

			<FlyerFrame
				event={event}
				onOpen={() => onOpenFlyer(event)}
				className="aspect-[4/5] w-full shadow-2xl shadow-black/50"
			/>
		</div>
	</section>
);

export const AgendaRow = ({
	event,
	onOpenFlyer,
	showCalendar = true,
}: {
	event: CalendarEvent;
	onOpenFlyer: (event: CalendarEvent) => void;
	showCalendar?: boolean;
}) => (
	// Date | details | flyer at every width; only the column sizes change.
	<li className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-xl py-4 transition-colors duration-200 hover:bg-white/[.03] sm:gap-4 md:gap-6 md:p-4">
		<DateTile date={event.start} />

		<div className="min-w-0">
			<div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
				<h3 className="text-base font-bold leading-snug text-white transition-colors group-hover:text-dark-primary md:text-lg [text-wrap:balance]">
					{event.name}
				</h3>
				<CategoryChip category={event.pointCategory} />
			</div>
			<p className="mt-1.5 text-sm text-white/60">
				{event.start.toLocaleDateString("en-US", { weekday: "long" })} ·{" "}
				{formatTimeRange(event)}
				{event.location && ` · ${event.location}`}
			</p>
			{event.description && (
				<p className="mt-2 line-clamp-3 whitespace-pre-line text-sm text-white/50 md:line-clamp-2">
					{event.description}
				</p>
			)}
			{showCalendar && (
				<div className="mt-3">
					<AddToCalendar event={event} variant="ghost" />
				</div>
			)}
		</div>

		{event.flyerUrl ? (
			<FlyerFrame
				event={event}
				onOpen={() => onOpenFlyer(event)}
				className="aspect-[4/5] w-[72px] md:w-28 lg:w-32"
			/>
		) : (
			<div className="flex aspect-[4/5] w-[72px] items-center justify-center rounded-lg border border-dashed border-white/10 p-2 text-center text-[10px] uppercase leading-tight tracking-[0.15em] text-white/25 md:w-28 lg:w-32">
				No flyer
			</div>
		)}
	</li>
);

export const AgendaSkeleton = () => (
	<ul className="flex flex-col gap-2" aria-busy="true">
		{[0, 1, 2].map((index) => (
			<li
				key={index}
				className="grid animate-pulse grid-cols-[auto_1fr] items-center gap-4 p-3 md:p-4"
			>
				<div className="h-16 w-16 rounded-lg bg-white/10" />
				<div>
					<div className="mb-2 h-5 w-2/3 rounded bg-white/10" />
					<div className="h-4 w-1/2 rounded bg-white/10" />
				</div>
			</li>
		))}
	</ul>
);

/** Groups events by "Month Year", keeping the order they arrive in. */
export const groupByMonth = (events: CalendarEvent[]) => {
	const grouped = new Map<string, CalendarEvent[]>();
	for (const event of events) {
		const key = formatMonth(event.start);
		const bucket = grouped.get(key);
		if (bucket) bucket.push(event);
		else grouped.set(key, [event]);
	}
	return [...grouped.entries()];
};

export const useEvents = () => {
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [status, setStatus] = useState<"loading" | "ready" | "error">(
		"loading",
	);

	useEffect(() => {
		let cancelled = false;
		fetchEvents()
			.then((data) => {
				if (!cancelled) {
					setEvents(data);
					setStatus("ready");
				}
			})
			.catch(() => {
				if (!cancelled) setStatus("error");
			});
		return () => {
			cancelled = true;
		};
	}, []);

	return { events, status };
};
