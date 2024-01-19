/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  // plugins: [require("tw-elements-react/dist/plugin.cjs")],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pb" : "url('./assets/bg-pc.jpg')",
      },
        colors: {
        'bg-577CFF': '#577CFF',
        "bottun-pagination": "var(--Blue-linear, linear-gradient(90deg, #1470F5 0%, #388AFF 100%));"
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  }
}

