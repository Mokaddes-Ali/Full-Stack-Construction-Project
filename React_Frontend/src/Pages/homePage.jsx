
import Login from '../Components/Backend/login';
import ServiceCard from '../Components/ServiceCard';
import { Project } from '../Components/project';
import Testimonial from '../Components/Frontend/Testimonial/Testimonial';
import NavbarSection from '../Components/Frontend/Navbar/NavbarSection';
import ScrollNavbarSection from '../Components/Frontend/Navbar/ScrollNavbarSection';
import Footer from '../Components/Frontend/Footer/Footer';
import InnerAbout from '../Components/InnerAbout';
import AboutSection from '../Components/AboutSection';
import StatsSection from '../Components/StatsSection';
import TeamMember from '../Components/Frontend/TeamMember/TeamMember';
import Contact from '../Components/Frontend/ContactForm/Contact';
import Users from '../Components/Backend/Register/Uers'
import Register from '../Components/Register';


const HomePage = () => {
  return (
    <>
      <div className="">
      <NavbarSection />
       <ScrollNavbarSection />
         <Users />
         <InnerAbout />
         <AboutSection />
         <ServiceCard />
         <StatsSection />
         <TeamMember />
        <Login />
        <Contact />
        <Register />
        
        <Footer /> 
        <Testimonial />
        <ServiceCard />  
         <Project />  
         </div>
        
    </>
  )
}

export default HomePage