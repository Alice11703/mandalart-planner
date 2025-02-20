import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MandaratGrid from "./components/MandaratGrid";
import MandaratForm from "./components/MandaratForm";
import MandaratTitle from "./components/MandaratTitle";
import classNames from "classnames";
import ColorSelector from "./components/ColorSelector";
import TipsModal from "./components/TipsModal";
import Toolbar from "./components/Toolbar";
// import AIReviewModal from "./components/AIReviewModal";

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
  ...createDetailGroup(1), // 좌상단 (핵심목표1)
  ...createDetailGroup(2), // 중앙 상단 (핵심목표2)
  ...createDetailGroup(3), // 우상단 (핵심목표3)
  ...createDetailGroup(4), // 좌측 (핵심목표4)
  ...centralGroup, // 중앙(코어)
  ...createDetailGroup(5), // 우측 (핵심목표5)
  ...createDetailGroup(6), // 좌하단 (핵심목표6)
  ...createDetailGroup(7), // 중앙 하단 (핵심목표7)
  ...createDetailGroup(8), // 우하단 (핵심목표8)
];

export default function App() {
  const TipString1 = `"운동하기"`;
  const TipString2 = `"매주 5km 조깅하기"`;

  // gridData 초기화 부분 수정
  const [gridData, setGridData] = useState<string[]>(() => {
    const savedData = localStorage.getItem("mandaratGridData");
    return savedData ? JSON.parse(savedData) : DEFAULT_GRID_DATA;
  });

  // 전체 비우기 함수 수정
  const handleClearAll = () => {
    if (window.confirm("모든 셀의 데이터가 삭제됩니다. 계속하시겠습니까?")) {
      // 상태 초기화
      const emptyGrid = Array(81).fill("");
      setGridData(emptyGrid);
      setCompletedCells(Array(81).fill(false));

      // localStorage 전체 캐시 삭제
      localStorage.removeItem("mandaratGridData");
      localStorage.removeItem("mandaratCompleted");
      localStorage.removeItem("mandaratHighlightColor");
      localStorage.removeItem("mandaratCompletedCells");

      // 기본 하이라이트 색상을 보라색으로 초기화
      setHighlightColor("bg-purple-300");
    }
  };

  const [completedCells, setCompletedCells] = useState<boolean[]>(() => {
    const savedCompleted = localStorage.getItem("mandaratCompleted");
    return savedCompleted ? JSON.parse(savedCompleted) : Array(81).fill(false);
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

  const [highlightColor, setHighlightColor] = useState<string>(() => {
    const savedColor = localStorage.getItem("mandaratHighlightColor");
    return savedColor || "bg-purple-300";
  });

  const [showTips, setShowTips] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    localStorage.setItem("mandaratGridData", JSON.stringify(gridData));
  }, [gridData]);

  useEffect(() => {
    localStorage.setItem("mandaratCompleted", JSON.stringify(completedCells));
  }, [completedCells]);

  useEffect(() => {
    localStorage.setItem("mandaratHighlightColor", highlightColor);
  }, [highlightColor]);

  useEffect(() => {
    const handleResize = () => {
      // 리사이징 로직
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCellClick = (index: number, event: React.MouseEvent) => {
    const cellElement = event.currentTarget as HTMLElement;
    const rect = cellElement.getBoundingClientRect();

    // 클릭한 셀의 오른쪽 상단에 Form이 나타나도록 위치 조정
    setDialogPosition({
      x: rect.right + 10, // 셀의 오른쪽에서 10px 떨어진 위치
      y: rect.top, // 셀의 상단과 같은 높이
    });

    setSelectedIndex(index);
  };

  const handleSave = (index: number, newData: string) => {
    try {
      if (selectedIndex !== null) {
        const newGridData = [...gridData];
        newGridData[index] = newData;

        // 동기화 로직 제거하고 단순 저장으로 롤백
        setGridData(newGridData);
        setSelectedIndex(null);
      }
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
      alert("데이터 저장에 실패했습니다.");
    }
  };

  const handleComplete = (index: number) => {
    if (selectedIndex !== null) {
      const newCompletedCells = [...completedCells];
      newCompletedCells[index] = !newCompletedCells[index];
      setCompletedCells(newCompletedCells);
    }
  };

  const handleCancel = () => {
    setSelectedIndex(null);
  };

  const handleReset = (index: number) => {
    if (selectedIndex !== null) {
      const newGridData = [...gridData];
      const newCompletedCells = [...completedCells];

      newGridData[index] = "";
      newCompletedCells[index] = false;

      setGridData(newGridData);
      setCompletedCells(newCompletedCells);
      setSelectedIndex(null);

      localStorage.setItem("mandaratGridData", JSON.stringify(newGridData));
      localStorage.setItem(
        "mandaratCompleted",
        JSON.stringify(newCompletedCells),
      );
    }
  };

  const colorMap: { [key: string]: string } = {
    "bg-yellow-300": "#fde047",
    "bg-blue-300": "#93c5fd",
    "bg-red-300": "#fca5a5",
    "bg-purple-300": "#d8b4fe",
    "bg-green-300": "#86efac",
    "bg-teal-300": "#5eead4",
    "bg-pink-300": "#f9a8d4",
    "bg-indigo-300": "#a5b4fc",
  };

  const gridRef = useRef<HTMLDivElement>(null);

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

  // 그리드 초기화 함수도 수정
  const resetGridData = () => {
    if (window.confirm("모든 데이터가 초기화됩니다. 계속하시겠습니까?")) {
      setGridData(DEFAULT_GRID_DATA);
      setCompletedCells(Array(81).fill(false));
      localStorage.removeItem("mandaratCompletedCells");
      // localStorage에 새로운 gridData도 저장
      localStorage.setItem(
        "mandaratGridData",
        JSON.stringify(DEFAULT_GRID_DATA),
      );
    }
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
        {/* 일반 화면에서만 보이는 Header와 Title */}
        <div className={isCapturing ? "hidden" : "block"}>
          <Header title="My Mandarat Plan" />
          <MandaratTitle />
        </div>
        <div className="p-4 transform scale-100 2xl:scale-100 xl:scale-90 lg:scale-85 md:scale-75 sm:scale-60 print:scale-100 print:transform-none">
          <div className="flex items-center justify-between p-0.5 w-full max-w-[900px] mx-auto print:hidden">
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
          {/* PDF 저장 시 Title이 포함되도록 gridRef 위치 변경 */}
          <div ref={gridRef}>
            {/* PDF 저장 시에만 보이는 Title */}
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
      <Footer className="print:hidden" /> {/* 프린트 시 숨김 */}
    </>
  );
}
