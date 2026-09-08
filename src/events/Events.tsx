import { useEffect, useMemo, useState } from "react";
import { useTitle } from "../common/utils";
import { type CalendarEvent, fetchEvents } from "../data/api";

const cardStyle =
	"flex flex-col bg-dark-surface-variant rounded text-white p-6 ring-1 ring-white/[.15]";

// Mirrors an event card's footprint so the list does not jump when it arrives.
const EventSkeleton = () => (
	<li className={`${cardStyle} animate-pulse`}>
		<div className="w-1/3 h-4 mb-3 rounded bg-white/10" />
		<div className="w-2/3 h-6 mb-3 rounded bg-white/10" />
		<div className="w-1/2 h-4 rounded bg-white/10" />
	</li>
);

const formatDay = (date: Date) =>
	date.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

const formatTime = (date: Date) =>
	date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

const formatMonth = (date: Date) =>
	date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const EventCard = ({ event }: { event: CalendarEvent }) => {
	const when = event.allDay
		? `${formatDay(event.start)} · All day`
		: `${formatDay(event.start)} · ${formatTime(event.start)}${
				event.end ? ` – ${formatTime(event.end)}` : ""
			}`;

	return (
		<li className={cardStyle}>
			<span className="text-dark-primary text-sm font-bold">{when}</span>

			<h3 className="text-xl font-bold mt-1">{event.name}</h3>

			{event.location && (
				<span className="text-white/70 text-sm mt-1">{event.location}</span>
			)}

			{event.description && (
				<p className="text-white/80 text-sm mt-3">{event.description}</p>
			)}

			{event.pointCategory && (
				<span className="text-white/50 text-xs mt-3">
					{event.pointCategory}
				</span>
			)}

			{event.flyerUrl && (
				<img
					src={event.flyerUrl}
					alt={`Flyer for ${event.name}`}
					className="rounded mt-4"
					loading="lazy"
				/>
			)}
		</li>
	);
};

const Events = () => {
	useTitle("Events");

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
				if (!cancelled) {
					setStatus("error");
				}
			});

		return () => {
			cancelled = true;
		};
	}, []);

	// The calendar syncs a window that reaches into the past so the club keeps a
	// record, but the page is about what is coming up.
	const upcoming = useMemo(() => {
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);

		return events.filter((event) => event.start >= startOfToday);
	}, [events]);

	// The API already orders by start_time, so grouping in a single pass keeps
	// the months in order without re-sorting.
	const months = useMemo(() => {
		const grouped = new Map<string, CalendarEvent[]>();

		for (const event of upcoming) {
			const key = formatMonth(event.start);
			const bucket = grouped.get(key);

			if (bucket) {
				bucket.push(event);
			} else {
				grouped.set(key, [event]);
			}
		}

		return [...grouped.entries()];
	}, [upcoming]);

	return (
		<div className="p-4 text-white">
			<h1 className="text-3xl font-bold text-center mt-8">Upcoming Events</h1>

			<div className="max-w-3xl mx-auto mt-8">
				{status === "loading" && (
					<ul className="grid grid-cols-1 gap-4" aria-busy="true">
						{[0, 1, 2].map((index) => (
							<EventSkeleton key={index} />
						))}
					</ul>
				)}

				{status === "error" && (
					<p className="text-center text-white/50 text-sm p-6">
						We couldn&apos;t load the events right now. Please try again later.
					</p>
				)}

				{status === "ready" && months.length === 0 && (
					<p className="text-center text-white/50 text-sm p-6">
						There are no upcoming events right now — check back soon.
					</p>
				)}

				{months.map(([month, monthEvents]) => (
					<section key={month} className="mb-8">
						<h2 className="text-lg font-bold text-white/60 mb-3">{month}</h2>

						<ul className="grid grid-cols-1 gap-4">
							{monthEvents.map((event) => (
								<EventCard key={event.id} event={event} />
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	);
};

export default Events;
