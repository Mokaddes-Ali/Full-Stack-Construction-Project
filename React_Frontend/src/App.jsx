
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ColorProvider } from "./layouts/context/ColorContext";
import AppRoute from "./Routes/AppRoute";
import { useState } from "react";
import AdminRoute from "./Routes/AdminRoute";


const App = () => {

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
     <BrowserRouter>
     <AppRoute />
     <AdminRoute />
      <ToastContainer />
        </BrowserRouter>
    </ColorProvider>
    </>
  );
};

export default App;
