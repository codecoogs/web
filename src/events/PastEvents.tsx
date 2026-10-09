import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../common/utils";
import type { CalendarEvent } from "../data/api";
import {
	AgendaRow,
	AgendaSkeleton,
	FlyerLightbox,
	groupByMonth,
	isPast,
	useEvents,
} from "./EventParts";

const PastEvents = () => {
	useTitle("Past Events");

	const { events, status } = useEvents();
	const [openFlyer, setOpenFlyer] = useState<CalendarEvent | null>(null);

	// The API orders oldest first; the archive reads newest first so the most
	// recent months sit at the top.
	const months = useMemo(() => {
		const past = events
			.filter((event) => isPast(event.start))
			.sort((a, b) => b.start.getTime() - a.start.getTime());
		return groupByMonth(past);
	}, [events]);

	const total = months.reduce((sum, [, list]) => sum + list.length, 0);

	return (
		<div className="p-4 text-white">
			<div className="mx-auto mt-8 max-w-5xl">
				<Link
					to="/events"
					className="text-sm font-semibold text-white/60 transition-colors hover:text-dark-primary"
				>
					<span aria-hidden>←</span> Upcoming events
				</Link>

				<div className="mb-10 mt-6">
					<p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-dark-primary">
						Archive
					</p>
					<h1 className="text-3xl font-bold md:text-4xl">Past Events</h1>
					{status === "ready" && total > 0 && (
						<p className="mt-3 text-sm text-white/50">
							{total} event{total === 1 ? "" : "s"} we&apos;ve hosted, most
							recent first.
						</p>
					)}
				</div>

				{status === "loading" && <AgendaSkeleton />}

				{status === "error" && (
					<p className="p-6 text-center text-sm text-white/50">
						We couldn&apos;t load past events right now. Please try again later.
					</p>
				)}

				{status === "ready" && total === 0 && (
					<p className="p-6 text-center text-sm text-white/50">
						No past events to show yet.
					</p>
				)}

				{months.map(([month, monthEvents]) => (
					<section key={month} className="mb-10">
						<h2 className="sticky top-14 z-10 -mx-3 mb-2 flex items-baseline gap-3 bg-dark-surface/90 px-3 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/50 backdrop-blur">
							{month}
							<span className="text-xs font-medium normal-case tracking-normal text-white/30">
								{monthEvents.length} event{monthEvents.length === 1 ? "" : "s"}
							</span>
						</h2>
						<ul className="flex flex-col divide-y divide-white/[.06]">
							{monthEvents.map((event) => (
								<AgendaRow
									key={event.id}
									event={event}
									onOpenFlyer={setOpenFlyer}
									showCalendar={false}
								/>
							))}
						</ul>
					</section>
				))}
			</div>

			<FlyerLightbox event={openFlyer} onClose={() => setOpenFlyer(null)} />
		</div>
	);
};

export default PastEvents;
