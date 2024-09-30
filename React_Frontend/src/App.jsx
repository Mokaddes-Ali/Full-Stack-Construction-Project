import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteApp from './Routes/RouteApp';
import HeroSection from './Components/Herosection';
import Login from './Components/Backend/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/Backend/Dashboard';
import Home from './Pages/Home';

const App = () => {
  return (
    <>
    <BrowserRouter>
   
    <Login />
    {/* <RouteApp /> */}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

    </BrowserRouter>
    <ToastContainer 
    position="top-center"
    
    /> {/* Toast container for showing notifications */}
    
    </>
  )
}

export default App