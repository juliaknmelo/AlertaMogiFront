/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      azure: "#F2FDFF",
      tiffany: "#9ad4d6",
      roselight: "#dbcbd8",
      violet: "#564787",
      grey: "#9FA2B2",
      INUNDACAO: "#04357E",
      QUEIMADA: "#960000",
      ALAGAMENTO: "#0561B6",
      "txt-white": "#e2e8f0",
      "grey-p": "#E4E4E4",
      "grey-s": "#939393",
      white: "#FFFFFF",
      black: "#000000",
      silver: "#597081",
    },
    fontFamily: {
      padrão: ["Red Hat Display"],
    },
    extend: {
      backgroundImage: {
        "img-INUNDACAO": "url('./assets/INUNDACAO.jpg')",
        "img-ALAGAMENTO": "url('./assets/ALAGAMENTO.jpg')",
        "img-QUEIMADA": "url('./assets/QUEIMADA.jpg')",
        megaphone: "url('./src/assets/megaphone.png')",
        ilMegaphone: "url('./src/assets/Illustrations-megaphone.png')",
        ilSingin: "url('./src/assets/Illustrations-singin.png')",
      },
    },
  },
  plugins: [],
};
