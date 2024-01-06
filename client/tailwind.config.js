/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        bungee: ["Bungee Spice"],
        Chivo: ["Chivo Mono"],
        Diplomata: ["Diplomata SC"],
        Fira: ["Fira Code"],
        Inconsolata: ["Inconsolata"],
        JetBrains: ["JetBrains Mono"],
        Kanit: ["Kanit"],
        Belle: ["La Belle Aurore"],
        Lato: ["Lato"],
        Martian: ["Martian Mono"],
        Montserrat: ["Montserrat"],
        Nanum: ["Nanum Gothic"],
        Nerko: ["Nerko One"],
        Nunito: ["Nunito"],
        NunitoSans: ["Nunito Sans"],
      },
    },
  },
  plugins: [],
};
