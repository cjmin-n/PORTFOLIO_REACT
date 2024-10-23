/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // screens: {
                
            // },
            colors: {
                point: '#FDF9CF',
                borderColor: 'rgba(255,255,255,0.4)',
                gray: '#aaa',
                darkGray: '#313130',
                black: '#222',
            }
        },
    },
    plugins: [
        require('daisyui'),
    ],
}

