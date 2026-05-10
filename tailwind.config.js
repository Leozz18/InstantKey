import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    50: '#eef9ff',
                    100: '#d9efff',
                    200: '#bce4ff',
                    300: '#8ed4ff',
                    400: '#59baff',
                    500: '#3b9bff',
                    600: '#2f7fff',
                    700: '#2566eb',
                    800: '#1f53bd',
                    900: '#1d4894',
                },
                accent: {
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(circle at top, var(--tw-gradient-stops))',
                'hero-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(124,58,237,.35) 0%, rgba(15,23,42,0) 70%)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-in',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
        },
    },

    plugins: [forms],
};
