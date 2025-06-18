import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/Backend/Dashboard";
import RequireAuth from "../Components/Backend/RequireAuth";
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
import ProtectedRoute from "../Components/Backend/ProtectedRoute";
import Login from "../Components/Backend/login";
import ArticleAdd from "../Components/Backend/article/ArticleAdd";
import ArticleEdit from "../Components/Backend/article/ArticleEdit";
import ArticleIndex from "../Components/Backend/article/ArticleIndex";
import SubscriberTable from "../Components/Backend/SubscriberTable";
import SendEmailPage from "../Components/Backend/SendEmailPage";


      
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

  <Route path="/subscribers" element={
     <RequireAuth>
      <SubscriberTable />
      </RequireAuth>
    } />
  <Route path="/send-email" element={
     <RequireAuth>
      <SendEmailPage />
      </RequireAuth>} />

       

        

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
              path="/admin/article/add"
              element={
                <RequireAuth>
                  <ArticleAdd />
                </RequireAuth>
              }
            />

          <Route path="/admin/articles/edit/:id" element={
              <RequireAuth>
              <ArticleEdit />
              </RequireAuth>
              } />

            <Route path="/admin/article/index" element={
               <RequireAuth>
                    <ArticleIndex />
               </RequireAuth>
              } />
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
               } /> 
            <Route path="/service/add" element={
               <RequireAuth>
                  <CreateServices />
               </RequireAuth>
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