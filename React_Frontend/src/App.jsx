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





import LayoutRoute from './Routes/LayoutRoute';  // Import the layout route

import Settings from './Pages/AdminPages/Settings';
import SettingsProfile from './Pages/AdminPages/SettingsProfile';
import SettingsAccount from './Pages/AdminPages/SettingsAccount';
import Users from './Pages/AdminPages/Users';
import UsersList from './Pages/AdminPages/UsersList';
import UsersRoles from './Pages/AdminPages/UsersRoles';
import Courses from './Pages/AdminPages/Courses';
import CoursesList from './Pages/AdminPages/CoursesList';
import CoursesCategories from './Pages/AdminPages/CoursesCategories';
import Products from './Pages/AdminPages/Products';
import ProductsList from './Pages/AdminPages/ProductsList';
import ProductsCategories from './Pages/AdminPages/ProductsCategories';
import More from './Pages/AdminPages/More';
import Reports from './Pages/AdminPages/Reports';
import MoreSettings from './Pages/AdminPages/MoreSettings';
import { ColorProvider } from './Components/AdminDashboard/context/ColorContext';

const App = () => {
  return (
    <>
      <ColorProvider>
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



       <Route path="/logindashboard" element={
        <RequireAuth><LayoutRoute /> </RequireAuth>}>
        {/* All the nested routes will render inside the AdminLayout */}
        <Route index element={ <RequireAuth><Dashboard /> </RequireAuth>} />
        <Route path="settings" element={<Settings /> } />
        <Route path="settings/profile" element={<RequireAuth> <SettingsProfile /> </RequireAuth>} />
        <Route path="settings/account" element={<RequireAuth> <SettingsAccount /> </RequireAuth>} />
        <Route path="users" element={<RequireAuth> <Users /> </RequireAuth>} />
        <Route path="users/list" element={<RequireAuth> <UsersList /> </RequireAuth>} />
        <Route path="users/roles" element={<UsersRoles />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/list" element={<CoursesList />} />
        <Route path="courses/categories" element={<CoursesCategories />} />
        <Route path="products" element={<Products />} />
        <Route path="products/list" element={<ProductsList />} />
        <Route path="products/categories" element={<ProductsCategories />} />
        <Route path="more" element={<More />} />
        <Route path="more/reports" element={<Reports />} />
        <Route path="more/settings" element={<MoreSettings />} />
      </Route>


       
    </Routes>

    </BrowserRouter>
    <ToastContainer 
    position="top-center"
    
    /> {/* Toast container for showing notifications */}
    </ColorProvider>

    
    </>
  )
}

export default App