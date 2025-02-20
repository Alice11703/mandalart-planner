import { useState } from "react";

export const useMandarat = (initialBoard: string[]) => {
  const [board, setBoard] = useState<string[]>(initialBoard);

  const updateCell = (index: number, value: string) => {
    const newBoard = [...board];
    newBoard[index] = value;
    setBoard(newBoard);
  };

  return {
    board,
    updateCell,
  };
};
