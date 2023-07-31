/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat-background': 'url(/chat-bg.png)'
      },
      colors: {
        'background': '#dadbd3',
        'white': '#ededed',
        'white-smoke': '#ebe6e6',
        'green': '#0a8d48',
        'gradient-from': '#00d2ff',
        'gradient-to': '#3a7bd5',
        'blue': '#4285F4'
      }
    },
  },
  plugins: [],
}
