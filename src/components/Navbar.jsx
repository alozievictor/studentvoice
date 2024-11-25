import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleClick = () => setNav(!nav);
  const handleClose = () => {
    untoggleNav();
    setNav(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);
      if (newWindowWidth <= 768) {
        setNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links = [
    { to: "/about", label: "About" },
    { to: "/service", label: "Services" },
    { to: "/contact", label: "Contact us" },
  ];

  const [scrolling, setScrolling] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    setShowComponent(false);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentUrl]);

  const toggleNav = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const untoggleNav = () => {
    setNav(nav);
    document.body.style.overflow = "";
  };

  return (
    <header
      className={`md:fixed drop-shadow relative w-full transition-colors duration-300  ${
        scrolling ? "bg-white w-full" : "bg-transparent w-full"
      } `}
      style={{ zIndex: nav ? "10" : "1" }}
    >
      <div className={`w-full top-0 h-[11vh] pt-3`}>
        <div className="md:w-[80%] mx-auto px-2 flex justify-between items-center">
          {windowWidth > 768 ? (
            <Link to="/" class="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span
                class={`self-center text-2xl font-semibold whitespace-nowrap ${
                  scrolling ? "text-blue-800" : "text-white"
                }`}
              >
                StudentVoice
              </span>
            </Link>
          ) : (
            <Link to="/" class="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span
                class={`self-center text-2xl font-semibold whitespace-nowrap ${
                  scrolling ? "text-blue-700" : "text-white"
                }`}
              >
                StudentVoice
              </span>
            </Link>
          )}

          <div className="flex items-center lg:space-x-5">
            {windowWidth > 768 && (
              <div className="flex flex-col items-center md:flex-row md:space-x-8">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-base font-medium pt-2 focus:outline-none cursor-pointer hover:text-blue-600 transition duration-300 ${
                      scrolling ? "text-blue-800" : "text-white "
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <div className="md:flex mt-1.5 items-center space-x-5">
              <Link to="/login"
                className={`p-2.5 border text-base text-center cursor-pointer lg:w-24 rounded-md tra ${
                  scrolling
                    ? "bg-blue-700 text-white"
                    : "border-white hover:border-blue-700 hover:text-white hover:bg-blue-700 text-white"
                }`}
              >
                Login
              </Link>
            </div>
          </div>

          <div
            className="md:hidden w-full px-2 pt-3 flex justify-end items-end"
            onClick={toggleNav}
          >
            {nav ? (
              <FaTimes
                className={`w-6 flex justify-end items-end ${
                  scrolling ? "text-white" : "text-black"
                }`}
              />
            ) : (
              <FaBars
                className={`w-6 flex justify-end items-end ${
                  scrolling ? "text-white" : "text-black"
                }`}
              />
            )}
          </div>
        </div>

        <ul
          className={`${
            !nav ? "-translate-x-full" : "translate-x-0"
          } md:hidden w-full bg-white h-[100vh] drop-shadow-sm absolute top-0 left-0 transition-transform duration-300 mt-[16%]`}
        >
          {links.map((link) => (
            <li
              key={link.to}
              className="border-b-2 border-zinc-100 w-full text-center py-5 cursor-pointer hover:text-[#f39c12] transition duration-300"
            >
              <Link
                onClick={handleClose}
                to={link.to}
                smooth={true}
                duration={500}
                className=" z-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
