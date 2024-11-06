import { withUt } from "uploadthing/tw";
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = withUt({
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [typography],
});

export default config;
