import React from "react";

// This loader component can be used in two ways:
// 1. As a full-screen overlay loader: <Loader fullScreen={true} />
// 2. As an inline loader: <Loader size="small" color="blue" />
const Loader = ({ 
  fullScreen = false, 
  size = "medium", 
  color = "blue",
  className = ""
}) => {
  // Size classes for the spinner
  let sizeClass;
  switch (size) {
    case "small":
      sizeClass = "w-4 h-4";
      break;
    case "large":
      sizeClass = "w-10 h-10";
      break;
    default:
      sizeClass = "w-6 h-6";
  }

  // Color classes for the spinner
  let colorClass;
  switch (color) {
    case "white":
      colorClass = "border-white";
      break;
    case "gray":
      colorClass = "border-gray-500";
      break;
    default:
      colorClass = "border-blue-600";
  }

  if (fullScreen) {
    return (
      <div className="inset-0 fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className={`w-16 h-16 border-4 border-t-transparent ${colorClass} rounded-full animate-spin`}></div>
      </div>
    );
  }

  return (
    <div className={`${sizeClass} border-2 border-t-transparent ${colorClass} rounded-full animate-spin ${className}`}></div>
  );
};

export default Loader;

