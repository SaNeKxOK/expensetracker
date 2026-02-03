/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          income: {
            DEFAULT: '#10B981',
            light: '#D1FAE5',
            dark: '#059669',
          },
          expense: {
            DEFAULT: '#EF4444',
            light: '#FEE2E2',
            dark: '#DC2626',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['Fira Code', 'Consolas', 'monospace'],
        },
        animation: {
          'slide-in': 'slideIn 0.2s ease-out',
          'slide-out': 'slideOut 0.2s ease-out forwards',
          'fade-in': 'fadeIn 0.15s ease-out',
        },
        keyframes: {
          slideIn: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideOut: {
            '0%': { opacity: '1', transform: 'translateX(0)' },
            '100%': { opacity: '0', transform: 'translateX(100%)' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  }