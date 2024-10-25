import { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

// Create Color Provider Component
export const ColorProvider = ({ children }) => {
  const [textColor, setTextColor] = useState('#000'); // Default Text Color: Black
  const [backgroundColor, setBackgroundColor] = useState('#fff'); // Default Background Color: White
  const [direction, setDirection] = useState('ltr'); // Default Direction: Left to Right
  return (
    <ColorContext.Provider value={{ textColor, setTextColor, backgroundColor, setBackgroundColor, direction, setDirection }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to use the Color Context
export const useColor = () => useContext(ColorContext);
