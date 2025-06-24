export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Soft purple
          hover: '#7C3AED',
        },
        background: {
          DEFAULT: '#1A1B1E', // Dark background
          lighter: '#2A2B2E',
        },
        accent: {
          DEFAULT: '#F0ABFC', // Soft pink
          muted: '#E879F9',
        }
      }
    },
  },
  plugins: [],
}