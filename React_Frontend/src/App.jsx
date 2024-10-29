
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorProvider } from "./layouts/context/ColorContext";
import AppRoute from "./Routes/WebRoute";
import AdminRoute from "./Routes/AdminRoute";


const App = () => {

  return (
    <>
    <ColorProvider>
     <BrowserRouter>

     <AppRoute />
     <AdminRoute />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      
      />
      </BrowserRouter>
    </ColorProvider>
    </>
  );
};

export default App;
