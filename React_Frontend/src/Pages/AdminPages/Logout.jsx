import React from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const navigate = useNavigate();

  // Handle logout logic here

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Logout</h1>
      <p>You have been logged out.</p>
      <button 
        className="bg-blue-500 text-white p-2 rounded-lg"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Logout;
