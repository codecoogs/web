/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			light: {
				primary: {
					DEFAULT: "#00C6F7",
					variant: "#0077ff",
				},
				surface: {
					DEFAULT: "#f9f9f9",
					variant: "#ffffff",
				},
				error: "#b00020",
			},
			dark: {
				primary: {
					DEFAULT: "#75e4ff",
					variant: "#0077ff",
				},
				surface: {
					DEFAULT: "#121212",
					variant: "#161616",
				},
				error: "#cf6679",
			},
			black: "#000000",
			white: "#f0f0f0",
		},
		screens: {
			sm: "320px",
			md: "768px",
			lg: "1024px",
		},
		fontFamily: {
			custom: ["Fira Code"],
		},
	},
};
