/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-minmax': 'repeat(auto-fill, minmax(20%, 1fr))',
      },
    },
  },
  plugins: [
  ],
}

