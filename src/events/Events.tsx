import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../common/utils";
import type { CalendarEvent } from "../data/api";
import {
	AgendaRow,
	AgendaSkeleton,
	FlyerLightbox,
	Spotlight,
	groupByMonth,
	isPast,
	useEvents,
} from "./EventParts";

const PastEventsLink = () => (
	<Link
		to="/events/past"
		className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide text-white/80 ring-1 ring-white/20 transition-all duration-200 hover:text-dark-primary hover:ring-dark-primary"
	>
		Browse past events
		<span aria-hidden>→</span>
	</Link>
);

const Events = () => {
	useTitle("Events");

	const { events, status } = useEvents();
	const [openFlyer, setOpenFlyer] = useState<CalendarEvent | null>(null);

	// The calendar syncs a window that reaches into the past so the club keeps a
	// record; that record lives on /events/past and this page is what's ahead.
	const upcoming = useMemo(
		() => events.filter((event) => !isPast(event.start)),
		[events],
	);

	const next = upcoming[0];
	const months = useMemo(() => groupByMonth(upcoming.slice(1)), [upcoming]);

	return (
		<div className="p-4 text-white">
			<div className="mx-auto mt-8 max-w-5xl">
				<div className="mb-10 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-dark-primary">
							Events
						</p>
						<h1 className="text-3xl font-bold md:text-4xl">Upcoming Events</h1>
					</div>
					<Link
						to="/events/past"
						className="text-sm font-semibold text-white/60 transition-colors hover:text-dark-primary"
					>
						Past events <span aria-hidden>→</span>
					</Link>
				</div>

				{status === "loading" && <AgendaSkeleton />}

				{status === "error" && (
					<p className="p-6 text-center text-sm text-white/50">
						We couldn&apos;t load the events right now. Please try again later.
					</p>
				)}

				{status === "ready" && !next && (
					<div className="flex flex-col items-center gap-6 p-10 text-center">
						<p className="text-sm text-white/50">
							There are no upcoming events right now. Check back soon!
						</p>
						<PastEventsLink />
					</div>
				)}

				{next && <Spotlight event={next} onOpenFlyer={setOpenFlyer} />}

				{months.map(([month, monthEvents]) => (
					<section key={month} className="mb-10">
						<h2 className="sticky top-14 z-10 -mx-3 mb-2 bg-dark-surface/90 px-3 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/50 backdrop-blur">
							{month}
						</h2>
						<ul className="flex flex-col divide-y divide-white/[.06]">
							{monthEvents.map((event) => (
								<AgendaRow
									key={event.id}
									event={event}
									onOpenFlyer={setOpenFlyer}
								/>
							))}
						</ul>
					</section>
				))}

				{next && (
					<div className="mb-8 mt-4 flex flex-col items-center gap-4 border-t border-white/10 pt-10 text-center">
						<p className="text-sm text-white/50">
							Curious what we&apos;ve done before?
						</p>
						<PastEventsLink />
					</div>
				)}
			</div>

			<FlyerLightbox event={openFlyer} onClose={() => setOpenFlyer(null)} />
		</div>
	);
};

export default Events;
