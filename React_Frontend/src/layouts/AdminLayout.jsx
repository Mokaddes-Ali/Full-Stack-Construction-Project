
import Sidebar from '../layouts/Sidebar';
import Topbar from '../layouts/Topbar';

const AdminLayout = ({ children }) => (
  <div className="flex h-[750px] bg-slate-300 dark:bg-gray-800 dark:text-white">
    <Sidebar className="fixed"  />
    <div className="flex flex-col flex-1 w-[1200px]">
      <Topbar  />
      <main className="flex-1 p-4">{children}</main>
    </div>
  </div>
);




export default AdminLayout;
