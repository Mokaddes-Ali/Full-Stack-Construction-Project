import React from 'react'
import HeroSection from '../Components/Herosection'
import Login from '../Components/Backend/login'
import ServiceCard from '../Components/ServiceCard'
import { Project } from '../Components/project'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <Login />
        <ServiceCard />
        <Project />
        
    </div>
  )
}

export default Home