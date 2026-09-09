/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f7',
          100: '#d4dde8',
          200: '#a9bbd1',
          300: '#7e99ba',
          400: '#5377a3',
          500: '#2d5a8e',
          600: '#1e3a5f',
          700: '#162c48',
          800: '#0f1e31',
          900: '#07101a',
        },
        brand: {
          blue: '#2563eb',
          lightblue: '#3b82f6',
        },
        status: {
          pending: '#f59e0b',
          verified: '#16a34a',
          rejected: '#dc2626',
          expired: '#6b7280',
          info: '#2563eb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

