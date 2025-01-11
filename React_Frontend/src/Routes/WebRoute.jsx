import { Routes, Route } from "react-router-dom";
import ContactUsPage from "../Pages/contactUsPage";
import HomePage from "../Pages/homePage";
import AboutCompany from "../Pages/AboutPages/aboutCompany";
import CompanyHistory from "../Pages/AboutPages/companyHistory";
import AspenHeights from "../Pages/ProjectPage/AspenHeights";
import BaysideResidences from "../Pages/ProjectPage/BaysideResidences";
import ForestHillTowers from "../Pages/ProjectPage/ForestHillTowers";
import ParkviewPlaza from "../Pages/ProjectPage/ParkviewPlaza";
import ArchitectureDesign from "../Pages/ServicesPage/ArchitectureDesign";
import BuildingConstruction from "../Pages/ServicesPage/BuildingConstruction";
import BuildingMaintenance from "../Pages/ServicesPage/BuildingMaintenance";
import BuildingRenovation from "../Pages/ServicesPage/BuildingRenovation";
import FlooringRoofing from "../Pages/ServicesPage/FlooringRoofing";
import ProjectManagement from "../Pages/ServicesPage/ProjectManagement";
import BlogPage from "../Pages/blogPage";


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

        {/* Service Route */}
        <Route path="/architecture-design" element={<ArchitectureDesign />} />
        <Route path="/building-construction" element={<BuildingConstruction />} />
        <Route path="/building-maintenance" element={<BuildingMaintenance />} />
        <Route path="/building-renovation" element={<BuildingRenovation />} />
        <Route path="/flooring-roofing" element={<FlooringRoofing />} />
        <Route path="/project-management" element={<ProjectManagement />} />

        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </>
  );
};

export default AppRoute;
