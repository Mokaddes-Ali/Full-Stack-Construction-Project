
import Login from '../Components/Backend/login';
import ServiceCard from '../Components/ServiceCard';
import { Project } from '../Components/project';
import Testimonial from '../Components/Frontend/Testimonial/Testimonial';
import NavbarSection from '../Components/Frontend/Navbar/NavbarSection';
import ScrollNavbarSection from '../Components/Frontend/Navbar/ScrollNavbarSection';
import HeroSection from '../Components/HeroSection';
import Footer from '../Components/Frontend/Footer/Footer';
import InnerAbout from '../Components/InnerAbout';
import AboutSection from '../Components/AboutSection';
import StatsSection from '../Components/StatsSection';
import TeamMember from '../Components/Frontend/TeamMember/TeamMember';
import Contact from '../Components/Frontend/ContactForm/Contact';


const HomePage = () => {
  return (
    <>
      <div className="">
      <NavbarSection />
       <ScrollNavbarSection />
         <HeroSection /> 
         <InnerAbout />
         <AboutSection />
         <StatsSection />
         <TeamMember />
        <Login />
        <Contact />
        
        <Footer /> 
        <Testimonial />
        <ServiceCard />  
         <Project />  
         </div>
        
    </>
  )
}

export default HomePage