import React from 'react';
import { useColor } from '../context/ColorContext';
import ChangeDirectionButton from './ChangeDirectionButton';

const ThemeControl = () => {
  const { setTextColor, setBackgroundColor, setDirection } = useColor();

  // Deep Colors
  const textColors = [
    '#FFFFFF', // White
    '#FF0000', // Red
    '#000000', // Black
    '#0000FF', // Blue
    '#00FF00', // Green
    '#FFA500', // Orange
    '#FF00FF', // Magenta
  ];
  const bgColors = ['#CCCCCC', '#BBDEFB', '#C8E6C9', '#E1BEE7', '#FFE0B2', '#FFCDD2'];

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h2 className="font-bold">Change Text Color:</h2>
      <div className="flex space-x-2">
        {textColors.map((color) => (
          <button
            key={color}
            onClick={() => setTextColor(color)}
            style={{ backgroundColor: color }}
            className="w-8 h-8 rounded-full border-2"
          ></button>
        ))}
      </div>

      <h2 className="font-bold">Change Background Color:</h2>
      <div className="flex space-x-2">
        {bgColors.map((color) => (
          <button
            key={color}
            onClick={() => setBackgroundColor(color)}
            style={{ backgroundColor: color }}
            className="w-8 h-8 rounded-full border-2"
          ></button>
        ))}
      </div>
      <h2 className="font-bold">Change Direction:</h2>
      <ChangeDirectionButton />
    </div>
  );
};

export default ThemeControl;
