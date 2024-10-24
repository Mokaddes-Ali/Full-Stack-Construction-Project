import HeroSection from '../Components/Herosection';
import Login from '../Components/Backend/login';
import ServiceCard from '../Components/ServiceCard';
import { Project } from '../Components/project';
import Testimonial from '../Components/Testimonial/Testimonial';

const Home = () => {
  return (
    <div>
        <HeroSection />
        <Login />
        <Testimonial />
        <ServiceCard />
        <Project />
        
    </div>
  )
}

export default Home