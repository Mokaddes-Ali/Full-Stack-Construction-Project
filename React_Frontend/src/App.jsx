
import { BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ColorProvider } from "./Components/AdminDashboard/context/ColorContext";
import AppRoute from "./Routes/AppRoute";


const App = () => {
  return (
    <>
      <ColorProvider>
      <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
        {/* Toast for notification */}
        <ToastContainer position="top-center" />
      </ColorProvider>
    </>
  );
};

export default App;
