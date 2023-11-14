/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Helvetica Neue', 'Roboto']
      },
      colors: {
        darkbg: '#240046',
        highlighttext: '#ff6d00',
        currentTextColor: 'var(--main-text-colour)'
      },
      gridTemplateRows: {
        '9': 'repeat(9, minmax(0, 1fr))'
      },
      gridTemplateColumns: {
        '25': 'repeat(25, minmax(0, 1fr))'
      },
      gridColumn: {
        'span-15': 'span 15 / span 15'
      },
      gridColumnStart: {
        '17': '17',
        '21': '21',
        '25': '25'
      }

    },
  },
  plugins: [],
}

