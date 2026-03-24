import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#090b10",
        panel: "#11151c",
        brand: "#00d4ff"
      }
    }
  },
  plugins: []
};

export default config;
