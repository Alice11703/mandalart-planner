import React from "react";

interface ToolbarProps {
  setShowTips: (show: boolean) => void;
}

const Toolbar = ({ setShowTips }: ToolbarProps) => {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => setShowTips(true)}
        className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="작성팁"
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="hidden sm:inline">작성팁</span>
      </button>
    </div>
  );
};

export default Toolbar;
