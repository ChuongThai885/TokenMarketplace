/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "default-dark-blue": "#2E7DAF",
        "default-light-blue": "#F2F6FF",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
