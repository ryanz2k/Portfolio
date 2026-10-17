/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Persona 5 lives on three colours: a hot red, true black and paper white.
      // Everything else is a shade of those.
      colors: {
        p5: {
          red:    '#E60012',
          bright: '#FF2A3D',
          blood:  '#8C000B',
          black:  '#0A0A0A',
          ink:    '#000000',
          coal:   '#161616',
          paper:  '#F5F2EA',
          white:  '#FFFFFF',
          gray:   '#9A9A9A',
        },
      },
      fontFamily: {
        // Tall condensed display face for headings and menu items.
        display: ['Anton', 'Impact', 'sans-serif'],
        // Chunky face mixed into ransom-note lettering.
        heavy:   ['"Archivo Black"', 'Arial Black', 'sans-serif'],
        // Italic condensed face for UI labels.
        cond:    ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        body:    ['Barlow', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // Tiny jitter, like the selected item in a P5 menu.
        jitter: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%':      { transform: 'translate(-1px, 1px) rotate(-0.6deg)' },
          '50%':      { transform: 'translate(1px, -1px) rotate(0.4deg)' },
          '75%':      { transform: 'translate(-1px, -1px) rotate(-0.3deg)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseRed: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.55' },
        },
      },
      animation: {
        jitter:      'jitter 0.35s steps(2) infinite',
        'spin-slow': 'spinSlow 60s linear infinite',
        'spin-mid':  'spinSlow 18s linear infinite',
        float:       'floatY 4s ease-in-out infinite',
        'pulse-red': 'pulseRed 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
