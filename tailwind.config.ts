import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/public/backgraund.svg.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      blur:{
        '2': '2px',
        '5': '5px',
        '10': '10px',
        '15': '15px',
        '20': '20px',
        '25': '25px',
      },
      boxShadow:{
        'right ': '10px 0 15px -3px ',

      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'cores_externas': {
          1:'#ED7D6D',
          2:'#EDAA6D',
          3:'#ED946D',
          4:'#ED6D83',
          5:'#ED6D83',
          6:'#8c4c8c',
        }
      },
    },
  },
  plugins: [],
};
export default config;
