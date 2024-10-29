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

import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AdminRoutes from "./AdminRoute";
import { ColorProvider } from "../layouts/context/ColorContext";



const AppRoute = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreenSidebarOpen, setIsLargeScreenSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLargeScreenSidebar = () => {
    setIsLargeScreenSidebarOpen(!isLargeScreenSidebarOpen);
  };

  return (
    <>
 <Routes>
      <Route path="/" element={<Home />} />
            
          </Routes>
    </>
  )
}

export default AppRoute
