// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Layout from './Components/Layout'; // Import Layout component

// import Dashboard from './Pages/Dashboard';
// import Notifications from './Pages/Notifications';
// import Messages from './Pages/Messages';
// import Feedback from './Pages/Feedback';

// import UserList from './Pages/User/UserList';
// import AddUser from './Pages/User/AddUser';
// import UserRoles from './Pages/User/UserRoles';
// import UserPermissions from './Pages/User/UserPermissions';
// import UserActivity from './Pages/User/UserActivity';

// import ProductList from './Pages/Products/ProductList';
// import AddProduct from './Pages/Products/AddProduct';
// import Categories from './Pages/Products/Categories';
// import Brands from './Pages/Products/Brands';
// import Inventory from './Pages/Products/Inventory';
// import Account from './Pages/Settings/Account';
// import Privacy from './Pages/Settings/Privacy';
// import NotificationsSettings from './Pages/Settings/Notifications';
// import Integration from './Pages/Settings/Integration';
// import SalesReport from './Pages/Reports/SalesReport';
// import CustomerReport from './Pages/Reports/CustomerReport';
// import ProductReport from './Pages/Reports/ProductReport';
// import TransactionReport from './Pages/Reports/TransactionReport';
// import Overview from './Pages/Analytics/Overview';
// import Traffic from './Pages/Analytics/Traffic';
// import Sales from './Pages/Analytics/Sales';
// import UserBehavior from './Pages/Analytics/UserBehavior';

// import Home from './Pages/Home';
// import SearchPage from './Pages/SearchPage';
// import Profile from './Pages/Profile';
// import Logout from './Pages/Logout';


// const App = () => {
//   return (
//     <Router>
//       <div>
//       </div>
//       <Routes>
//         <Route path="/" element={ <Layout><Dashboard /> </Layout>} />
//         <Route path="/profile" element={<Layout><Profile /> </Layout>} />
//         <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
//         <Route path="/messages" element={<Layout><Messages /></Layout>} />
//         <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
//         <Route path="/user/list" element={<Layout><UserList /></Layout>} />
//         <Route path="/user/add" element={<Layout><AddUser /></Layout>} />
//         <Route path="/user/roles" element={<Layout><UserRoles /></Layout>} />
//         <Route path="/user/permissions" element={<Layout><UserPermissions /></Layout>} />
//         <Route path="/user/activity" element={<Layout><UserActivity /></Layout>} />
//         <Route path="/products/list" element={<Layout><ProductList /></Layout>} />
//         <Route path="/products/add" element={<Layout><AddProduct /></Layout>} />
//         <Route path="/products/categories" element={<Layout><Categories /></Layout>} />
//         <Route path="/products/brands" element={<Layout><Brands /></Layout>} />
//         <Route path="/products/inventory" element={<Layout><Inventory /></Layout>} />
//         <Route path="/settings/account" element={<Layout><Account /></Layout>} />
//         <Route path="/settings/privacy" element={<Layout><Privacy /></Layout>} />
//         <Route path="/settings/notifications" element={<Layout><NotificationsSettings /></Layout>} />
//         <Route path="/settings/integration" element={<Layout><Integration /></Layout>} />
//         <Route path="/reports/sales" element={<Layout><SalesReport /></Layout>} />
//         <Route path="/reports/customers" element={<Layout><CustomerReport /></Layout>} />
//         <Route path="/reports/products" element={<Layout><ProductReport /></Layout>} />
//         <Route path="/reports/transactions" element={<Layout><TransactionReport /></Layout>} />
//         <Route path="/analytics/overview" element={<Layout><Overview /></Layout>} />
//         <Route path="/analytics/traffic" element={<Layout><Traffic /></Layout>} />
//         <Route path="/analytics/sales" element={<Layout><Sales /></Layout>} />
//         <Route path="/analytics/user-behavior" element={<Layout><UserBehavior /></Layout>} />
//         <Route path="/search" element={<Layout><SearchPage /></Layout>} />
//         <Route path="/logout" element={<Layout><Logout /></Layout>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import{ useState } from 'react';
import { BrowserRouter ,Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import { ColorProvider } from '../context/ColorContext';
import Dashboard from '../Pages/Dashboard';
import Settings from '../Pages/Settings';
import SettingsProfile from '../Pages/SettingsProfile';
import SettingsAccount from '../Pages/SettingsAccount';
import Users from '../Pages/Users';
import UsersList from '../Pages/UsersList';
import UsersRoles from '../Pages/UsersRoles';
import Courses from '../Pages/Courses';
import CoursesList from '../Pages/CoursesList';
import CoursesCategories from '../Pages/CoursesCategories';
import Products from '../Pages/Products';
import ProductsList from '../Pages/ProductsList';
import ProductsCategories from '../Pages/ProductsCategories';
import More from '../Pages/More';
import Reports from '../Pages/Reports';
import MoreSettings from '../Pages/MoreSettings';

      

function AppRoute() {
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
    <ColorProvider>
    <div className="flex h-screen bg-slate-300 dark:bg-gray-800 dark:text-white">
     <BrowserRouter>
        <Sidebar isOpen={isSidebarOpen} isLargeScreenOpen={isLargeScreenSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1">
          <Topbar toggleSidebar={toggleSidebar} toggleLargeScreenSidebar={toggleLargeScreenSidebar} isLargeScreenOpen={isLargeScreenSidebarOpen} />
          <main className="flex-1 p-4">
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<SettingsProfile />} />
            <Route path="/settings/account" element={<SettingsAccount />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/list" element={<UsersList />} />
            <Route path="/users/roles" element={<UsersRoles />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/list" element={<CoursesList />} />
            <Route path="/courses/categories" element={<CoursesCategories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/list" element={<ProductsList />} />
            <Route path="/products/categories" element={<ProductsCategories />} />
            <Route path="/more" element={<More />} />
            <Route path="/more/reports" element={<Reports />} />
            <Route path="/more/settings" element={<MoreSettings />} />
          </Routes>
          </main>
        </div>
        </BrowserRouter>
    </div>
    </ColorProvider>
    </>
  );
}

export default AppRoute;
