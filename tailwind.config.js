/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "Noto Sans", "system-ui", "sans-serif"],
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      scale: {
        0: "0",
        25: ".25",
        40: ".4",
        50: ".5",
        60: ".6",
        75: ".75",
        80: ".8",
        85: ".85",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2",
      },
      screens: {
        print: { raw: "print" },
      },
      gridTemplateColumns: {
        9: "repeat(9, minmax(0, 1fr))",
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
      },
    },
  },
  safelist: [
    // 동적으로 생성될 수 있는 배경 색상을 추가
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-purple-300",
    "bg-pink-300",
    "bg-teal-300",
    "bg-indigo-300",
    // highlightColor로 사용할 색상들 추가
    // 예시: 'bg-${highlightColor}'
  ],
  plugins: [],
};
