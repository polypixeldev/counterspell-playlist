import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        sky: "#90A8E1",
        board: "#1D1D1D",
        pink: "#FF4186",
        blue: "#41DDFF",
      },
      fontFamily: {
        display: "var(--font-jersey)",
      },
    },
  },
};
export default config;
