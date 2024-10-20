/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#4A90E2",
        secondary: "#50E3C2",
        accent: "#F5A623",
        background: "#F7F9FC",
        text: "#333333",
        muted: "#B0BEC5",
      },
    },
  },
  variants: {},
  plugins: [],
};
