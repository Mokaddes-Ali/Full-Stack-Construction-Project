import { Routes, Route } from "react-router-dom";

import ContactUsPage from "../Pages/contactUsPage";
import HomePage from "../Pages/homePage";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
    </>
  );
};

export default AppRoute;
