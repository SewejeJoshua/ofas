import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    light: "#3b3bff", // LIGHTER shade for hover/accents, generated
                    DEFAULT: "#0808b2", // PRIMARY
                    dark: "#000080", // DARKER shade
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-plus-jakarta)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
