import React from 'react'
import HeroSection from '../Components/Herosection'
import Login from '../Components/Backend/login'
import ServiceCard from '../Components/ServiceCard'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <Login />
        <ServiceCard />
    </div>
  )
}

export default Home