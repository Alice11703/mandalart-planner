import React, { useState } from "react";
import MandaratGrid from "./components/MandaratGrid";
import Toolbar from "./components/Toolbar";
import Tips from "./components/Tips";

// 중앙(코어) 그룹 데이터 순서 수정
const centralGroup = [
  "핵심목표1",
  "핵심목표2",
  "핵심목표3",
  "핵심목표4",
  "코어목표",
  "핵심목표5",
  "핵심목표6",
  "핵심목표7",
  "핵심목표8",
];

// 세부 그룹 생성 함수 수정
const createDetailGroup = (coreNumber: number): string[] => {
  return [
    "세부목표",
    "세부목표",
    "세부목표",
    "세부목표",
    `핵심목표${coreNumber}`,
    "세부목표",
    "세부목표",
    "세부목표",
    "세부목표",
  ];
};

// 전체 그리드 데이터 생성 (9x9 = 81개 셀)
const DEFAULT_GRID_DATA = [
  ...createDetailGroup(1),
  ...createDetailGroup(2),
  ...createDetailGroup(3),
  ...createDetailGroup(4),
  ...centralGroup,
  ...createDetailGroup(5),
  ...createDetailGroup(6),
  ...createDetailGroup(7),
  ...createDetailGroup(8),
];

export default function App() {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center">만다라트 계획표</h1>
      </header>

      <Toolbar setShowTips={setShowTips} />

      <main className="mt-4">
        <MandaratGrid gridData={DEFAULT_GRID_DATA} />
      </main>

      {showTips && <Tips onClose={() => setShowTips(false)} />}
    </div>
  );
}
