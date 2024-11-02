import React, { Fragment } from 'react'
import ContactForm from '../Components/Frontend/Contact/ContactForm'
import Contact from '../Components/Frontend/ContactForm/Contact'
import NavbarSection from '../Components/Frontend/Navbar/NavbarSection'
import Googlemap from '../Components/Frontend/Contact/Googlemap'
import ServicesPageTitle from '../Components/Frontend/Services/ServicesPageTitle'


const ContactUsPage = () => {
  return (

    <Fragment>
      <NavbarSection />
      <ServicesPageTitle />
      <div className=" mx-auto">
        <Googlemap />
       <Contact />
        </div>
    </Fragment>
   
    

  )
}

export default ContactUsPage