import React, { useState, useEffect } from "react";

export default function MandaratTitle() {
  const [title, setTitle] = useState("");

  // 컴포넌트가 처음 마운트될 때 localStorage에서 값 불러오기
  useEffect(() => {
    const savedTitle = localStorage.getItem("mandaratTitle");
    if (savedTitle) setTitle(savedTitle);
  }, []);

  // 값이 변경될 때 localStorage에 저장
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("mandaratTitle", newTitle);
  };

  return (
    <div className="text-center mb-4">
      <input
        className="text-xl font-bold border-b-2 border-gray-400 text-center w-full p-2 placeholder-opacity-10"
        value={title}
        onChange={handleTitleChange}
        placeholder="올해의 목표를 입력하세요"
      />
    </div>
  );
}
