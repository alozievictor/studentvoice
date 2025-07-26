import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { UseAppContext } from "../../service/context";
import { useNavigate } from "react-router-dom";

const Admin_Nav = () => {
  const { User, logout } = UseAppContext();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="w-full h-[10vh] border-b-2 drop-shadow-sm bg-white lg:flex justify-center items-center fixed top-0">
      <div className="w-[95%] lg:w-[90%] flex justify-between items-center py-3">
        <div class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span
            class={`self-center text-2xl font-semibold whitespace-nowrap text-blue-800`}
          >
            StudentVoice
          </span>
        </div>

        <div class="flex items-center lg:shrink-0 lg:flex-nowrap">
          <div class="relative flex items-center ml-2 lg:ml-4">
            <a
              href="javascript:void(0)"
              class="flex items-center justify-center w-10 h-10 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary active:text-primary focus:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </a>
          </div>
          <div class="relative flex items-center ml-2 lg:ml-4">
            <a
              href="javascript:void(0)"
              class="flex items-center justify-center w-10 h-10 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary active:text-primary focus:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                ></path>
              </svg>
            </a>
          </div>
          <div className="relative flex items-center ml-2 lg:ml-4">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-center w-10 h-10 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary active:text-primary focus:text-primary"
            >
              <FaRegUser size={20} />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium">{User?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{User?.email || 'user@example.com'}</p>
                </div>
                <div className="py-1">
                  <button onClick={() => navigate(User?.role === 'admin' ? '/admin/dashboard' : '/student/questions')} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <HiViewGrid className="mr-2" /> Dashboard
                  </button>
                  <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                    <HiLogout className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Nav;
