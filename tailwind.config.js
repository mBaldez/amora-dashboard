/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F1A",
        card: "#1A1A2E",
        sidebar: "#12121F",
        primary: "#7C3AED",
        secondary: "#3B82F6",
        success: "#10B981",
        warning: "#F59E0B",
        info: "#6366F1",
        foreground: "#F1F5F9",
        muted: "#94A3B8",
        border: "#2D2D45"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
