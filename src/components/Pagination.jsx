import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };
  return (
    <div className="flex justify-center items-center my-4">
    <div className="flex items-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
        className="font-sans text-xs font-bold text-center text-gray-900 transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.625 4.375L4.875 6L6.625 7.625"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div className="flex items-center gap-2 max-w-[300px] overflow-x-auto">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none text-center align-middle font-sans text-sm rounded-full font-medium uppercase transition-all border-none ${
                number === currentPage
                  ? "bg-blue-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20"
                  : "text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
              } focus:opacity-[0.85] hover:rounded-full focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {number}
              </span>
            </button>
          )
        )}
      </div>
      <button 
      type="button"
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
        className="font-sans text-xs font-bold text-center text-gray-900 transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.375 4.375L7.125 6L5.375 7.625"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
  );
};

export default Pagination;
