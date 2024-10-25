
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useState } from 'react';

const AdminLayout = ({ children }) => {
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
  <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">

        <Sidebar isOpen={isSidebarOpen} isLargeScreenOpen={isLargeScreenSidebarOpen} toggleSidebar={toggleSidebar} />

        <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <Topbar toggleSidebar={toggleSidebar} toggleLargeScreenSidebar={toggleLargeScreenSidebar} isLargeScreenOpen={isLargeScreenSidebarOpen} />
          <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
