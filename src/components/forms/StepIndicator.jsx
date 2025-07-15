// src/components/StepIndicator.jsx
import React from "react";

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mb-10">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 z-0 transform -translate-y-1/2" />
      <div className="flex justify-between relative z-10">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 flex items-center justify-center rounded-md font-bold border-2
              ${currentStep === step
                ? "bg-[#E86A1C] text-white border-[#E86A1C] shadow-[0_2px_0_0_#b45309]"
                : "bg-gray-300 text-black border-gray-300 shadow-[0_2px_0_0_gray]"}`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
