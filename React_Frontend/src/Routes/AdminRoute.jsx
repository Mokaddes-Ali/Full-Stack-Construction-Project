import { Routes, Route } from "react-router-dom";
// import Login from "../Components/Backend/login";
import Dashboard from "../Components/Backend/Dashboard";
import RequireAuth from "../Components/RequireAuth";
import { default as ShowServices } from "../Components/Backend/services/show";
import { default as CreateServices } from "../Components/Backend/services/create";
import { default as EditServices } from "../Components/Backend/services/edit";

import { default as ShowProjects } from "../Components/Backend/projects/show";
import { default as CreateProjects } from "../Components/Backend/projects/create";
import { default as EditProjects  } from "../Components/Backend/projects/edit";



import SettingsAccount from "../Pages/AdminDashboardPages/SettingsAccount";
import UsersList from "../Pages/AdminDashboardPages/UsersList";
import UsersRoles from "../Pages/AdminDashboardPages/UsersRoles";
import ProductsList from "../Pages/AdminDashboardPages/ProductsList";
import ProductsCategories from "../Pages/AdminDashboardPages/ProductsCategories";
import More from "../Pages/AdminDashboardPages/More";
import MoreSettings from "../Pages/AdminDashboardPages/MoreSettings";
import {default as CreateHeroSlide } from "../Components/Backend/hero_slider/create";
import CreateService from "../Pages/AdminDashboardPages/Services/create";
import ProtectedRoute from "../Components/ProtectedRoute";
import Login from "../Components/Backend/login";


      
const AdminRoute = () => (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                       <Dashboard />
                </ProtectedRoute>
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
              path="/hero/add"
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


            {/* project */}

            <Route
              path="/admin/projects"
              element={
                <RequireAuth>
                <ShowProjects />
                </RequireAuth>
              }
            />

             <Route
              path="/admin/projects/create"
              element={
                <RequireAuth>
                  <CreateProjects />
                </RequireAuth>
              }
            />

              <Route
              path="/admin/projects/edit/:id"
              element={
                <RequireAuth>
                  <EditProjects />
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

