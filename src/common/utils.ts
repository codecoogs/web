import { useEffect } from "react";
import type { Resource } from "../data/resources";

export function useTitle(title: string) {
	useEffect(() => {
		document.title = title;
	}, [title]);
}

export function getDateFromResourceName(resource: Resource) {
	if (resource.date !== undefined) {
		return resource.date;
	}

	// Matches for date in name in format (00.00.00)
	const regex = /\((\d+)\.(\d+)\.(\d+)\)/;
	const match = resource.name.match(regex)?.slice(1);

	const dateParts = match?.map((value) => Number.parseInt(value));
	let date: Date | undefined;

	if (dateParts?.every((value) => value !== undefined)) {
		date = new Date(dateParts[2], dateParts[0], dateParts[1], 0, 0, 0);
	}

	if (match) {
		resource.date = date;
		resource.name = resource.name.slice(
			0,
			resource.name.indexOf(match[0]) - match[0].length,
		);
	}

	return date;
}
