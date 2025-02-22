import { useState, useEffect } from "react";

export const useMandarat = (initialBoard: string[]) => {
  // localStorage 사용 제거
  const [board, setBoard] = useState<string[]>(initialBoard);

  const updateCell = (index: number, value: string) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = value;
      return newBoard;
    });
  };

  return {
    board,
    updateCell,
  };
};
