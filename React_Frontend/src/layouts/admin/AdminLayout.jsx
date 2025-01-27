import NavbarSection from '../../Components/Frontend/Navbar/NavbarSection';
import Sidebar from '../../layouts/admin/Sidebar';
import DarkModeButton from './DarkModeButton';



const AdminLayout = ({ children }) => (
  <>
  <div className="">
    <div className="w-[95%] mx-auto">
 <NavbarSection />
  <div className="flex mx-auto bg-slate-300 dark:bg-gray-800 dark:text-white">
  <Sidebar />
    
    <div className="flex flex-col flex-1 w-screen">
      <main className="flex-1">
        <div className="fixed top-32 z-50 right-0 p-4">
        <DarkModeButton />
        </div>
        {children}
        </main>
    </div>
  </div>
  </div>
  </div>
  </>
);




export default AdminLayout;
