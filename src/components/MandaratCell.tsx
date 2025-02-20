import React from "react";
import classNames from "classnames";

interface MandaratCellProps {
  value: string;
  onChange: (value: string) => void;
}

const MandaratCell = ({ value, onChange }: MandaratCellProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full p-2 text-center focus:outline-none border"
    />
  );
};

export default MandaratCell;
