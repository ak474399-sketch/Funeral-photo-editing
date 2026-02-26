import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        gold: {
          DEFAULT: "#9c8550",
          light: "#c4a96a",
          muted: "#7a6940",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Noto Serif JP", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        body: ["1.125rem", { lineHeight: "1.75" }],
      },
    },
  },
  plugins: [],
};

export default config;
