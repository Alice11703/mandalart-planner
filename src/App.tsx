import React, { useState, useRef, useEffect } from "react";
import MandaratGrid from "./components/MandaratGrid";
import Toolbar from "./components/Toolbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ColorSelector from "./components/ColorSelector";
import TipsModal from "./components/TipsModal";
import MandaratForm from "./components/MandaratForm";
import MandaratTitle from "./components/MandaratTitle";
import classNames from "classnames";
import html2pdf from "html2pdf.js";

// 중앙(코어) 그룹 데이터 순서
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

// 세부 그룹 생성 함수
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
  const [isCapturing, setIsCapturing] = useState(false);
  const [highlightColor, setHighlightColor] = useState<string>(() => {
    const savedColor = localStorage.getItem("mandaratHighlightColor");
    return savedColor || "bg-purple-300";
  });
  const [gridData, setGridData] = useState<string[]>(() => {
    const savedData = localStorage.getItem("mandaratData");
    return savedData ? JSON.parse(savedData) : DEFAULT_GRID_DATA;
  });
  const [completedCells, setCompletedCells] = useState<boolean[]>(() => {
    const savedCompleted = localStorage.getItem("mandaratCompleted");
    return savedCompleted ? JSON.parse(savedCompleted) : Array(81).fill(false);
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  const TipString1 = "운동하기";
  const TipString2 = "매일 아침 30분 조깅하기";

  // 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("mandaratData", JSON.stringify(gridData));
  }, [gridData]);

  useEffect(() => {
    localStorage.setItem("mandaratCompleted", JSON.stringify(completedCells));
  }, [completedCells]);

  // highlightColor가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("mandaratHighlightColor", highlightColor);
  }, [highlightColor]);

  const handleClearAll = () => {
    if (window.confirm("모든 셀의 데이터가 삭제됩니다. 계속하시겠습니까?")) {
      // 기본값으로 초기화
      setGridData(Array(81).fill("")); // 모든 셀을 빈 문자열로 초기화
      setCompletedCells(Array(81).fill(false)); // 완료 상태 초기화
      // highlightColor는 유지
      // localStorage 데이터도 초기화
      localStorage.removeItem("mandaratData");
      localStorage.removeItem("mandaratCompleted");
      // highlightColor는 localStorage에서 제거하지 않음
    }
  };

  const handleSavePDF = () => {
    setIsCapturing(true);

    const element = gridRef.current;
    if (!element) return;

    const opt = {
      margin: 5,
      filename: "mandarat-plan.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 900,
        windowHeight: 1200,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsCapturing(false);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
  };

  const handleCellClick = (index: number, event: React.MouseEvent) => {
    setSelectedIndex(index);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDialogPosition({ x: rect.left, y: rect.bottom });
  };

  const handleSave = (index: number, newData: string) => {
    const newGridData = [...gridData];
    newGridData[index] = newData;
    setGridData(newGridData);
    setSelectedIndex(null);
  };

  const handleComplete = (index: number) => {
    const newCompletedCells = [...completedCells];
    newCompletedCells[index] = !newCompletedCells[index];
    setCompletedCells(newCompletedCells);
    setSelectedIndex(null);
  };

  const handleCancel = () => {
    setSelectedIndex(null);
  };

  const handleReset = (index: number) => {
    const newGridData = [...gridData];
    newGridData[index] = DEFAULT_GRID_DATA[index];
    setGridData(newGridData);
    setSelectedIndex(null);
  };

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <div className="print:p-0">
        <div className={isCapturing ? "hidden" : "block"}>
          <Header title="My Mandarat Plan" />
          <MandaratTitle />
        </div>
        <div className="p-4 transform scale-100 2xl:scale-100 xl:scale-90 lg:scale-85 md:scale-75 sm:scale-60 print:scale-100 print:transform-none">
          <div
            className={classNames(
              "flex items-center justify-between p-0.5 w-full max-w-[900px] mx-auto",
              isCapturing ? "hidden" : "block print:hidden",
            )}
          >
            <ColorSelector
              highlightColor={highlightColor}
              setHighlightColor={setHighlightColor}
            />
            <Toolbar
              setShowTips={setShowTips}
              handleClearAll={handleClearAll}
              handleSavePDF={handleSavePDF}
            />
          </div>
          <div ref={gridRef}>
            <div className={isCapturing ? "block mb-4" : "hidden"}>
              <MandaratTitle />
            </div>
            <MandaratGrid
              gridData={gridData}
              completedCells={completedCells}
              onCellClick={handleCellClick}
              highlightColor={highlightColor}
              selectedIndex={selectedIndex}
              isCapturing={isCapturing}
            />
          </div>
          {selectedIndex !== null && (
            <MandaratForm
              currentData={gridData[selectedIndex]}
              isCompleted={completedCells[selectedIndex]}
              onSave={(newData) => handleSave(selectedIndex, newData)}
              onComplete={() => handleComplete(selectedIndex)}
              onCancel={handleCancel}
              onReset={() => handleReset(selectedIndex)}
              position={dialogPosition}
              cellIndex={selectedIndex}
            />
          )}
        </div>
      </div>
      <TipsModal
        showTips={showTips}
        setShowTips={setShowTips}
        TipString1={TipString1}
        TipString2={TipString2}
      />
      <Footer className="print:hidden" />
    </>
  );
}
