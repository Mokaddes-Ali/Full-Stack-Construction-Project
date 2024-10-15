import React, { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark Mode Toggle Function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  // Effect to apply dark mode based on state
  useEffect(() => {
    const storedMode = localStorage.getItem('theme');
    if (storedMode === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Store mode in local storage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center p-2 transition duration-200 ease-in-out rounded-full focus:outline-none"
      title="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <MdLightMode className="text-yellow-400 w-8 h-8" />
      ) : (
        <MdDarkMode className="text-gray-800 w-8 h-8" />
      )}
    </button>
  );
};
export default DarkModeButton;
