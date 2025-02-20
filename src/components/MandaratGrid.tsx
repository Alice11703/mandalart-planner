import React from "react";
import MandaratCell from "./MandaratCell";
import classNames from "classnames";

type MandaratGridProps = {
  gridData: string[];
  completedCells: boolean[];
  onCellClick: (index: number, event: React.MouseEvent) => void;
  highlightColor: string;
  selectedIndex: number | null;
  isCapturing: boolean;
};

export default function MandaratGrid({
  gridData,
  completedCells,
  onCellClick,
  highlightColor,
  selectedIndex,
  isCapturing,
}: MandaratGridProps) {
  const groupedCells = Array.from({ length: 9 }, (_, groupIndex) =>
    gridData.slice(groupIndex * 9, groupIndex * 9 + 9),
  );

  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-200 p-1 w-full max-w-[900px] mx-auto">
      {groupedCells.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="grid grid-cols-3 gap-0.5 bg-gray-200 border border-gray-300 rounded-sm"
        >
          {group.map((data, cellIndex) => {
            const realIndex = groupIndex * 9 + cellIndex;
            return (
              <div
                key={realIndex}
                className="w-full h-full bg-white"
                style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  textRendering: "geometricPrecision",
                }}
              >
                <div className="cell-content">
                  <MandaratCell
                    index={realIndex}
                    data={data}
                    isCompleted={completedCells[realIndex]}
                    onClick={(event) => onCellClick(realIndex, event)}
                    highlightColor={highlightColor}
                    isInCentralGroup={groupIndex === 4}
                    isActive={selectedIndex === realIndex}
                    isCapturing={isCapturing}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
