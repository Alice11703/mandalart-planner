import React from "react";

interface AIReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewData: {
    feasibility: string;
    feedback: string;
    suggestions: string[];
  } | null;
  isLoading: boolean;
}

export default function AIReviewModal({
  isOpen,
  onClose,
  reviewData,
  isLoading,
}: AIReviewModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">AI 피드백 💡</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">AI가 목표를 분석하고 있습니다...</p>
          </div>
        ) : reviewData ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">실행 가능성</h3>
              <p className="text-blue-700">{reviewData.feasibility}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">피드백</h3>
              <p className="text-green-700">{reviewData.feedback}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-2">개선 제안</h3>
              <ul className="list-disc list-inside text-purple-700">
                {reviewData.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">분석 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}
