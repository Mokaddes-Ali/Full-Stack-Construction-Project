import { Routes, Route } from "react-router-dom";
import ContactUsPage from "../Pages/contactUsPage";
import HomePage from "../Pages/homePage";
import AboutCompany from "../Pages/AboutPages/aboutCompany";
import CompanyHistory from "../Pages/AboutPages/companyHistory";
import AspenHeights from "../Pages/ProjectPage/AspenHeights";
import BaysideResidences from "../Pages/ProjectPage/BaysideResidences";
import ForestHillTowers from "../Pages/ProjectPage/ForestHillTowers";
import ParkviewPlaza from "../Pages/ProjectPage/ParkviewPlaza";


const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about-company"  element={<AboutCompany />} />
        <Route path="/company-history"  element={<CompanyHistory />} />

        {/* project route */}
        <Route path="/aspen-heights" element={<AspenHeights />} />
        <Route path="/bayside-residences" element={<BaysideResidences />} />
        <Route path="/forest-hill-towers" element={<ForestHillTowers />} />
        <Route path="/parkview-plaza" element={<ParkviewPlaza />} />

        
      </Routes>
    </>
  );
};

export default AppRoute;
