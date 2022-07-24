/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
                DEFAULT: "#292929",
                variant: "#121212",
            },
            error: "#cf6679",
        },
        black: "#000000",
        white: "#ffffff",
    },
    screens: {
        "sm": "320px",
        "lg": "1024px",
    },
  },
}
