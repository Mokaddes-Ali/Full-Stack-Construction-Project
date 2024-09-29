import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';
import RouteApp from './Routes/RouteApp';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <RouteApp />
    </BrowserRouter>
  );
};

export default App;
