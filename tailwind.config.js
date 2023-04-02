/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "fem-violet": {
          400: "#7C5DFA",
          300: "#9277FF",
        },
        "fem-blue": {
          200: "#DFE3FA",
          300: "#7E88C3",
          400: "#888EB0",
          500: "#252945",
          600: "#1E2139",
          700: "#141625",
          800: "#0C0E16",
        },
        "fem-light": "#F8F8FB",
        "fem-red": {
          400: "#EC5757",
          300: "#9277FF",
        },
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
          "1.15rem",
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
    },
  },
  plugins: [],
};
