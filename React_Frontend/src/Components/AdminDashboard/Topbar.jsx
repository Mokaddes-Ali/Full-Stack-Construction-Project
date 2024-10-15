import { useState, useEffect, useRef } from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { MdDarkMode, MdLightMode,MdMenu } from 'react-icons/md'; 
import { AiOutlineClose } from 'react-icons/ai';
import { TfiAlignRight,TfiAlignLeft } from "react-icons/tfi";
import { FaExpand, FaCompress } from 'react-icons/fa';
import { useColor } from '../context/ColorContext';
import ThemeControl from './ThemeControl';
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import DarkModeButton from './DarkModeButton';



const TopBar = ({ toggleSidebar, toggleLargeScreenSidebar, isLargeScreenOpen }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { textColor } = useColor(); // Get colors from context

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const cardRef = useRef(null);


  const closeAll = () => {
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
    setIsSearchVisible(false);
    setIsCardVisible(false);
  };


  const handleNotificationToggle = () => {
    closeAll(); 
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleProfileToggle = () => {
    closeAll();
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSearch = () => {
    closeAll(); 
    setIsSearchVisible(!isSearchVisible);
  };

  const handleCardToggle = () => {
    closeAll(); 
    setIsCardVisible(!isCardVisible);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current && !notificationRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target) &&
        searchRef.current && !searchRef.current.contains(event.target) &&
        cardRef.current && !cardRef.current.contains(event.target)
      ) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center justify-between p-1 h-16 shadow dark:bg-black dark:text-white bg-green-100 " style={{ color: textColor }}>
      {/* Mobile Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="focus:outline-none md:hidden ml-4">
        <MdMenu className="h-6 w-6" />
      </button>
      {/* Large Screen Sidebar Toggle Button */}
      <button onClick={toggleLargeScreenSidebar} className="hidden ml-4 md:flex focus:outline-none">
        {/* Icon change based on Sidebar state */}
        {isLargeScreenOpen ? (
          <TfiAlignRight className="h-7 w-7 hover:text-blue-700" />
        ) : (
          <TfiAlignLeft className="h-7 w-7 hover:text-blue-700" />
        )}
      </button>

      <div className="flex items-center justify-between xl:ml-96 lg:ml-80 sm:ml-48 md:ml-10 gap-12 p-4">
        <div className="flex items-center">
         <DarkModeButton />
        </div>

        <div className="relative" ref={notificationRef}>
          <button onClick={handleNotificationToggle} className="mr-1">
            <FaBell className="h-7 w-7 hover:text-blue-700" />
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 bg-gray-700 text-white w-48 rounded-md shadow-lg p-2">
              <div className="p-2 hover:bg-gray-600">Notification 1</div>
              <div className="p-2 hover:bg-gray-600">Notification 2</div>
            </div>
          )}
        </div>

        <div className="relative" ref={searchRef}>
          <button onClick={toggleSearch} className="mr-1">
            <FaSearch className="h-7 w-7 hover:text-blue-700" />
          </button>
          {isSearchVisible && (
            <div className="absolute top-12 right-0 w-72 rounded-md shadow-lg p-4">
              <button onClick={toggleSearch} className="absolute top-2 right-2">
                <AiOutlineClose className="h-6 w-6" />
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-md w-full"
              />
            </div>
          )}
        </div>

        <button onClick={toggleFullScreen} className="mr-1 flex items-center p-2 rounded hover:text-blue-700 transition duration-200">
          {isFullScreen ? (
            <>
              <FaCompress className="h-7 w-7" />
            </>
          ) : (
            <>
              <FaExpand className="h-7 w-7" />
            </>
          )}
        </button>

        <div className="relative" ref={profileRef}>
          <button onClick={handleProfileToggle} className="mr-1">
            <FaUserCircle className="h-7 w-7 hover:text-blue-700" />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 bg-gray-700 text-white w-48 rounded-md shadow-lg p-2">
              <div className="p-2 hover:bg-gray-600" onClick={() => setIsProfileOpen(false)}>Profile</div>
              <div className="p-2 hover:bg-gray-600" onClick={() => setIsProfileOpen(false)}>Settings</div>
              <div className="p-2 hover:bg-gray-600" onClick={() => setIsProfileOpen(false)}>Logout</div>
            </div>
          )}
        </div>

        <div className="relative" ref={cardRef}>
          <button onClick={handleCardToggle} className="py-2 px-4 rounded flex items-center">
            {isCardVisible ? (
              <>
                <IoClose className="mr-2 h-7 w-7 hover:text-blue-700" />
              </>
            ) : (
              <>
                <CiMenuBurger className="mr-2 h-7 w-7 hover:text-blue-700" />
              </>
            )}
          </button>

          {isCardVisible && (
            <div className="fixed right-0 mt-5 bg-white text-black w-64 h-full shadow-lg p-4 transition-transform transform translate-x-0">
              <button onClick={handleCardToggle} className="absolute top-2 right-2">
                <AiOutlineClose className="hover:text-blue-700" />
              </button>
              <ThemeControl />
            </div>
          )}
        </div>
      </div>
      <div className="space-x-4">
      </div>
    </div>
  );
};

export default TopBar;
