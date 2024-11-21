import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 text-xl font-semibold text-gray-700">
        ローディング中です。
      </div>
    </div>
  );
};

export default Loading;
