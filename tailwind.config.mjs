/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          darkGreen: "#0A3428",
          eucalyptus: "#106552",
          burgundy: "#640405",
          linen: "#F9F2E8",
          terracotta: "#C6572A",
          navy: "#2A3354",
        },
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      screens: {
        mobile: "375px",
        tablet: "800px",
        web: "1200px",
      },
    },
  },
  plugins: [],
};
