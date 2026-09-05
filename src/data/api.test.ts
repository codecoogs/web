import { afterEach, describe, expect, it, vi } from "vitest";
import {
	fetchOpportunities,
	fetchResources,
	normalizeOpportunity,
	normalizeResource,
} from "./api";

afterEach(() => {
	vi.unstubAllGlobals();
});

function stubFetch(body: unknown, ok = true, status = 200) {
	const json = vi.fn().mockResolvedValue(body);
	const fetchMock = vi.fn().mockResolvedValue({ ok, status, json });
	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
}

describe("normalizeResource", () => {
	it("maps the API's snake_case columns onto the shape the page renders", () => {
		const got = normalizeResource({
			id: "abc",
			title: "Intro to Cloud Computing",
			category: "Workshops",
			link_url: "https://example.com/a.pdf",
			extension: "pdf",
			thumbnail_url: "https://example.com/t.png",
			resource_date: "2025-02-12",
		});

		expect(got.id).toBe("abc");
		expect(got.name).toBe("Intro to Cloud Computing");
		expect(got.category).toBe("Workshops");
		expect(got.link).toBe("https://example.com/a.pdf");
		expect(got.extension).toBe("pdf");
		expect(got.thumbnailUrl).toBe("https://example.com/t.png");
		// The card renders with toLocaleDateString, so a date-only column must land
		// on the same calendar day locally. Date.parse treats "2025-02-12" as UTC
		// midnight, which renders as the 11th anywhere west of Greenwich.
		expect(got.date?.getFullYear()).toBe(2025);
		expect(got.date?.getMonth()).toBe(1);
		expect(got.date?.getDate()).toBe(12);
		expect(got.date?.toLocaleDateString("en-US")).toBe("2/12/2025");
	});

	// Every column except title/category/link_url is nullable, and the API omits
	// empty strings entirely, so the page must not render "undefined".
	it("defaults the optional columns the API omits", () => {
		const got = normalizeResource({
			id: "abc",
			title: "No extras",
			category: "Workshops",
			link_url: "https://example.com/a.pdf",
		});

		expect(got.extension).toBe("");
		expect(got.thumbnailUrl).toBe("");
		expect(got.date).toBeUndefined();
	});

	it("leaves date undefined when resource_date is unparseable", () => {
		const got = normalizeResource({
			id: "abc",
			title: "Bad date",
			category: "Workshops",
			link_url: "https://example.com/a.pdf",
			resource_date: "not-a-date",
		});

		expect(got.date).toBeUndefined();
	});
});

describe("normalizeOpportunity", () => {
	it("maps the API's columns onto the shape the card renders", () => {
		const got = normalizeOpportunity({
			id: "xyz",
			title: "Officer Intern",
			description: "Work under a director.",
			link_url: "https://forms.gle/abc",
			icon_url: "/assets/opportunities/intern.svg",
			term: "Spring 2026",
		});

		expect(got.id).toBe("xyz");
		expect(got.name).toBe("Officer Intern");
		expect(got.description).toBe("Work under a director.");
		expect(got.applicationLink).toBe("https://forms.gle/abc");
		expect(got.icon).toBe("/assets/opportunities/intern.svg");
		expect(got.year).toBe("Spring 2026");
	});

	it("defaults the optional columns the API omits", () => {
		const got = normalizeOpportunity({ id: "xyz", title: "Bare" });

		expect(got.description).toBe("");
		expect(got.year).toBe("");
		expect(got.applicationLink).toBe("");
		expect(got.icon).toBe("");
	});
});

describe("fetchResources", () => {
	it("requests only the rows flagged for the website", async () => {
		const fetchMock = stubFetch({ success: true, data: [] });

		await fetchResources();

		const url = String(fetchMock.mock.calls[0][0]);
		expect(url).toContain("/resources");
		expect(url).toContain("website_viewable=true");
	});

	it("returns normalized rows", async () => {
		stubFetch({
			success: true,
			data: [
				{
					id: "1",
					title: "A",
					category: "Workshops",
					link_url: "https://example.com/a.pdf",
				},
			],
		});

		const got = await fetchResources();

		expect(got).toHaveLength(1);
		expect(got[0].name).toBe("A");
	});

	// The API omits `data` entirely when a filtered query matches nothing, which
	// is exactly what an empty resources table looks like.
	it("treats a success response with no data as empty", async () => {
		stubFetch({ success: true });
		await expect(fetchResources()).resolves.toEqual([]);
	});

	it("throws when the API reports failure", async () => {
		stubFetch({ success: false, error: { message: "boom" } });
		await expect(fetchResources()).rejects.toThrow("boom");
	});

	it("throws on a non-OK HTTP status", async () => {
		stubFetch({}, false, 500);
		await expect(fetchResources()).rejects.toThrow();
	});

	it("propagates a network failure", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
		await expect(fetchResources()).rejects.toThrow("offline");
	});
});

describe("fetchOpportunities", () => {
	it("requests only the rows flagged for the website", async () => {
		const fetchMock = stubFetch({ success: true, data: [] });

		await fetchOpportunities();

		const url = String(fetchMock.mock.calls[0][0]);
		expect(url).toContain("/opportunities");
		expect(url).toContain("website_viewable=true");
	});

	it("returns normalized rows", async () => {
		stubFetch({
			success: true,
			data: [{ id: "1", title: "Officer Intern", term: "Spring 2026" }],
		});

		const got = await fetchOpportunities();

		expect(got).toHaveLength(1);
		expect(got[0].name).toBe("Officer Intern");
		expect(got[0].year).toBe("Spring 2026");
	});

	it("throws when the API reports failure", async () => {
		stubFetch({ success: false, error: { message: "nope" } });
		await expect(fetchOpportunities()).rejects.toThrow("nope");
	});
});
