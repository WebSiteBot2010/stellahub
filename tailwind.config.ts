import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0a0b0f",
          surface: "#111318",
          card: "#151820",
          border: "#1e2330",
          accent: "#5865f2",
          cyan: "#00d4ff",
          purple: "#7c3aed",
          pink: "#ec4899",
          green: "#22c55e",
          red: "#ef4444",
          text: "#e2e8f0",
          muted: "#64748b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-accent": "radial-gradient(ellipse at center, rgba(88,101,242,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
