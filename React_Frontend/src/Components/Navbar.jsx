
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsMoon, BsSun } from 'react-icons/bs';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className={`fixed w-full dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-transform ${
        isScrolled ? 'translate-y-0' : '-translate-y-20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            {isDarkMode ? <BsSun /> : <BsMoon />}
          </button>

          <button
            onClick={handleMobileMenuToggle}
            className="inline-flex items-center p-2 ml-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
            aria-controls="navbar-default"
            aria-expanded={isMobileMenuOpen}
          >
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
        </div>

        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-orange-500 underline'
                    : 'block py-2 px-3 text-gray-900 dark:text-white hover:text-orange-500'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-orange-500 underline'
                    : 'block py-2 px-3 text-gray-900 dark:text-white hover:text-orange-500'
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-orange-500 underline'
                    : 'block py-2 px-3 text-gray-900 dark:text-white hover:text-orange-500'
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-orange-500 underline'
                    : 'block py-2 px-3 text-gray-900 dark:text-white hover:text-orange-500'
                }
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-orange-500 underline'
                    : 'block py-2 px-3 text-gray-900 dark:text-white hover:text-orange-500'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
