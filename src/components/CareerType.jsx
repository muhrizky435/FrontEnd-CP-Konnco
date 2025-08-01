import React from "react";

const getCareerImage = (type) => {
  switch (type?.toUpperCase()) {
    case "WEB":
      return "/img/Code.png";
    case "UI_UX":
      return "/uiux.png";
    case "MOBILE":
      return "/mobile.png";
    case "DESKTOP":
      return "/desktop.png";
    case "SYSTEM_ANALYST":
      return "/system-analyst.png";
    case "QUALITY_ASSURANCE":
      return "/qa.png";
    case "DATA_ANALYST":
      return "/data-analyst.png";
    case "GENERAL_AFFAIR":
      return "/ga.png";
    case "MARKETING":
      return "/marketing.png";
    case "ACCOUNTING":
      return "/accounting.png";
    default:
      return "/default-career.png";
  }
};

const CareerTypeIcon = ({ type }) => {
  return (
    <div className="w-28 sm:w-32 bg-orange-500 flex items-center justify-center">
      <img
        src={getCareerImage(type)}
        alt={type}
        className="w-14 h-14 object-contain"
      />
    </div>
  );
};

export default CareerTypeIcon;
