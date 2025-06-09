import React from "react";

interface DisplayProps {
  value: string;
  expression: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-4">
      <div className="text-right">
        <div className="text-sm text-gray-500 mb-1 h-5 font-mono">
          {expression}
        </div>
        <div className="text-3xl font-bold text-gray-900 font-mono min-h-[2.5rem]">
          {value || "0"}
        </div>
      </div>
    </div>
  );
};

export default Display;
