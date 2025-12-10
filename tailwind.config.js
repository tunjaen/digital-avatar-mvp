import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    primary: '#315EFF', // Deep Blue
                    soft: '#AFCBFF',    // Soft Blue
                    lavender: '#C8C6FF', // Soft Lavender
                    bg: '#F5F5F7',      // Soft Gray
                    white: '#FFFFFF',
                }
            },
            boxShadow: {
                'premium': '0 4px 20px rgba(0, 0, 0, 0.05)',
                'premium-hover': '0 10px 30px rgba(49, 94, 255, 0.1)',
                'glow': '0 0 15px rgba(175, 203, 255, 0.5)',
            }
        },
    },

    plugins: [forms],
};
