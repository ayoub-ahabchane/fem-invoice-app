/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "fem-violet": {
          400: "#7C5DFA",
          300: "#9277FF",
        },
        "fem-blue": {
          100: "#F9FAFE",
          200: "#DFE3FA",
          300: "#7E88C3",
          400: "#888EB0",
          500: "#252945",
          600: "#373B53",
          700: "#1E2139",
          800: "#141625",
          900: "#0C0E16",
        },
        "fem-light": "#F8F8FB",
        "fem-red": {
          400: "#EC5757",
          300: "#FF9797",
        },
        "fem-orange": "#FF8F00",
        "fem-green": "#33D69F",
        "fem-muted": "#373B53",
      },
      boxShadow: {
        soft: "0px 10px 10px -10px rgba(72, 84, 159, 0.100397)",
      },
      fontFamily: {
        sans: ['"League Spartan"'],
      },
      fontSize: {
        "heading-l": [
          "2.25rem",
          {
            fontWeight: "700",
            lineHeight: "0.91em",
            letterSpacing: "-0.027em",
          },
        ],
        "heading-m": [
          "1.5rem",
          {
            fontWeight: "700",
            lineHeight: "0.91em",
            letterSpacing: "-0.031em",
          },
        ],
        "heading-s": [
          "0.9375rem",
          { fontWeight: "700", lineHeight: "1.6em", letterSpacing: "-0.01em" },
        ],
        "heading-s-variant": [
          "0.9375rem",
          { fontWeight: "700", lineHeight: "1em", letterSpacing: "-0.01em" },
        ],
        body: [
          "0.8125rem",
          {
            fontWeight: "500",
            lineHeight: "1.38em",
            letterSpacing: "-0.007em",
          },
        ],
        "body-v": [
          "0.8125rem",
          {
            fontWeight: "500",
            lineHeight: "1.15em",
            letterSpacing: "-0.019em",
          },
        ],
      },
      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(80px) scale(1)",
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px) scale(0.95)",
            opacity: 0,
          },
        },
        slideDown: {
          "0%": {
            transform: "translateY(0px)scale(0.95) ",
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            transform: "translateY(80px) scale(1)",
            opacity: 1,
          },
        },
      },
      animation: {
        fadeOutUp: "slideUp 0.3s ease-out forwards",
        fadeInDown: "slideDown 0.3s ease-out forwards",
      },
      backgroundImage: {
        logo: "url('/src/assets/logo.svg')",
      },
    },
  },
  plugins: [],
};
