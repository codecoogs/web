const API_BASE_URL: string =
	import.meta.env.VITE_GOGO_URL ?? "https://api.codecoogs.com/v1";

interface ApiEnvelope<T> {
	success: boolean;
	data?: T[];
	error?: { message: string };
}

interface ApiResource {
	id: string;
	title: string;
	category: string;
	link_url: string;
	description?: string;
	extension?: string;
	thumbnail_url?: string;
	resource_date?: string;
}

interface ApiOpportunity {
	id: string;
	title: string;
	description?: string;
	link_url?: string;
	icon_url?: string;
	term?: string;
}

interface ApiEvent {
	id: number;
	title: string;
	description?: string;
	location?: string;
	start_time: string;
	end_time: string;
	point_category?: string;
	flyer_url?: string;
	status?: string;
}

export interface Resource {
	id: string;
	name: string;
	category: string;
	link: string;
	extension: string;
	thumbnailUrl: string;

	date?: Date;
}

export interface Opportunity {
	id: string;
	name: string;
	description: string;
	icon: string;
	year: string;
	applicationLink: string;
}

export interface CalendarEvent {
	id: number;
	name: string;
	description: string;
	location: string;
	start: Date;
	end?: Date;
	pointCategory: string;
	flyerUrl: string;
	/** All-day events arrive as a bare date, so there is no time to render. */
	allDay: boolean;
}

function parseDate(value?: string): Date | undefined {
	if (!value) {
		return undefined;
	}

	// resource_date is a date column, so it arrives as "YYYY-MM-DD". Date.parse
	// reads that as UTC midnight, which toLocaleDateString then renders a day
	// early anywhere west of Greenwich — build it from local components instead.
	const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

	const date = parts
		? new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))
		: new Date(value);

	return Number.isNaN(date.getTime()) ? undefined : date;
}

export function normalizeResource(resource: ApiResource): Resource {
	return {
		id: resource.id,
		name: resource.title,
		category: resource.category,
		link: resource.link_url,
		extension: resource.extension ?? "",
		thumbnailUrl: resource.thumbnail_url ?? "",
		date: parseDate(resource.resource_date),
	};
}

export function normalizeOpportunity(opportunity: ApiOpportunity): Opportunity {
	return {
		id: opportunity.id,
		name: opportunity.title,
		description: opportunity.description ?? "",
		icon: opportunity.icon_url ?? "",
		year: opportunity.term ?? "",
		applicationLink: opportunity.link_url ?? "",
	};
}

// An all-day event is stored as "YYYY-MM-DD"; a timed one as a full timestamp.
// The distinction decides whether the card shows a time at all, so it has to be
// read before the string is turned into a Date.
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export function normalizeEvent(event: ApiEvent): CalendarEvent {
	const allDay = DATE_ONLY.test(event.start_time);

	return {
		id: event.id,
		name: event.title,
		description: event.description ?? "",
		location: event.location ?? "",
		// parseDate handles the date-only case that would otherwise render a day
		// early west of Greenwich.
		start: parseDate(event.start_time) ?? new Date(Number.NaN),
		end: parseDate(event.end_time),
		pointCategory: event.point_category ?? "",
		flyerUrl: event.flyer_url ?? "",
		allDay,
	};
}

async function get<T>(path: string): Promise<T[]> {
	const response = await fetch(`${API_BASE_URL}${path}`);

	if (!response.ok) {
		throw new Error(`Request to ${path} failed with ${response.status}`);
	}

	const envelope: ApiEnvelope<T> = await response.json();

	if (!envelope.success) {
		throw new Error(envelope.error?.message ?? `Request to ${path} failed`);
	}

	// The API omits `data` rather than returning an empty array when nothing matches.
	return envelope.data ?? [];
}

export async function fetchResources(): Promise<Resource[]> {
	const resources = await get<ApiResource>(
		"/resources?website_viewable=true&is_active=true",
	);

	return resources.map(normalizeResource);
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
	const opportunities = await get<ApiOpportunity>(
		"/opportunities?website_viewable=true&is_active=true",
	);

	return opportunities.map(normalizeOpportunity);
}

export async function fetchEvents(): Promise<CalendarEvent[]> {
	// is_public is the officer-controlled gate, and cancelled events stay in the
	// table so the calendar sync can record the cancellation — neither belongs
	// on the page. The API already orders by start_time.
	const events = await get<ApiEvent>("/events?is_public=true&status=scheduled");

	return events.map(normalizeEvent);
}
