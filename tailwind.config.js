/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#7E78D2",
        buttonBg: "#553abd",
        background: "#B6B8D6",
      },
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
        headingFont: ["Kurale"],
      },
    },
  },
  plugins: [],
};
