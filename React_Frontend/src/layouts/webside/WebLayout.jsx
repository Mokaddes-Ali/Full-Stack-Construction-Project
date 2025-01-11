import Footer from "../../Components/Frontend/Footer/Footer"
import NavbarSection from "../../Components/Frontend/Navbar/NavbarSection"
import ScrollNavbarSection from "../../Components/Frontend/Navbar/ScrollNavbarSection"


const WebLayout = ({children}) => {
  return (
    <>
    <div className="">
        <NavbarSection />
        <ScrollNavbarSection />
        <main>
            {children}
        </main>
        <Footer />
    </div>
    </>
  )
}

export default WebLayout