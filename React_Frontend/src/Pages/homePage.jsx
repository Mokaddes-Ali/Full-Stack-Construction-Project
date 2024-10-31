
import Login from '../Components/Backend/login';
import ServiceCard from '../Components/ServiceCard';
import { Project } from '../Components/project';
import Testimonial from '../Components/Testimonial/Testimonial';
import NavbarSection from '../Components/Navbar/NavbarSection';
import ScrollNavbarSection from '../Components/Navbar/ScrollNavbarSection';
import HeroSection from '../Components/HeroSection';
import Footer from '../Components/Footer/Footer';
import InnerAbout from '../Components/InnerAbout';
import AboutSection from '../Components/AboutSection';
import StatsSection from '../Components/StatsSection';

const HomePage = () => {
  return (
    <>
    <div>
      <NavbarSection />
       {/* <ScrollNavbarSection /> */}
         {/* <HeroSection /> 
         <InnerAbout /> */}
         <AboutSection />
         {/* <StatsSection /> */}

        <Login />
        
        {/* <Footer /> */}
        {/* <Testimonial /> */}
       {/* <ServiceCard />   */}
         {/* <Project />  */}
        
    </div>
    </>
  )
}

export default HomePage