import React, { Fragment } from 'react'
import ContactForm from '../Components/Contact/ContactForm'
import Contact from '../Components/Frontend/ContactForm/Contact'
import NavbarSection from '../Components/Navbar/NavbarSection'

const ContactUsPage = () => {
  return (

    <Fragment>

<NavbarSection />
      <div className=" mx-auto max-w-7xl ml-24">
    
     
       <Contact />
        </div>
      

    </Fragment>
   
    

  )
}

export default ContactUsPage