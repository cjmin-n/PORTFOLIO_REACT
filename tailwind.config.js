/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
   
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            { 
                light: {
                    "primary": "#0A84FF", // 밝은 모드의 주요 색상
                    "secondary": "#495057",
                    "accent": "#FF6B6B",
                    "neutral": "#F3F4F6",
                    "base-100": "#F8F9FA", // 배경 색상
                    "base-200": "#f1f3f5", // 카드 배경 색상
                    "base-content": "#212529", // 기본 텍스트 색상
                }
            },
            {
                dark: {
                    "primary": "#0A84FF", // 어두운 모드의 주요 색상
                    "secondary": "#aaa",
                    "accent": "#FF6B6B",
                    "neutral": "#1E1E1E",
                    "base-100": "#121212", // 배경 색상
                    "base-200": "#1E1E1E", // 카드 배경 색상
                    "base-content": "#E5E7EB" // 기본 텍스트 색상
                }
            }
        ]
    }
}

