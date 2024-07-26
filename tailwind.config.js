/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./views/**/*.{html,js,ejs}", ],
    theme: {
        extend: {
            colors: {
                LightBlack: '#31363F'
            }

        },
    },
    plugins: [],
}