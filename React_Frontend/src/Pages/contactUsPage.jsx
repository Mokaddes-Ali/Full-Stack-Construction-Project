import { Fragment } from 'react'
import Contact from '../Components/Frontend/ContactForm/Contact'
import NavbarSection from '../Components/Frontend/Navbar/NavbarSection'
import ContactPageTitle from '../Components/Frontend/Contact/ContactPageTitle'
import WebLayout from '../layouts/webside/WebLayout'
import GoogleMap from '../Components/Frontend/Contact/GoogleMap'


const ContactUsPage = () => {
  return (

    <>
    <div className="">
    <WebLayout>
      <ContactPageTitle />
       <Contact /> 
       <GoogleMap />
    </WebLayout>
    </div>
    </>
   
    

  )
}

export default ContactUsPage