import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF2E93',
          50: '#FFE6F3',
          100: '#FFCCE7',
          200: '#FF99CF',
          300: '#FF66B7',
          400: '#FF3D9F',
          500: '#FF2E93',
          600: '#DB1476',
          700: '#A80F5C',
          800: '#750A40',
          900: '#420524',
          950: '#20030F',
        },
        petreceri: {
          DEFAULT: '#FF2E93',
          light: '#FF6FB5',
          dark: '#B8005F',
        },
        playground: {
          DEFAULT: '#0057FF',
          light: '#3F86FF',
          dark: '#001A66',
          navy: '#0A1032',
        },
        afterschool: {
          DEFAULT: '#2CA0FF',
          light: '#E8F5FF',
          dark: '#0B4E8F',
        },
        arenamobila: {
          DEFAULT: '#00C2B2',
          light: '#5CEBDD',
          dark: '#00463F',
          navy: '#0A1032',
        },
        /** Neon palette sampled directly from the Arena Play venue footage. */
        neon: {
          cyan: '#00D9F5',
          'cyan-soft': '#7ADCE8',
          magenta: '#F13FD0',
          'magenta-soft': '#E58ED6',
          violet: '#8B44E5',
          'violet-soft': '#A98BE5',
          blue: '#3D5AFF',
        },
        void: {
          DEFAULT: '#05060A',
          800: '#0A0C14',
          700: '#11141F',
          600: '#1A1E2E',
        },
        ink: {
          50: '#F6F7FB',
          100: '#EDEFF7',
          200: '#D7DBEA',
          300: '#B3BAD3',
          400: '#8A93B5',
          500: '#666F96',
          600: '#4E5678',
          700: '#3A4160',
          800: '#262B44',
          900: '#14172A',
          950: '#0A0C17',
        },
      },
      fontFamily: {
        display: ['"Oxanium"', 'system-ui', 'sans-serif'],
        heading: ['"Exo 2"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.875rem, 3.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        soft: '0 2px 8px 0 rgb(20 23 42 / 0.04), 0 8px 24px -4px rgb(20 23 42 / 0.06)',
        card: '0 4px 16px -2px rgb(20 23 42 / 0.08), 0 12px 32px -8px rgb(20 23 42 / 0.10)',
        lift: '0 12px 32px -6px rgb(20 23 42 / 0.16), 0 24px 48px -12px rgb(20 23 42 / 0.18)',
        glow: '0 0 0 1px rgb(255 255 255 / 0.06), 0 8px 40px -4px rgb(255 46 147 / 0.35)',
        'neon-cyan': '0 0 0 1px rgb(0 217 245 / 0.35), 0 0 24px -2px rgb(0 217 245 / 0.55), 0 0 64px -8px rgb(0 217 245 / 0.35)',
        'neon-magenta': '0 0 0 1px rgb(241 63 208 / 0.35), 0 0 24px -2px rgb(241 63 208 / 0.55), 0 0 64px -8px rgb(241 63 208 / 0.35)',
        'neon-violet': '0 0 0 1px rgb(139 68 229 / 0.35), 0 0 24px -2px rgb(139 68 229 / 0.55), 0 0 64px -8px rgb(139 68 229 / 0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      containers: {},
    },
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '2rem', lg: '2.5rem', xl: '3rem' },
    },
  },
  plugins: [],
} satisfies Config;
