import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  // Keep Panda's reset enabled for the Next.js application.
  preflight: true,
  // Scan every source tree used by this repository, including shared UI and apps.
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./apps/**/*.{js,jsx,ts,tsx}",
  ],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: "styled-system",
});
