/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FFFBF5',
          100: '#FDF6EC',
          200: '#F8ECD8',
        },
        ember: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        ink: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(124, 45, 18, 0.08)',
        'glass-lg': '0 20px 60px -10px rgba(124, 45, 18, 0.18)',
        'card': '0 4px 24px -4px rgba(124, 45, 18, 0.08), 0 2px 8px -2px rgba(124, 45, 18, 0.04)',
        'card-hover': '0 20px 50px -12px rgba(249, 115, 22, 0.25), 0 8px 16px -4px rgba(124, 45, 18, 0.08)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 50%, #FDBA74 100%)',
        'gradient-ember': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'gradient-mesh': 'radial-gradient(at 20% 20%, #FED7AA 0px, transparent 50%), radial-gradient(at 80% 30%, #FDBA74 0px, transparent 50%), radial-gradient(at 50% 80%, #F8ECD8 0px, transparent 50%)',
        'gradient-mesh-dark': 'radial-gradient(at 20% 20%, rgba(249, 115, 22, 0.18) 0px, transparent 50%), radial-gradient(at 80% 30%, rgba(234, 88, 12, 0.12) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(124, 45, 18, 0.2) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 18s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 30px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};
