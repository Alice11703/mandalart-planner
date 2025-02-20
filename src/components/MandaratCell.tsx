import React from "react";
import classNames from "classnames";

type MandaratCellProps = {
  index: number;
  data: string;
  isCompleted: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  highlightColor: string;
  isInCentralGroup: boolean;
  isActive?: boolean;
  isCapturing: boolean;
};

export default function MandaratCell({
  index,
  data,
  isCompleted,
  onClick,
  highlightColor,
  isInCentralGroup,
  isActive,
  isCapturing,
}: MandaratCellProps) {
  // 3x3 그룹의 가운데 셀인지 확인
  const isGroupCenter = index % 9 === 4;

  // 전체 9x9에서 중앙 그룹(5번째 그룹)의 셀인지 확인
  const isCentralGroup = Math.floor(index / 9) === 4;

  // 중앙 그룹의 가운데(40번 셀)인지 확인
  const isCentralGroupCenter = index === 40;

  // 배경색 결정 로직
  const getBgColor = () => {
    if (isActive) {
      return "bg-blue-50"; // 활성화된 셀은 연한 파란색 배경
    }
    if (isCentralGroupCenter) {
      return `${highlightColor} bg-opacity-30` || "bg-gray-100 bg-opacity-50";
    }
    if (isGroupCenter && !isCentralGroup) {
      return highlightColor || "bg-gray-100";
    }
    if (isCentralGroup) {
      return highlightColor || "bg-gray-100";
    }
    return "bg-white";
  };

  // 텍스트 길이에 따른 폰트 크기 클래스 결정
  const getTextSizeClass = (text: string) => {
    if (isCapturing) {
      // 프린트/이미지 캡처 시 폰트 크기 조정
      if (!text) return "text-xs leading-[1.3]";
      if (text.length > 15) return "text-[9px] leading-[1.2]";
      if (text.length > 12) return "text-[10px] leading-[1.25]";
      if (text.length > 6) return "text-[11px] leading-[1.3]";
      return "text-[12px] leading-[1.35]";
    } else {
      // 웹 표시용 폰트 크기는 유지
      if (!text) return "text-lg leading-[1.2] tracking-normal";
      if (text.length > 15)
        return "text-xs sm:text-sm leading-[1.2] tracking-normal";
      if (text.length > 12)
        return "text-sm sm:text-base leading-[1.3] tracking-normal";
      if (text.length > 6)
        return "text-base sm:text-lg leading-[1.4] tracking-[-0.01em]";
      return "text-lg sm:text-xl leading-[1.5] tracking-[-0.01em]";
    }
  };

  // 텍스트 줄바꿈 처리 함수 수정
  const formatText = (text: string) => {
    if (!text) return "";

    // 띄어쓰기를 제외한 실제 글자 수 계산
    const actualLength = text.replace(/\s/g, "").length;

    // 띄어쓰기가 있는 경우 단어 단위로 줄바꿈 시도
    if (text.includes(" ")) {
      const words = text.split(" ");
      const firstWord = words[0];
      const restWords = words.slice(1).join(" ");

      // 첫 단어와 나머지 단어들의 길이가 적절한 경우에만 단어 단위 줄바꿈
      if (firstWord.length <= 3 && restWords.length <= 3) {
        return `${firstWord}\n${restWords}`;
      }
    }

    // 4글자인 경우 2+2로 줄바꿈
    if (actualLength === 4) {
      const chars = text.split("");
      let firstPart = "";
      let secondPart = "";
      let count = 0;

      // 앞부분 2글자 채우기
      for (let i = 0; count < 2; i++) {
        if (chars[i] !== " ") count++;
        firstPart += chars[i];
      }

      // 나머지 글자들
      secondPart = chars.slice(firstPart.length).join("");
      return `${firstPart}\n${secondPart}`;
    }

    // 5글자인 경우 단어 단위로 줄바꿈
    if (actualLength === 5) {
      const words = text.split(" ");
      const firstWordLength = words[0].length;

      if (firstWordLength === 3) {
        return `${words[0]}\n${words.slice(1).join(" ")}`;
      } else if (firstWordLength === 2) {
        return `${words[0]}\n${words.slice(1).join(" ")}`;
      } else {
        return `${text.slice(0, 2)}\n${text.slice(2)}`;
      }
    }

    // 6글자인 경우 3+3으로 줄바꿈
    if (actualLength === 6) {
      const chars = text.split("");
      let firstPart = "";
      let secondPart = "";
      let count = 0;

      // 앞부분 3글자 채우기
      for (let i = 0; count < 3; i++) {
        if (chars[i] !== " ") count++;
        firstPart += chars[i];
      }

      // 나머지 글자들
      secondPart = chars.slice(firstPart.length).join("");
      return `${firstPart}\n${secondPart}`;
    }

    // 7글자 이상인 경우에도 단어 단위로 줄바꿈 시도
    if (actualLength > 6 && text.includes(" ")) {
      const words = text.split(" ");
      let firstLine = words[0];
      let currentLength = words[0].length;

      // 첫 줄에 들어갈 단어들 결정
      for (let i = 1; i < words.length; i++) {
        if (currentLength + 1 + words[i].length <= 4) {
          // 여유 공간 체크
          firstLine += " " + words[i];
          currentLength += 1 + words[i].length;
        } else {
          return `${firstLine}\n${words.slice(i).join(" ")}`;
        }
      }
    }

    return text;
  };

  return (
    <div
      className={classNames(
        "aspect-square w-full min-h-full",
        "flex items-center justify-center content-center",
        "border-0",
        "transition-all cursor-pointer hover:bg-blue-50",
        isCapturing ? "p-1.5" : "p-1.5",
        getBgColor(),
        {
          [highlightColor]: isGroupCenter && !isCentralGroupCenter,
          "opacity-50": isCompleted,
        },
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "w-full h-full min-h-full",
          "flex flex-col items-center justify-center",
          isCapturing ? "px-1.5" : "px-1",
        )}
      >
        <span
          className={classNames(
            "text-center break-words whitespace-pre-line min-h-full flex items-center content-center",
            getTextSizeClass(data),
            {
              "line-through": isCompleted,
            },
          )}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word",
            minHeight: "100%",
          }}
        >
          {formatText(data)}
        </span>
      </div>
    </div>
  );
}
