
 
import React, { useState , useContext } from 'react';


const ChangeDirectionButton = () => {
  const [isLeft, setIsLeft] = useState(true);

  const toggleDirection = () => {
    setIsLeft(!isLeft);
    document.documentElement.dir = isLeft ? 'rtl' : 'ltr';
  };
  return (
    <div className="flex justify-center items-center mt-5">
      <button
        className=" text-red-400 font-bold py-2 px-3 rounded flex items-center focus:outline-none focus:ring-0"
        onClick={toggleDirection}
      >
        {isLeft ? 'RTL' : 'LTR'}
      </button>
    </div>
  );
};

export default ChangeDirectionButton;
