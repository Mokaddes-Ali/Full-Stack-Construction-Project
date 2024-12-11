
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorProvider } from "./layouts/context/ColorContext";
import AdminRoute from "./Routes/AdminRoute";
import WebRoute from "./Routes/WebRoute";
import { AuthProvider } from "./Components/Backend/context/AuthContext";



const App = () => {

  return (
    <>
     <AuthProvider>
    <ColorProvider>
     <BrowserRouter>
     <WebRoute />
     <AdminRoute />
      <ToastContainer
        position="top-center"
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
    </AuthProvider>
    </>
  );
};

export default App;
