import React from "react";

interface ToolbarProps {
  setShowTips: (show: boolean) => void;
  handleClearAll: () => void;
  handleSavePDF: () => void;
}

export default function Toolbar({
  setShowTips,
  handleClearAll,
  handleSavePDF,
}: ToolbarProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setShowTips(true)}
        className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="도움말"
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="hidden sm:inline">도움말</span>
      </button>

      <button
        onClick={handleSavePDF}
        className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="PDF 저장"
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span className="hidden sm:inline">PDF 저장</span>
      </button>

      <button
        onClick={handleClearAll}
        className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="전체 비우기"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span className="hidden sm:inline">전체 비우기</span>
      </button>
    </div>
  );
}
