// routes/LayoutRoute.js
import { Outlet } from 'react-router-dom';
import AdminLayout from '../Components/AdminDashboard/layouts/AdminLayout';

const LayoutRoute = () => {
  return (
    <AdminLayout>
      <Outlet /> {/* Outlet will render the nested routes */}
    </AdminLayout>
  );
};

export default LayoutRoute;
