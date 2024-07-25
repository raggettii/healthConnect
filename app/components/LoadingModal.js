import React from "react";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
