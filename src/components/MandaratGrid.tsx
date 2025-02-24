import React, { useState } from "react";
import MandaratCell from "./MandaratCell";
import classNames from "classnames";
import { useMandarat } from "../hooks/useMandarat";

interface MandaratGridProps {
  gridData: string[];
  completedCells: boolean[];
  onCellClick: (index: number, event: React.MouseEvent) => void;
  highlightColor: string;
  selectedIndex: number | null;
  isCapturing: boolean;
  isSmallScreen?: boolean;
}

const MandaratGrid: React.FC<MandaratGridProps> = ({
  gridData,
  completedCells,
  onCellClick,
  highlightColor,
  selectedIndex,
  isCapturing,
  isSmallScreen,
}) => {
  const { board, updateCell } = useMandarat(Array(81).fill(""));
  const [selectedColors, setSelectedColors] = useState<{
    [key: number]: string;
  }>({});

  const isCenterCell = (groupIndex: number, cellIndex: number) => {
    return cellIndex === 4;
  };

  const isCoreCells = (index: number) => {
    const coreCells = [4, 10, 14, 20, 24, 30, 34, 38];
    return coreCells.includes(index);
  };

  // 각 핵심목표 셀과 그에 속한 중앙 셀의 매핑
  const coreToSetCenter = {
    4: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    14: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    24: [18, 19, 20, 21, 22, 23, 24, 25, 26],
    10: [27, 28, 29, 30, 31, 32, 33, 34, 35],
    20: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    30: [45, 46, 47, 48, 49, 50, 51, 52, 53],
    34: [54, 55, 56, 57, 58, 59, 60, 61, 62],
    38: [63, 64, 65, 66, 67, 68, 69, 70, 71],
  };

  // 코어 그룹의 중앙 셀 인덱스 배열 추가
  const coreCenterCells = [4, 14, 24, 10, 20, 30, 34, 38];

  const getSetColor = (index: number) => {
    const coreCell = Object.entries(coreToSetCenter).find(([_, set]) =>
      set.includes(index),
    )?.[0];

    if (!coreCell) return "";

    const color = selectedColors[Number(coreCell)];
    // 코어 그룹의 중앙 셀인 경우 투명도 적용
    return coreCenterCells.includes(index) ? `${color} !bg-opacity-60` : color;
  };

  const groupedCells = Array.from({ length: 9 }, (_, groupIndex) =>
    gridData.slice(groupIndex * 9, groupIndex * 9 + 9),
  );

  return (
    <div className="grid grid-cols-3 gap-0.5 bg-gray-200 p-0.5 w-full max-w-[900px] mx-auto">
      {groupedCells.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="grid grid-cols-3 gap-0.5 bg-gray-200 border border-gray-300 rounded"
        >
          {group.map((data, cellIndex) => {
            const realIndex = groupIndex * 9 + cellIndex;
            const isCenter = isCenterCell(groupIndex, cellIndex);

            return (
              <div
                key={realIndex}
                className={classNames(
                  "w-full h-full",
                  isCenter ? highlightColor : "bg-white",
                )}
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
                    isCenterCell={isCenterCell(groupIndex, cellIndex)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MandaratGrid;
