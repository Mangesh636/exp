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
  conditions: {
    groupSibling: "[role='group'] + &",
    chipSibling: ":where([data-slot='combobox-chip'] + &)",
    inputGroupControl: "[data-slot='input-group']:has([data-slot='input-control'],[data-slot='textarea-control']) &",
    directionRtl: ":dir(rtl) &",
    activeLabel: ":is([role='switch']:active, [data-slot='label']:active, [data-slot='field-label']:active):not([data-disabled]) &",
  },
  theme: {
    extend: {},
  },
  outdir: "styled-system",
});
