// One-off import of the generated static resource list into the resources API.
//
//   node scripts/import-resources.ts --dry
//   API=http://localhost:3002/v1 node scripts/import-resources.ts
//
// Names in the static file carry their date and file extension inline, e.g.
// "Intro to Cloud Computing (02.12.2025).pdf". The table stores those as
// resource_date and extension, so they are split out here rather than left in
// the title.

import { resources } from "../src/data/resources.ts";

const API = process.env.API ?? "http://localhost:3002/v1";
const dryRun = process.argv.includes("--dry");

const DATE_IN_NAME = /\((\d{1,2})\.(\d{1,2})\.(\d{4})\)/;

function splitName(name: string): { title: string; date?: string } {
	const match = name.match(DATE_IN_NAME);

	let title = name;
	let date: string | undefined;

	if (match) {
		const [, month, day, year] = match;
		date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
		title = title.replace(match[0], "");
	}

	// Drop a trailing file extension, and any doubled one ("....pdf.pdf").
	title = title.replace(/(\.[a-z0-9]{2,6})+\s*$/i, "");

	return { title: title.replace(/\s+/g, " ").trim(), date };
}

const rows = resources.map((resource, index) => {
	const { title, date } = splitName(resource.name);

	return {
		title,
		category: resource.category,
		link_url: resource.link,
		extension: resource.extension,
		thumbnail_url: resource.thumbnailUrl || undefined,
		resource_date: date,
		display_order: index,
		website_viewable: true,
	};
});

if (dryRun) {
	for (const row of rows) {
		console.log(
			`${(row.resource_date ?? "no date").padEnd(12)} ${row.category.padEnd(15)} ${row.title}`,
		);
	}
	console.log(`\n${rows.length} rows would be created (dry run, nothing sent)`);
	process.exit(0);
}

let created = 0;
let failed = 0;

for (const row of rows) {
	const response = await fetch(`${API}/resources`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(row),
	});
	const body = await response.json();

	if (response.ok && body.success) {
		created++;
	} else {
		failed++;
		console.error(
			`FAILED ${row.title}: ${response.status} ${JSON.stringify(body)}`,
		);
	}
}

console.log(`created ${created}, failed ${failed}`);
