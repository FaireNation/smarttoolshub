const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#f9d1d1',
          300: '#f3a8a8',
          400: '#eb7a7a',
          500: '#7c2d12',
          600: '#5c1a0b',
          700: '#451a03',
          800: '#4c1d00',
          900: '#5c0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#7c2d12",
              foreground: "#ffffff",
            },
            focus: "#7c2d12",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#7c2d12",
              foreground: "#ffffff",
            },
            focus: "#7c2d12",
          },
        },
      },
    }),
    // Removed @tailwindcss/forms as it conflicts with HeroUI input styles
  ],
}