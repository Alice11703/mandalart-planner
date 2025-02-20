import React from "react";
import MandaratCell from "./MandaratCell";
import classNames from "classnames";
import { useMandarat } from '../hooks/useMandarat';

type MandaratGridProps = {
  gridData: string[];
  completedCells: boolean[];
  onCellClick: (index: number, event: React.MouseEvent) => void;
  highlightColor: string;
  selectedIndex: number | null;
  isCapturing: boolean;
};

const MandaratGrid = () => {
  const { board, updateCell } = useMandarat(Array(81).fill(''));

  return (
    <div className="grid grid-cols-9 gap-1">
      {board.map((cell, index) => (
        <div 
          key={index}
          className="w-full h-full bg-white"
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            textRendering: 'geometricPrecision'
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
