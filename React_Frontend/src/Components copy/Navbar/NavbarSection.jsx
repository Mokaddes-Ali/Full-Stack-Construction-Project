import React,{useEffect, useState} from "react";
import { Navbar, Collapse, Typography, Button, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavbarList from "./NavbarList";
import { motion, useAnimation } from "framer-motion";


const NavbarSection = () => {
      const [openNav, setOpenNav] = useState(false);
      const [scrolled, setScrolled] = useState(false);
      const [isDarkMode, setIsDarkMode] = useState(false);


      useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    
      useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false)
        );
      }, []);
    
    
      const controls = useAnimation();
    
      useEffect(() => {
        controls.start({
          height: scrolled ? '4rem' : '5rem', // Adjust these values as needed
          width: scrolled ? '90vw' : '100vw', // Adjust padding here
          x: scrolled ? '5vw' : '0',
          backgroundColor: scrolled ? 'gray' : '',
          transition: { duration: 0.3 }
        });
      }, [scrolled, controls]);
      
      const handleNavLinkClick = () => {
        setOpenNav(false);
      };
    
      return (
        <motion.nav
        className={`fixed top-0 left-0 w-full z-50 mx-auto px-4 py-2 shadow-md rounded-2xl mt-2 transition-all duration-300 ${
          scrolled ? "h-12 bg-gray-200" : "h-16"
        } ${isDarkMode ? "bg-black text-white" : "text-orange-500"}`}
        animate={controls}
      >
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            >
              Material Tailwind
            </Typography>
            <div className="hidden lg:block">
               <NavbarList />
            </div>
            <div className="hidden gap-2 lg:flex">
              <Button size="sm">Get Started</Button>
              <Button variant="outlined" size="sm">Log In</Button>
            </div>
            <IconButton
              variant="text"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: openNav ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className={`block md:hidden ${isDarkMode ? "bg-black" : ""}`}
      >
          <Collapse open={openNav}>
            <NavbarList />
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Button size="sm" fullWidth>Get Started</Button>
              <Button variant="outlined" size="sm" fullWidth>Log In</Button>
            </div>
          </Collapse>
          </motion.div>
        </motion.nav>
      );
    }
export default NavbarSection;