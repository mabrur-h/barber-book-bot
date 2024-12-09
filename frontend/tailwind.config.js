/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#475569',
        dark: '#222831',
        darkGrey: '#393E46',
        neonYellow: '#FFD369',
        lightGrey: '#EEEEEE',
        darkRGB: 'rgb(34, 40, 49)',
        greyRGB: 'rgb(57, 62, 70)',
        neonYellowRGB: 'rgb(255, 211, 105)',
        lightGreyRGB: 'rgb(238, 238, 238)',
      },
    },
  },
  plugins: [],
}
