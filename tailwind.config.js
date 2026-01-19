import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,

      blue: colors.blue,
      sky: colors.sky,
      green: colors.green,
      red: colors.red,
      amber: colors.amber,
      yellow: colors.yellow,
      purple: colors.purple,
      pink: colors.pink,
    },
  },
  plugins: [],
};
