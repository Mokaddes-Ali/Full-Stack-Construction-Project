import React, { useEffect, useState } from "react";
import { Navbar, Collapse, Typography, Button, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavbarList from "./NavbarList";
import { motion } from "framer-motion";
import logo from '../../../assets/Images/hero logo.png'
import { NavLink } from "react-router-dom";

export default function ScrollNavbarSection() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavLinkClick = () => {
    setOpenNav(false);
  };

  return (
    <>
  <div className={`w-screen bg-red-500`}>
    <motion.nav
      className={`fixed  top-0 left-0  z-50 px-4 py-2 transition-all duration-300 shadow-lg ${
        scrolled ? "bg-brown-100 text-white mx-auto max-w-6xl w-screen ml-24 mr-24 rounded-2xl" : 
        "bg-gray-800 text-white mx-auto max-w-7xl w-screen ml-10 mr-10 rounded-2xl"
      }`}
      initial={{ y: "-100%" }} // Initially hide the navbar
      animate={{ y: scrolled ? 10 : "-100%" }} // Show on scroll
    >
      <div className={`flex items-center justify-between transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}>
      <Typography as="a" to="/" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
        <img
          src={logo}
        className="w-[55px] h-[50px] animate-imgRotate "
        />
        </Typography>
        <div className="hidden lg:block">
          <NavbarList />
        </div>
        <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
          {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavbarList />
      </Collapse>
    </motion.nav>
    </div>
    </>
  );
}

