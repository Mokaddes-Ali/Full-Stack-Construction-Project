import { useState } from "react";
import { useLocation } from "react-router-dom";
import {MdSettings,MdDashboard,MdPeople,MdLibraryBooks,MdShoppingCart} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi2";

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  // Each dropdown state
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);

  // Sidebar close function for mobile view
  const handleSidebarClose = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  // Toggle functions for each dropdown
  const handleDropdownToggle1 = () => setIsDropdownOpen1((prev) => !prev);
  const handleDropdownToggle2 = () => setIsDropdownOpen2((prev) => !prev);
  const handleDropdownToggle3 = () => setIsDropdownOpen3((prev) => !prev);
  const handleDropdownToggle4 = () => setIsDropdownOpen4((prev) => !prev);
  const handleDropdownToggle5 = () => setIsDropdownOpen5((prev) => !prev);

  // Hover functions for each dropdown
  const handleDropdownHover1 = () => setIsDropdownOpen1(true);
  const handleDropdownLeave1 = () => setIsDropdownOpen1(false);

  const handleDropdownHover2 = () => setIsDropdownOpen2(true);
  const handleDropdownLeave2 = () => setIsDropdownOpen2(false);

  const handleDropdownHover3 = () => setIsDropdownOpen3(true);
  const handleDropdownLeave3 = () => setIsDropdownOpen3(false);

  const handleDropdownHover4 = () => setIsDropdownOpen4(true);
  const handleDropdownLeave4 = () => setIsDropdownOpen4(false);

  const handleDropdownHover5 = () => setIsDropdownOpen5(true);
  const handleDropdownLeave5 = () => setIsDropdownOpen5(false);

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-44 bg-blue-600 dark:bg-black dark:text-white text-white p-5 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative `}
      >
        <div className="flex items-center space-x-2 mb-6">
          <span className={`text-2xl font-body mt-5`}>Admin Panel</span>
        </div>
        {/* Sidebar Nav */}
        <nav>
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            className={`flex items-center space-x-2 mb-4`}
            activeClassName="bg-blue-800"
            onClick={handleSidebarClose}
          >
            <MdDashboard className="h-6 w-6 ml-2  text-white" />
            <span className="text-white text-lg flex ">Dashboard <span className="text-white"> <HiChevronDown className="group-hover:rotate-180" /> </span></span>
          </NavLink>

          {/* Dropdown 1 - Settings */}
          <div
            className="relative"
            onMouseEnter={handleDropdownHover1}
            onMouseLeave={handleDropdownLeave1}
          >
            <div
              className={`flex items-center justify-between cursor-pointer p-2 rounded-md ${
                location.pathname.includes("/settings") ? "bg-blue-800" : ""
              }`}
              onClick={handleDropdownToggle1}
            >
              <div className="flex items-center space-x-2">
                <MdSettings className="h-6 w-6" />
                <span className="text-lg">Settings
                </span>
              </div>
            </div>
            {/* Dropdown menu outside of sidebar */}
            {isDropdownOpen1 && (
              <div className="absolute ml-32 top-0 bg-white text-blue-600 w-48 shadow-lg rounded-md mt-2">
                <NavLink
                  to="/settings/profile"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  Profile Settings
                </NavLink>
                <NavLink
                  to="/settings/account"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  Account Settings
                </NavLink>
              </div>
            )}
          </div>

          {/* Dropdown 2 - Users */}
          <div
            className="relative"
            onMouseEnter={handleDropdownHover2}
            onMouseLeave={handleDropdownLeave2}
          >
            <div
              className={`flex items-center justify-between cursor-pointer p-2 rounded-md ${
                location.pathname.includes("/users") ? "bg-blue-800" : ""
              }`}
              onClick={handleDropdownToggle2}
            >
              <div className="flex items-center space-x-2">
                <MdPeople className="h-6 w-6 " />
                <span className="text-lg">Users</span>
              </div>
            </div>
            {/* Dropdown menu outside of sidebar */}
            {isDropdownOpen2 && (
              <div className="absolute left-full top-0 bg-white text-blue-600 w-48 shadow-lg rounded-md mt-2">
                <NavLink
                  to="/users/list"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  User List
                </NavLink>
                <NavLink
                  to="/users/roles"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  User Roles
                </NavLink>
              </div>
            )}
          </div>

          {/* Dropdown 3 - Services */}
          <div
            className="relative"
            onMouseEnter={handleDropdownHover3}
            onMouseLeave={handleDropdownLeave3}
          >
            <div
              className={`flex items-center justify-between cursor-pointer p-2 rounded-md ${
                location.pathname.includes("/courses") ? "bg-blue-800" : ""
              }`}
              onClick={handleDropdownToggle3}
            >
              <div className="flex items-center space-x-2">
                <MdLibraryBooks className="h-6 w-6" />
                <span className="text-lg">Services</span>
              </div>
            </div>
            {/* Dropdown menu outside of sidebar */}
            {isDropdownOpen3 && (
              <div className="absolute left-full top-0 bg-white text-blue-600 w-48 shadow-lg rounded-md mt-2">
                <NavLink
                  to="/service/list"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                 Service List
                </NavLink>
                <NavLink
                  to="/service/add"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  Services Add
                </NavLink>
              </div>
            )}
          </div>

          {/* Dropdown 4 - Products */}
          <div
            className="relative"
            onMouseEnter={handleDropdownHover4}
            onMouseLeave={handleDropdownLeave4}
          >
            <div
              className={`flex items-center justify-between cursor-pointer p-2 rounded-md ${
                location.pathname.includes("/products") ? "bg-blue-800" : ""
              }`}
              onClick={handleDropdownToggle4}
            >
              <div className="flex items-center space-x-2">
                <MdShoppingCart className="h-6 w-6" />
                <span className="text-lg">Products</span>
              </div>
            </div>
            {/* Dropdown menu outside of sidebar */}
            {isDropdownOpen4 && (
              <div className="absolute left-full top-0 bg-white text-blue-600 w-48 shadow-lg rounded-md mt-2">
                <NavLink
                  to="/products/list"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  Product List
                </NavLink>
                <NavLink
                  to="/products/categories"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  Product Categories
                </NavLink>
              </div>
            )}
          </div>

          {/* Dropdown 5 - More Options */}
          <div
            className="relative"
            onMouseEnter={handleDropdownHover5}
            onMouseLeave={handleDropdownLeave5}
          >
            <div
              className={`flex items-center justify-between cursor-pointer p-2 rounded-md ${
                location.pathname.includes("/more") ? "bg-blue-800" : ""
              }`}
              onClick={handleDropdownToggle5}
            >
              <div className="flex items-center space-x-2">
                <MdDashboard className="h-6 w-6" />
                <span className="text-lg">More Options</span>
              </div>
            </div>
            {/* Dropdown menu outside of sidebar */}
            {isDropdownOpen5 && (
              <div className="absolute left-full top-0 bg-white text-blue-600 w-48 shadow-lg rounded-md mt-2">
                <NavLink
                  to="/more/reports"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  Reports
                </NavLink>
                <NavLink
                  to="/more/settings"
                  className="block p-2 rounded-md hover:bg-blue-800 hover:text-white"
                  onClick={handleSidebarClose}
                >
                  More Settings
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
