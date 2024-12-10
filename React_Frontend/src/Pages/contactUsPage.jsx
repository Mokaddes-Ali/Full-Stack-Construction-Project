import { Fragment } from 'react'
import Contact from '../Components/Frontend/ContactForm/Contact'
import NavbarSection from '../Components/Frontend/Navbar/NavbarSection'
import ServicesPageTitle from '../Components/Frontend/Services/ServicesPageTitle'


const ContactUsPage = () => {
  return (

    <Fragment>
      <NavbarSection />
      <ServicesPageTitle />
      <div className=" mx-auto">
       <Contact />
        </div>
    </Fragment>
   
    

  )
}

export default ContactUsPage