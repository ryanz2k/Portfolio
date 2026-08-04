/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff0f2',
          100: '#ffd6db',
          200: '#ffadb8',
          300: '#ff7a8a',
          400: '#ff3d55',
          500: '#FF2244',
          600: '#e0001d',
          700: '#b50018',
          800: '#8a0013',
          900: '#5c000d',
        },
        accent: {
          300: '#fff176',
          400: '#FFE800',
          500: '#FFE000',
          600: '#e6c900',
        },
        arcade: {
          bg:    '#0a0a0a',
          card:  '#111111',
          border:'#FF2244',
          dim:   '#1a1a1a',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono:  ['"Share Tech Mono"', 'monospace'],
      },
      keyframes: {
        glitch1: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%':      { transform: 'translate(-2px, 2px)' },
          '40%':      { transform: 'translate(2px, -2px)' },
          '60%':      { transform: 'translate(-1px, 1px)' },
          '80%':      { transform: 'translate(1px, -1px)' },
        },
        glitch2: {
          '0%, 100%': { transform: 'translate(0)', opacity: '1' },
          '30%':      { transform: 'translate(3px, 0)',  opacity: '0.8' },
          '60%':      { transform: 'translate(-3px, 0)', opacity: '0.8' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.85' },
          '75%':      { opacity: '0.95' },
        },
        scanline: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(255,34,68,0.4)' },
          '50%':      { boxShadow: '0 0 20px 6px rgba(255,34,68,0.7)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        glitch:       'glitch1 0.6s steps(1) infinite, glitch2 0.8s steps(1) infinite',
        flicker:      'flicker 4s ease-in-out infinite',
        blink:        'blink 1s step-end infinite',
        'slide-left': 'slideInLeft 0.5s ease forwards',
        'slide-right':'slideInRight 0.5s ease forwards',
        'fade-up':    'fadeUp 0.6s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'scanlines': "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      },
    },
  },
  plugins: [],
}
