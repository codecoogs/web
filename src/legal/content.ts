import privacyPolicy from "./content/privacy-policy.md?raw";
import termsOfService from "./content/terms-of-service.md?raw";

export interface LegalDocument {
	slug: string;
	title: string;
	description: string;
	content: string;
}

export const legalDocuments: LegalDocument[] = [
	{
		slug: "privacy-policy",
		title: "Privacy Policy",
		description: "How we collect, use, and protect your data",
		content: privacyPolicy,
	},
	{
		slug: "terms-of-service",
		title: "Terms of Service",
		description: "The rules and terms for using CodeCoogs",
		content: termsOfService,
	},
];
