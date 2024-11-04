import React, { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar({ isAuthenticated, activeLink, setActiveLink }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [activeLink, setActiveLink] = useState('Home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#111827] border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqi7QH3SDl1UbJaTZIza0P0daJQPEeG6twKQ&s"
            className="h-8 w-8 rounded-full object-cover"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold text-white">
            FarmShield
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-[#1f2937] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            {navLinks.map(
              (link) =>
                (link.name !== "Dashboard" || isAuthenticated) && (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => handleClick(link.name)}
                      className={`block py-2 px-3 rounded ${
                        activeLink === link.name
                          ? "text-white bg-blue-700 md:bg-transparent md:text-blue-500"
                          : "text-gray-400 hover:bg-gray-700 md:hover:text-blue-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
            )}
            {!isAuthenticated && (
              <li>
                <Link
                  to="/login"
                  onClick={() => handleClick("Login")}
                  className={`block py-2 px-3 rounded ${
                    activeLink === "Login"
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-500"
                      : "text-gray-400 hover:bg-gray-700 md:hover:text-blue-500"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
