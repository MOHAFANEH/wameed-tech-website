/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#2E2560',
          indigo: '#4B3F9E',
          lilac: '#8B7FE8',
          teal: '#2FD4C4',
          bg: '#F7F6FB',
          ink: '#1A1730',
        },
      },
      fontFamily: {
        comfortaa: ['var(--font-comfortaa)', 'sans-serif'],
        noto: ['var(--font-noto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
