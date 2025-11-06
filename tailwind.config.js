/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ให้สแกนไฟล์ทั้งหมดใน src
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // เพิ่ม font 'inter' 
      }
    },
  },
  plugins: [],
}