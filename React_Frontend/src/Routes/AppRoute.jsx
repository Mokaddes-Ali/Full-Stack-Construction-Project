import { Routes, Route } from "react-router-dom";
import Login from "../Components/Backend/login";


import Dashboard from "../Components/Backend/Dashboard";
import Home from "../Pages/Home";
import NavbarSection from "../Components/Navbar/NavbarSection";
import RequireAuth from "../Components/RequireAuth";

import CreatePost from "../Components/Backend/Crud/CreatePost";
import ShowPosts from "../Components/Backend/Crud/ShowPosts";
import EditPost from "../Components/Backend/Crud/EditPost";
import { default as ShowServices } from "../Components/Backend/services/show";
import { default as CreateServices } from "../Components/Backend/services/create";
import { default as EditServices } from "../Components/Backend/services/edit";

import SettingsProfile from "../Pages/AdminDashboardPages/SettingsProfile";
import SettingsAccount from "../Pages/AdminDashboardPages/SettingsAccount";

import UsersList from "../Pages/AdminDashboardPages/UsersList";
import UsersRoles from "../Pages/AdminDashboardPages/UsersRoles";
import CoursesList from "../Pages/AdminDashboardPages/CoursesList";
import CoursesCategories from "../Pages/AdminDashboardPages/CoursesCategories";
import ProductsList from "../Pages/AdminDashboardPages/ProductsList";
import ProductsCategories from "../Pages/AdminDashboardPages/ProductsCategories";
import More from "../Pages/AdminDashboardPages/More";
import MoreSettings from "../Pages/AdminDashboardPages/MoreSettings";


const AppRoute = () => {
  return (
    <>
    <Routes>
            <Route path="/" element={<Home />} />
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

            <Route path="/show" element={<ShowPosts />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
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
            <Route path="/courses/list" element={
                 <RequireAuth>
              
                 <ShowServices />
                 </RequireAuth>
              //  <CoursesList />
               } />
            <Route path="/courses/categories" element={
               <RequireAuth>
               <CreateServices />
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
    </>
  )
}

export default AppRoute
