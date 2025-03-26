/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#00A1A9',
          600: '#00A1A9',
          900: '#008080',
          oscuro: '#1a4e51',
          oscuroHover: '#173537',
          header: '#202C33'
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
}

