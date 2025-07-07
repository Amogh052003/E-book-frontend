/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#FF0000",
          black: "#0F0F0F",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
