/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6c63ff',
          dark: '#5a52e0',
          light: '#8b85ff',
        },
        accent: '#ff6584',
        accent2: '#43e97b',
        bg: '#050510',
        bgSecondary: '#0a0a1f',
        bgTertiary: '#0d0d2b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'modal-in': 'modalSlideIn 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'tooltip': 'tooltipFadeIn 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}
