import React, { useState, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface MandaratFormProps {
  currentData: string;
  isCompleted: boolean;
  onSave: (data: string) => void;
  onComplete: () => void;
  onCancel: () => void;
  onReset?: () => void;
  position: Position;
  cellIndex: number;
}

const MandaratForm: React.FC<MandaratFormProps> = ({
  currentData,
  isCompleted,
  onSave,
  onComplete,
  onCancel,
  position,
  onReset,
  cellIndex,
}) => {
  const [newData, setNewData] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();

    // ESC 키 이벤트 핸들러
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("keydown", handleEscKey);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onCancel]); // onCancel을 의존성 배열에 추가

  const handleSave = () => {
    const dataToSave: string = newData.trim() || currentData;
    onSave(dataToSave);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "작성한 내용과 완료 상태가 모두 초기화됩니다. 계속하시겠습니까?",
      )
    ) {
      setNewData("");
      onReset?.();
    }
  };

  // 대화상자가 화면 밖으로 나가지 않도록 position 조정
  const adjustPosition = () => {
    const dialogWidth = 320; // w-80 = 320px
    const dialogHeight = 250; // 예상 높이
    const padding = 10;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let x = position.x;
    let y = position.y;

    // 오른쪽 공간이 부족한 경우 왼쪽에 표시
    if (x + dialogWidth > windowWidth - padding) {
      x = x - dialogWidth - 20; // 셀의 왼쪽에 표시 (20px 간격)
    }

    // 왼쪽이 화면 밖으로 나가는 경우
    if (x < padding) {
      x = padding;
    }

    // 아래쪽 공간이 부족한 경우 위로 조정
    if (y + dialogHeight > windowHeight - padding) {
      y = windowHeight - dialogHeight - padding;
    }

    // 위쪽이 화면 밖으로 나가는 경우
    if (y < padding) {
      y = padding;
    }

    return { x, y };
  };

  const { x, y } = adjustPosition();

  // 셀 위치를 표시하는 함수 수정
  const getCellPosition = (index: number) => {
    const group = Math.floor(index / 9);
    const cell = (index % 9) + 1;

    // 중앙(코어) 그룹인 경우 (4번째 인덱스 그룹)
    if (group === 4) {
      if (cell === 5) return "코어목표";
      return `핵심목표${cell}`;
    }

    // 실제 그룹 번호 계산 (중앙 그룹 이후는 -1)
    const actualGroup = group >= 4 ? group : group + 1;

    // 각 그룹의 중앙 셀(5번째 셀)인 경우
    if (cell === 5) {
      return `핵심목표${actualGroup}`;
    }

    // 나머지 세부목표 셀
    return `세부목표 ${cell}`;
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isCompleted) {
        handleSave();
        onCancel();
      }
    }
  };

  return (
    <div
      className="fixed w-96 bg-white border shadow-lg rounded-lg"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-semibold">
          {getCellPosition(cellIndex)}
          {currentData && (
            <span className="text-sm text-gray-500 ml-2">
              {" "}
              {currentData.length > 15
                ? `${currentData.slice(0, 15)}...`
                : currentData}
            </span>
          )}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="닫기"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="p-4">
        <textarea
          ref={textareaRef}
          className="border p-2 w-full rounded-md mb-4"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder={currentData || "목표를 입력하세요"}
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-2 flex-wrap justify-between">
          <div className="flex gap-2">
            {!isCompleted && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md transition hover:bg-blue-600"
                onClick={handleSave}
              >
                저장
              </button>
            )}
            <button
              className={`px-4 py-2 rounded-md transition font-semibold ${
                isCompleted
                  ? "bg-green-700 text-white hover:bg-green-600"
                  : "bg-green-500 text-white hover:bg-green-400"
              }`}
              onClick={onComplete}
            >
              {isCompleted ? "✅ 해냈다!" : "완료"}
            </button>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md transition hover:bg-red-600"
            onClick={handleReset}
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default MandaratForm;
