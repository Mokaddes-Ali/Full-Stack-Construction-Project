import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteApp from './Routes/RouteApp';
import HeroSection from './Components/Herosection';
import Login from './Components/Backend/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/Backend/Dashboard';
import Home from './Pages/Home';
import NavbarSection from './Components/Navbar/NavbarSection';
import RequireAuth from './Components/RequireAuth';

import CreatePost from './Components/Backend/Crud/CreatePost';
import ShowPosts from './Components/Backend/Crud/ShowPosts';
import EditPost from './Components/Backend/Crud/EditPost';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavbarSection />
   
  
    {/* <RouteApp /> */}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <RequireAuth>
          <Dashboard />
          </RequireAuth>
           } />

<Route path="/show" element={<ShowPosts />}/>
<Route path="/create-post" element={<CreatePost />} />
<Route path="/edit-post/:id" element={<EditPost />} />
       
    </Routes>

    </BrowserRouter>
    <ToastContainer 
    position="top-center"
    
    /> {/* Toast container for showing notifications */}
    
    </>
  )
}

export default App