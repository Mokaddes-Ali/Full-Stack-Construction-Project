import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import RouteApp from './Routes/RouteApp';
import HeroSection from './Components/Herosection';
import Login from './Components/Backend/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <HeroSection />
    <Login />
    <RouteApp />

    </BrowserRouter>
    <ToastContainer />
    
    </>
  )
}

export default App