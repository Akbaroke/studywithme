import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mantineBlue: '#228be6',
      },
      fontFamily: {
        sans: ['var(--font-gt-walsheim)'],
      },
    },
  },
  plugins: [],
};
export default config;
