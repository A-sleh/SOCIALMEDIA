/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html","./node_modules/flowbite/**/*.js","./JavaScript/*.js"],
  theme: {
    extend: {
      container : {
        center: true 
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

