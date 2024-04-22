import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // fontFamily: {
    //   sans: ["Inter", "sans-serif"],
    // },
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          500: "#0F405D",
          400: "#C34175",
        },
        secondary: {
          600: "#321C1C",
          200: "#FFFCF9",
          400: "#D9D9D9",
          300: "#EEEEEE",
        },
      },
      fontFamily: {
        volkhov: ["var(--font-volkhov)", "serif"],
        josefin_sans: [
          "var(--font-josefin-sans)",
          "sans-serif",
        ],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
