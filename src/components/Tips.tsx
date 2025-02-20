interface TipsProps {
  onClose: () => void;
}

const Tips = ({ onClose }: TipsProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">작성 도움말</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>중앙에 핵심 목표를 작성하세요.</li>
          <li>핵심 목표를 달성하기 위한 8개의 주요 목표를 작성하세요.</li>
          <li>
            각 주요 목표를 달성하기 위한 8개의 세부 실천 항목을 작성하세요.
          </li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Tips;
