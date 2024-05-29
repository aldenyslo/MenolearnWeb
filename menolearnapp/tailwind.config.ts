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
        grey: {
          100: "#F4F8FF",
        },
        blue: {
          100: "#8DC2FF",
          200: "#6EABF4",
          250: "#C6D9F8",
          300: "#65AAFA",
          400: "#45618E",
          500: "#A7B7D0",
          800: "#182B49",
        },
        purple: {
          200: "#CAC0F2",
          400: "#6A6CDE",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
