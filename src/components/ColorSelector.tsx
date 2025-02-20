interface ColorSelectorProps {
  highlightColor: string;
  setHighlightColor: (color: string) => void;
}

// const colorMap: { [key: string]: string } = {
//   "bg-yellow-300": "#fde047",
//   "bg-blue-300": "#93c5fd",
//   "bg-red-300": "#fca5a5",
//   "bg-purple-300": "#d8b4fe",
//   "bg-green-300": "#86efac",
//   "bg-teal-300": "#5eead4",
//   "bg-pink-300": "#f9a8d4",
//   "bg-indigo-300": "#a5b4fc",
// };

export default function ColorSelector({
  highlightColor,
  setHighlightColor,
}: ColorSelectorProps) {
  return (
    <div className="flex items-center section__color">
      <label className="mr-2 font-bold">색상 선택:</label>
      <select
        value={highlightColor}
        onChange={(e) => setHighlightColor(e.target.value)}
        className="border p-2 w-24"
      >
        <option value="bg-yellow-300">노랑</option>
        <option value="bg-blue-300">파랑</option>
        <option value="bg-red-300">빨강</option>
        <option value="bg-purple-300">보라</option>
        <option value="bg-green-300">초록</option>
        <option value="bg-teal-300">틸</option>
        <option value="bg-pink-300">핑크</option>
        <option value="bg-indigo-300">인디고</option>
      </select>
    </div>
  );
}
