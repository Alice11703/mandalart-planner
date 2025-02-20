interface TipsModalProps {
  showTips: boolean;
  setShowTips: (show: boolean) => void;
  TipString1: string;
  TipString2: string;
}

export default function TipsModal({
  showTips,
  setShowTips,
  TipString1,
  TipString2,
}: TipsModalProps) {
  if (!showTips) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setShowTips(false)}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">만다라트 계획표 작성팁💡</h2>
          <button
            onClick={() => setShowTips(false)}
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
        <div className="bg-white rounded-lg max-w-lg w-full">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold">💈 작성 순서</h3>
              <ol className="list-decimal list-inside space-y-1 pl-2">
                <li>코어 목표 설정 - 가장 큰 목표를 중앙에 배치</li>
                <li>
                  8개의 핵심 목표 설정 - 구체적인 하위 목표를 8개씩 설정하기
                </li>
                <li>세부 목표 확장 - 각 세부 목표를 3x3 구조로 확장</li>
                <li>실행 계획 수립 - 구체적 시간표와 행동 단계 포함</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold">🎯 세부 목표를 정하고 체크할 부분</h3>
              <ul className="list-inside space-y-1 pl-2">
                <li>✓ 목표 내용이 구체적인가</li>
                <li>✓ 측정 가능한가</li>
                <li>✓ 달성 가능한가</li>
                <li>✓ 현실적인가</li>
                <li>✓ 기한이 있는가 (단기, 장기 목표를 균형있게 조정할 것)</li>
                <li>
                  예를 들어, 단순히
                  <span className="underline"> {TipString1} </span>
                  라는 목표보다는
                  <span className="underline"> {TipString2} </span>처럼
                  구체적이고 측정 가능한 목표를 설정해야 합니다.
                </li>
              </ul>
            </div>
            <p className="font-bold text-red-700">
              ❗️실천 가능한 목표 설정하기❗️
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
