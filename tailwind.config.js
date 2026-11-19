/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        editorial: {
          dark: {
            bg: '#17243A',
            surface: '#202F46',
            elevated: '#293A52',
            gold: '#C5A56A',
            goldLight: '#D8C49A',
            text: '#E1E5EB',
            muted: '#C7CED8',
          },
          light: {
            bg: '#FFF9F0',
            surface: '#FFFCF8',
            blue: '#DCEAF4',
            blueBorder: '#CFE3F2',
            blueText: '#5B7C99',
            pink: '#F3DDE3',
            pinkBorder: '#EBCFD8',
            yellow: '#F5E9BE',
            cream: '#FAF0D8',
            text: '#2C2520',
            textBody: '#4A423C',
            muted: '#6E655F',
          }
        }
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseAura: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.7' },
          '50%': { transform: 'scale(1.035) rotate(1.5deg)', opacity: '0.95' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        maskReveal: {
          '0%': { opacity: '0', clipPath: 'inset(12% 0 12% 0)', transform: 'scale(1.03)' },
          '100%': { opacity: '1', clipPath: 'inset(0 0 0 0)', transform: 'scale(1)' },
        }
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 8.5s ease-in-out infinite',
        'spin-slow': 'spinSlow 24s linear infinite',
        'pulse-aura': 'pulseAura 6s ease-in-out infinite',
        'reveal-up': 'revealUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'mask-reveal': 'maskReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      }
    },
  },
  plugins: [],
}
