import React from "react";

const DashCard = ({ title, digit }) => {
  return (
    <div className="max-w-[30%] w-full p-5 border border-gray-200 shadow-sm rounded grid gap-2 my-3 lg:my-0">
      <p className="text-black text-[15px] font-normal">{title}</p>
      <h2 className="text-black font-bold text-2xl">{digit}</h2>
    </div>
  );
};

export default DashCard;