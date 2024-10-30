
import Login from '../Components/Backend/login';
import ServiceCard from '../Components/ServiceCard';
import { Project } from '../Components/project';
import Testimonial from '../Components/Testimonial/Testimonial';
import NavbarSection from '../Components/Navbar/NavbarSection';
import ScrollNavbarSection from '../Components/Navbar/ScrollNavbarSection';
import HeroSection from '../Components/HeroSection';

const homePage = () => {
  return (
    <>
    <div>
      <NavbarSection />
       <ScrollNavbarSection />
         <HeroSection /> 

        <Login />
        <Testimonial />
       <ServiceCard />  
         <Project /> 
        
    </div>
    </>
  )
}

export default homePage