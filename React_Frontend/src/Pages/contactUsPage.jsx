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
         {/* Google Map Section */}
      <div className="mt-10">
        <iframe
          className="w-full h-64 lg:h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902343434343!2d88.6011363153167!3d24.37449437975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef1a1a1a1a1a%3A0x1a1a1a1a1a1a1a1a!2sRajshahi%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1633072331234!5m2!1sen!2sbd"
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
        </div>
    </Fragment>
   
    

  )
}

export default ContactUsPage