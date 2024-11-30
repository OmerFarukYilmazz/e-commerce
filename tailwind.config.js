/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans serif"],
      },
      colors: {
        headerDark: '#252B42',
        secondary: '#202A44',
        heroBonus: '#977DF4',
      },
    },
  },
  plugins: [],
}