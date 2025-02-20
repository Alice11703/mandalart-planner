import React from "react";
import { useMandarat } from "../hooks/useMandarat";

type MandaratGridProps = {
  gridData: string[];
};

const MandaratGrid: React.FC<MandaratGridProps> = ({ gridData }) => {
  const { board, updateCell } = useMandarat(gridData);

  return (
    <div className="grid grid-cols-9 gap-1">
      {board.map((cell, index) => (
        <div
          key={index}
          className="w-full h-full bg-white"
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            textRendering: "geometricPrecision",
          }}
        >
          <input
            type="text"
            value={cell}
            onChange={(e) => updateCell(index, e.target.value)}
            className="cell-content w-full h-full p-2 text-center focus:outline-none"
          />
        </div>
      ))}
    </div>
  );
};

export default MandaratGrid;
