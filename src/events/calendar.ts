import type { CalendarEvent } from "../data/api";

const HOUR = 60 * 60 * 1000;

// An end time is only trusted when it lands after the start and within a day of
// it; anything else gets a one-hour slot so the calendar entry stays sensible.
export function eventEnd(event: CalendarEvent): Date | undefined {
	if (event.allDay) return undefined;
	const end = event.end;
	const valid =
		end &&
		end.getTime() > event.start.getTime() &&
		end.getTime() - event.start.getTime() <= 24 * HOUR;
	return valid ? end : undefined;
}

const pad = (value: number) => String(value).padStart(2, "0");

// 20261008T223000Z
const toUtcStamp = (date: Date) =>
	`${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(
		date.getUTCHours(),
	)}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;

// 20261008, for all-day events
const toDateStamp = (date: Date) =>
	`${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;

function calendarRange(event: CalendarEvent): [string, string] {
	if (event.allDay) {
		const next = new Date(event.start);
		next.setDate(next.getDate() + 1);
		return [toDateStamp(event.start), toDateStamp(next)];
	}
	const end = eventEnd(event) ?? new Date(event.start.getTime() + HOUR);
	return [toUtcStamp(event.start), toUtcStamp(end)];
}

export function googleCalendarUrl(event: CalendarEvent): string {
	const [start, end] = calendarRange(event);
	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: event.name,
		dates: `${start}/${end}`,
		details: event.description,
		location: event.location,
	});
	return `https://calendar.google.com/calendar/render?${params}`;
}

// RFC 5545 text values escape backslashes, semicolons, commas and newlines.
const escapeIcs = (value: string) =>
	value
		.replace(/\\/g, "\\\\")
		.replace(/;/g, "\\;")
		.replace(/,/g, "\\,")
		.replace(/\r?\n/g, "\\n");

/** Builds a single-event .ics file and hands it to the browser to save. */
export function downloadIcs(event: CalendarEvent) {
	const [start, end] = calendarRange(event);
	const dateLine = event.allDay
		? [`DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`]
		: [`DTSTART:${start}`, `DTEND:${end}`];

	const ics = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//Code Coogs//Events//EN",
		"CALSCALE:GREGORIAN",
		"BEGIN:VEVENT",
		`UID:codecoogs-event-${event.id}@codecoogs.com`,
		`DTSTAMP:${toUtcStamp(new Date())}`,
		...dateLine,
		`SUMMARY:${escapeIcs(event.name)}`,
		event.location && `LOCATION:${escapeIcs(event.location)}`,
		event.description && `DESCRIPTION:${escapeIcs(event.description)}`,
		"END:VEVENT",
		"END:VCALENDAR",
	]
		.filter(Boolean)
		.join("\r\n");

	const url = URL.createObjectURL(
		new Blob([ics], { type: "text/calendar;charset=utf-8" }),
	);
	const link = document.createElement("a");
	link.href = url;
	link.download = `${event.name.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "")}.ics`;
	link.click();
	URL.revokeObjectURL(url);
}
