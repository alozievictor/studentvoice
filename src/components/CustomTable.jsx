// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Dropdown } from "flowbite-react";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import Pagination from "./Pagination";

// const CustomTable = ({
//   headers,
//   data,
//   navigateTo,
//   title,
//   viewAllText,
//   onEdit,
//   onDelete,
// }) => {
//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = React.useState(1);
//   const totalPages = Math.ceil(data / 5 || 0);
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const startIndex = (currentPage - 1) * 5;

//   const filteredData =
//     data.filter((item) => {
//       const matchesSearch =
//         item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//         item.department.includes(filters.search) ||
//         item.gender.toLowerCase().includes(filters.search.toLowerCase());
//       return matchesSearch;
//     }) || [];

//   const slicedTableData = filteredData.slice(startIndex, startIndex + 5) || [];

//   const handleSearchChange = () => {

//   }

//   return (
//     <div className="w-full p-5 border shadow-sm rounded-md">
//       {title && (
//         <div className="flex justify-between items-center my-3">
//           <p className="text-back font-medium text-[17px]">{title}</p>
//           {navigateTo && (
//             <button
//               type="button"
//               onClick={() => navigate(navigateTo)}
//               className="text-base text-blue-700 font-normal cursor-pointer"
//             >
//               {viewAllText || ""}
//             </button>
//           )}
//         </div>
//       )}
//       <div className="relative overflow-x-auto rounded-lg custom-scrollbar">
//         <div action="" class="relative mx-auto flex">
//           <input
//             type="search"
//             onChange={handleSearchChange}
//             class="text-xs peer cursor-pointer relative z-10 h-8 w-10 rounded-lg border bg-transparent  pr-6 outline-none focus:rounded-r-none focus:w-full focus:cursor-text focus:border-taupeGray focus:px-3"
//             placeholder="Typing..."
//           />
//           <button class="absolute top-0 right-0 bottom-0 my-auto h-8 w-10 px-3 bg-slate-300 rounded-lg peer-focus:relative peer-focus:rounded-l-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               x="0px"
//               y="0px"
//               width="20"
//               height="20"
//               viewBox="0 0 50 50"
//             >
//               <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
//             </svg>
//           </button>
//         </div>
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
//           <thead className="text-xs text-gray-700 capitalize bg-gray-50">
//             <tr>
//               {headers.map((header, index) => (
//                 <th
//                   key={index}
//                   scope="col"
//                   className="px-4 py-3 min-w-[152px] font-semibold text-sm"
//                 >
//                   {header}
//                 </th>
//               ))}
//               <th
//                 scope="col"
//                 className="px-6 py-3 min-w-[100px] font-semibold text-sm"
//               ></th>
//             </tr>
//           </thead>
//           <tbody>
//             {slicedTableData.map((row, index) => (
//               <tr
//                 key={row.id || index}
//                 className="bg-white border-b hover:bg-gray-50 min-h-[72px]"
//               >
//                 {headers.map((header, colIndex) => (
//                   <td
//                     key={colIndex}
//                     className="px-4 py-4 font-medium text-[#475467] whitespace-nowrap"
//                   >
//                     {row[header.toLowerCase()] || row[header]}
//                   </td>
//                 ))}
//                 {onEdit || onDelete ? (
//                   <td className="px-4 py-4 text-center">
//                     <Dropdown
//                       size="sm"
//                       label=""
//                       renderTrigger={() => (
//                         <span>
//                           <HiOutlineDotsVertical color="black" size={20} />
//                         </span>
//                       )}
//                       dismissOnClick={true}
//                     >
//                       <Dropdown.Item
//                         icon={() => (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="currentColor"
//                             class="bi bi-pencil-square"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                             <path
//                               fill-rule="evenodd"
//                               d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
//                             />
//                           </svg>
//                         )}
//                       >
//                         <div className="w-full px-2 py-1 flex items-center text-sm hover:bg-gray-100">
//                           <span className="text-gray-950 text-sm capitalize">
//                             Edit
//                           </span>
//                         </div>
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         icon={() => (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="currentColor"
//                             class="bi bi-trash3"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                           </svg>
//                         )}
//                       >
//                         <div
//                           type="button"
//                           className="w-full px-2 py-1 flex items-center text-[15px] hover:bg-gray-100"
//                         >
//                           <span className="text-gray-950 text-sm capitalize">
//                             Delete
//                           </span>
//                         </div>
//                       </Dropdown.Item>
//                     </Dropdown>
//                   </td>
//                 ) : (
//                   ""
//                 )}
//               </tr>
//             ))}
//           </tbody>
// <nav
//   className="table-navigation-section"
//   aria-label="Table navigation"
// >
//   <div className="table-pagination">
//     <Pagination
//       totalPages={tableData?.totalPages}
//       currentPage={tableData?.currentPage}
//       onPageChange={handlePageChange}
//     />
//   </div>
// </nav>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CustomTable;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Pagination from "./Pagination";

const CustomTable = ({
  headers,
  data,
  navigateTo,
  title,
  viewAllText,
  onEdit,
  onDelete,
  view
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setFilters({ search: e.target.value });
  };

  const filteredData = data.filter((item) =>
    headers.some((header) =>
      item[header.toLowerCase()]
        ?.toString()
        .toLowerCase()
        .includes(filters.search.toLowerCase())
    )
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const slicedTableData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full p-5 border shadow-sm rounded-md">
      {title && (
        <div className="flex justify-between items-center my-3">
          <p className="text-black font-medium text-[17px]">{title}</p>
          {navigateTo && (
            <button
              type="button"
              onClick={() => navigate(navigateTo)}
              className="text-base text-blue-700 font-normal cursor-pointer"
            >
              {viewAllText || "View All"}
            </button>
          )}
        </div>
      )}

      <div className="relative overflow-x-auto rounded-lg custom-scrollbar">
        {onDelete || onEdit ? (
          <div className="relative mx-auto flex my-3 pb-4">
            <input
              type="search"
              value={filters.search}
              onChange={handleSearchChange}
              className="text-xs cursor-pointer h-10 w-3/5 rounded-lg border border-gray-300 bg-transparent pr-6 outline-none focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        ) : (
          ""
        )}

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 min-w-[152px] font-semibold text-sm"
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 min-w-[100px] font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {slicedTableData.map((row, index) => (
              <tr
                key={row.id || index}
                className="bg-white border-b hover:bg-gray-50 min-h-[72px]"
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-4 font-medium text-gray-700 whitespace-nowrap"
                  >
                    {row[header.toLowerCase()] || "-"}
                  </td>
                ))}
                {onEdit || onDelete ? (
                  <td className="px-4 py-4 text-center relative">
                    <Dropdown
                      size="sm"
                      label="" 
                      className=""
                      renderTrigger={() => (
                        <HiOutlineDotsVertical color="black" size={20} />
                      )}
                    >
                      {view ? (
                        <Dropdown.Item className="py-1" onClick={() => navigate(`/admin/dashoard/view/feedbacks/details/${row.id}`)}>
                          View
                        </Dropdown.Item>
                      ):""}
                      {onEdit && (
                        <Dropdown.Item className="py-1" onClick={() => onEdit(row)}>
                          Edit
                        </Dropdown.Item>
                      )}
                      {onDelete && (
                        <Dropdown.Item className="py-1" onClick={() => onDelete(row)}>
                          Delete
                        </Dropdown.Item>
                      )}
                    </Dropdown>
                  </td>
                ): ""}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {onEdit || onDelete ? (
        <nav
          className="flex justify-start items-center w-full mt-3"
          aria-label="Table navigation"
        >
          <div className="table-pagination">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomTable;
