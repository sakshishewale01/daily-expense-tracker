/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#b8c9ff',
          300: '#8fa6ff',
          400: '#6b82f5',
          500: '#4c5fe0',
          600: '#3a47c0',
          700: '#2f3a9c',
          800: '#282f78',
          900: '#232a5e'
        },
        accent: {
          50: '#effcf6',
          100: '#d7f7e8',
          200: '#b1efd3',
          300: '#7ee0b8',
          400: '#48c99a',
          500: '#25ab7e',
          600: '#188966',
          700: '#156d54',
          800: '#145745',
          900: '#12483a'
        },
        surface: {
          light: '#f7f8fc',
          dark: '#0f1220'
        }
      },
      boxShadow: {
        soft: '0 2px 8px 0 rgba(30, 41, 59, 0.06), 0 1px 2px 0 rgba(30, 41, 59, 0.04)',
        card: '0 4px 24px -2px rgba(30, 41, 59, 0.08), 0 2px 8px -2px rgba(30, 41, 59, 0.06)',
        glow: '0 0 0 1px rgba(76, 95, 224, 0.1), 0 8px 24px -4px rgba(76, 95, 224, 0.25)'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pop-in': 'popIn 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: []
};
