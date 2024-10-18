import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Backend/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Backend/Dashboard";
import Home from "./Pages/Home";
import NavbarSection from "./Components/Navbar/NavbarSection";
import RequireAuth from "./Components/RequireAuth";

import CreatePost from "./Components/Backend/Crud/CreatePost";
import ShowPosts from "./Components/Backend/Crud/ShowPosts";
import EditPost from "./Components/Backend/Crud/EditPost";
import { default as ShowServices } from "./Components/Backend/services/show";
import { default as CreateServices } from "./Components/Backend/services/create";

import SettingsProfile from "./Pages/AdminPages/SettingsProfile";
import SettingsAccount from "./Pages/AdminPages/SettingsAccount";

import UsersList from "./Pages/AdminPages/UsersList";
import UsersRoles from "./Pages/AdminPages/UsersRoles";
import CoursesList from "./Pages/AdminPages/CoursesList";
import CoursesCategories from "./Pages/AdminPages/CoursesCategories";
import ProductsList from "./Pages/AdminPages/ProductsList";
import ProductsCategories from "./Pages/AdminPages/ProductsCategories";
import More from "./Pages/AdminPages/More";
import Reports from "./Pages/AdminPages/Reports";
import MoreSettings from "./Pages/AdminPages/MoreSettings";
import { ColorProvider } from "./Components/AdminDashboard/context/ColorContext";


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

            <Route path="/show" element={<ShowPosts />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route
              path="create-post"
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
            <Route path="/courses/list" element={<CoursesList />} />
            <Route path="/courses/categories" element={<CoursesCategories />} />
            <Route path="/products/list" element={<ProductsList />} />
            <Route
              path="/products/categories"
              element={<ProductsCategories />}
            />
            <Route path="/more" element={<More />} />
            <Route path="/more/reports" element={<Reports />} />
            <Route path="/more/settings" element={<MoreSettings />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-center" />{" "}
        {/* Toast container for showing notifications */}
      </ColorProvider>
    </>
  );
};

export default App;
