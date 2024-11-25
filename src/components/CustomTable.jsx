import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";

const CustomTable = ({
  headers,
  data,
  navigateTo,
  title,
  viewAllText,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-5 border shadow-sm rounded-md">
      {title && (
        <div className="flex justify-between items-center my-3">
          <p className="text-back font-medium text-[17px]">{title}</p>
          {navigateTo && (
            <button
              type="button"
              onClick={() => navigate(navigateTo)}
              className="text-base text-blue-700 font-normal cursor-pointer"
            >
              {viewAllText || ""}
            </button>
          )}
        </div>
      )}
      <div className="relative overflow-x-auto rounded-lg custom-scrollbar">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 min-w-[152px] font-semibold text-sm"
                >
                  {header}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 min-w-[100px] font-semibold text-sm"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className="bg-white border-b hover:bg-gray-50 min-h-[72px]"
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-4 font-medium text-[#475467] whitespace-nowrap"
                  >
                    {row[header.toLowerCase()] || row[header]}
                  </td>
                ))}
                <td className="px-4 py-4 text-center">
                  <Dropdown label="Actions" inline={true}>
                    <Dropdown.Item onClick={() => onEdit(row)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onDelete(row)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
