import HeroSection from '../Components/Herosection';
import Login from '../Components/Backend/login';
import ServiceCard from '../Components/ServiceCard';
import { Project } from '../Components/project';
import Testimonial from '../Components/Testimonial/Testimonial';
import NavbarSection from '../Components/Navbar/NavbarSection';

const Home = () => {
  return (
    <div>
      <NavbarSection />
        <HeroSection />
        <Login />
        <Testimonial />
        <ServiceCard />
        <Project />
        
    </div>
  )
}

export default Home