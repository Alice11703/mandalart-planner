import React from "react";
import classNames from "classnames";

interface MandaratCellProps {
  index: number;
  data: string;
  isCompleted: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  highlightColor: string;
  isInCentralGroup: boolean;
  isActive: boolean;
  isCapturing: boolean;
  isCenterCell: boolean;
}

const formatText = (text: string): string => {
  // 공백을 제외한 실제 글자 수 계산 (길이 체크용으로만 사용)
  const actualLength = text.replace(/\s/g, "").length;

  // 4글자: 2글자 + 2글자
  if (actualLength === 4) {
    // 띄어쓰기가 있는 경우 그대로 유지
    if (text.includes(" ")) {
      return text.replace(" ", "\n");
    }
    // 띄어쓰기가 없는 경우 2+2로 분할
    return text.replace(/^(.{2})(.{2})$/, "$1\n$2");
  }

  // 5글자: 띄어쓰기 기준으로 줄바꿈
  if (actualLength === 5) {
    const spaceIndex = text.indexOf(" ");
    if (spaceIndex !== -1) {
      return text.replace(" ", "\n");
    }
    // 띄어쓰기가 없는 경우 3글자 + 2글자로 줄바꿈
    return text.replace(/^(.{3})(.{2})$/, "$1\n$2");
  }

  // 6글자: 3글자 + 3글자
  if (actualLength === 6) {
    // 띄어쓰기가 있는 경우 그대로 유지
    if (text.includes(" ")) {
      return text.replace(" ", "\n");
    }
    // 띄어쓰기가 없는 경우 3+3으로 분할
    return text.replace(/^(.{3})(.{3})$/, "$1\n$2");
  }

  // 그 외: 띄어쓰기 기준으로 줄바꿈
  return text.replace(/\s+/g, "\n");
};

const MandaratCell: React.FC<MandaratCellProps> = ({
  data,
  isCompleted,
  onClick,
  highlightColor,
  isInCentralGroup,
  isActive,
  isCapturing,
  isCenterCell,
}) => {
  const getBgColor = () => {
    if (isActive) return "bg-blue-100";
    if (isInCentralGroup || isCenterCell) return highlightColor;
    return "bg-white";
  };

  const getTextSizeClass = () => {
    const actualLength = data.replace(/\s/g, "").length;
    const lineCount = (formattedText.match(/\n/g) || []).length + 1;

    if (!data) return "text-lg leading-[1.2] tracking-normal";

    // PDF 캡처 시 더 작은 텍스트 크기 적용
    if (isCapturing) {
      if (lineCount >= 3) return "text-[9px] leading-[1.2]";
      if (actualLength > 20) return "text-[10px] leading-[1.2]";
      if (actualLength > 15) return "text-[11px] leading-[1.2]";
      if (actualLength > 12) return "text-[12px] leading-[1.3]";
      if (actualLength > 6) return "text-[13px] leading-[1.4]";
      return "text-[14px] leading-[1.5]";
    }

    // 일반 화면에서의 텍스트 크기
    if (lineCount >= 3) return "text-xs leading-[1.2] tracking-normal";
    if (actualLength > 20) return "text-sm leading-[1.2] tracking-normal";
    if (actualLength > 15) return "text-base leading-[1.3] tracking-normal";
    if (actualLength > 12) return "text-lg leading-[1.4] tracking-normal";
    return "text-xl leading-[1.5] tracking-[-0.01em]";
  };

  const formattedText = formatText(data);

  return (
    <div
      className={classNames(
        "aspect-square w-full min-h-full",
        "flex items-center justify-center content-center",
        "border-0",
        "transition-all",
        !isCapturing && "cursor-pointer hover:bg-blue-50",
        isCapturing ? "p-1" : "p-1.5",
        getBgColor(),
        {
          "opacity-50": isCompleted,
        },
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "w-full h-full min-h-full",
          "flex flex-col items-center justify-center",
          isCapturing ? "px-1" : "px-1.5",
        )}
      >
        <span
          className={classNames(
            "text-center break-words whitespace-pre-line w-full h-full flex items-center justify-center",
            getTextSizeClass(),
            {
              "line-through": isCompleted,
              "font-normal": isCapturing,
            },
          )}
          style={{
            wordBreak: "break-word",
            minHeight: "100%",
          }}
        >
          {formattedText}
        </span>
      </div>
    </div>
  );
};

export default MandaratCell;
