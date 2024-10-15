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
import {default as ShowServices} from './Components/Backend/services/show';
import {default as CreateServices} from './Components/Backend/services/create';
import AppRoute from './Routes/RouteApp';
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

<Route path="/admin/services" element={
          <RequireAuth>
          <ShowServices />
          </RequireAuth>
           } />

<Route path="/admin/services/create" element={
          <RequireAuth>
        <CreateServices />
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
    <AppRoute />
    
    </>
  )
}

export default App