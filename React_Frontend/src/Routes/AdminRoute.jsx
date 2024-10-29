// import{ useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from '../Pages/Dashboard';
// import Settings from '../Pages/Settings';
// import SettingsProfile from '../Pages/SettingsProfile';
// import SettingsAccount from '../Pages/SettingsAccount';
// import Users from '../Pages/Users';
// import UsersList from '../Pages/UsersList';
// import UsersRoles from '../Pages/UsersRoles';
// import Courses from '../Pages/Courses';
// import CoursesList from '../Pages/CoursesList';
// import CoursesCategories from '../Pages/CoursesCategories';
// import Products from '../Pages/Products';
// import ProductsList from '../Pages/ProductsList';
// import ProductsCategories from '../Pages/ProductsCategories';
// import More from '../Pages/More';
// import Reports from '../Pages/Reports';
// import MoreSettings from '../Pages/MoreSettings';
// import AdminLayout from '../layouts/AdminLayout';


import { Routes, Route } from "react-router-dom";
import Login from "../Components/Backend/login";


import Dashboard from "../Components/Backend/Dashboard";
import Home from "../Pages/Home";
import RequireAuth from "../Components/RequireAuth";




import { default as ShowServices } from "../Components/Backend/services/show";
import { default as CreateServices } from "../Components/Backend/services/create";
import { default as EditServices } from "../Components/Backend/services/edit";

import SettingsProfile from "../Pages/AdminDashboardPages/SettingsProfile";
import SettingsAccount from "../Pages/AdminDashboardPages/SettingsAccount";

import UsersList from "../Pages/AdminDashboardPages/UsersList";
import UsersRoles from "../Pages/AdminDashboardPages/UsersRoles";
import ProductsList from "../Pages/AdminDashboardPages/ProductsList";
import ProductsCategories from "../Pages/AdminDashboardPages/ProductsCategories";
import More from "../Pages/AdminDashboardPages/More";
import MoreSettings from "../Pages/AdminDashboardPages/MoreSettings";
import {default as CreateHeroSlide } from "../Components/Backend/hero_slider/create";
import AdminLayout from "../layouts/AdminLayout";
import CreateService from "../Pages/AdminDashboardPages/Services/create";


      
const AdminRoute = ({  }) => (
    <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/admin/services"
              element={
                <RequireAuth>
                  <ShowServices />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/services/create"
              element={
                <RequireAuth>
                  <CreateServices />
                </RequireAuth>
              }
            />
               <Route
              path="/admin/services/edit/:id"
              element={
                <RequireAuth>
                 <EditServices />
                </RequireAuth>
              }
            />

          <Route
              path="/admin/hero_slider/create"
              element={
                <RequireAuth>
                 <CreateHeroSlide />
                </RequireAuth>
              }
            />

           
            <Route
              path="create-service"
              element={
                <RequireAuth>
                  <CreateServices />
                </RequireAuth>
              }
            />

            <Route
              path="settings/account"
              element={
                <RequireAuth>
                  <SettingsAccount />
                </RequireAuth>
              }
            />

            <Route
              path="/logindashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/users/list"
              element={
                <RequireAuth>
                  <UsersList />
                </RequireAuth>
              }
            />

            <Route path="/users/roles" element={<UsersRoles />} />
            <Route path="/service/list" element={
                 <RequireAuth>
              
                 <ShowServices />
                 </RequireAuth>
              //  <CoursesList />
               } />
            <Route path="/service/add" element={
               <RequireAuth>
                <CreateService />
               </RequireAuth>
              // <CoursesCategories />
              } />
            <Route path="/products/list" element={
               <RequireAuth>
              <ProductsList />
              </RequireAuth>
              } />
            <Route
              path="/products/categories"
              element={
               <RequireAuth> 
               <ProductsCategories />
               </RequireAuth>
              }
            />
            <Route path="/more" element={
               <RequireAuth>
               <More />
               </RequireAuth>
               } />
            <Route path="/more/settings" element={
               <RequireAuth>
              <MoreSettings />
               </RequireAuth>
               } />
    </Routes>
);

export default AdminRoute;