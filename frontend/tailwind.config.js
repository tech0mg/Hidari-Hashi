/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./stc/pages/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}", // Next.jsの主要フォルダ
    "./src/styles/**/*.{css}",        // グローバルCSSの場所
    "./public/**/*.html",             // 必要なら静的HTMLファイルも含む
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
