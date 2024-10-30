
import Sidebar from '../layouts/Sidebar';
import Topbar from '../layouts/Topbar';

const AdminLayout = ({ children }) => (
  <>
  <div className="w-screen h-screen lg:w-screen md:w-screen sm:w-screen">
  <div className="flex mx-auto bg-slate-300 dark:bg-gray-800 dark:text-white">
    <Sidebar className="fixed"  />
    <div className="flex flex-col flex-1 w-screen">
      <Topbar  />
      <main className="flex-1 p-2">{children}</main>
    </div>
  </div>
  </div>
  </>
);




export default AdminLayout;
