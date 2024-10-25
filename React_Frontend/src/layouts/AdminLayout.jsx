
import Sidebar from '../layouts/Sidebar';
import Topbar from '../layouts/Topbar';

const AdminLayout = ({ children, toggleSidebar, toggleLargeScreenSidebar, isSidebarOpen, isLargeScreenSidebarOpen }) => (
  <div className="flex h-screen bg-slate-300 dark:bg-gray-800 dark:text-white">
    <Sidebar isOpen={isSidebarOpen} isLargeScreenOpen={isLargeScreenSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="flex flex-col flex-1">
      <Topbar toggleSidebar={toggleSidebar} toggleLargeScreenSidebar={toggleLargeScreenSidebar} isLargeScreenOpen={isLargeScreenSidebarOpen} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  </div>
);




export default AdminLayout;
