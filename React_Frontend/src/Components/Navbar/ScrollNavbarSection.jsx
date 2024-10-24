import React, { useEffect, useState } from "react";
import { Navbar, Collapse, Typography, Button, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavbarList from "./NavbarList";
import { motion } from "framer-motion";

export default function ScrollNavbarSection() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 350); // 350px স্ক্রল হলে
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
        scrolled ? "bg-gray-800 text-white mx-auto max-w-7xl w-screen ml-10 mr-10 rounded-2xl" : 
        "bg-gray-800 text-white mx-auto max-w-7xl w-screen ml-10 mr-10 rounded-2xl"
      }`}
      initial={{ y: "-100%" }} // Initially hide the navbar
      animate={{ y: scrolled ? 10 : "-100%" }} // Show on scroll
    >
      <div className={`flex items-center justify-between transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}>
        <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">
          <NavbarList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button variant="text" size="sm" color="blue-gray">
            Log In
          </Button>
          <Button variant="gradient" size="sm">
            Sign In
          </Button>
        </div>
        <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
          {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavbarList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Log In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign In
          </Button>
        </div>
      </Collapse>
    </motion.nav>
    </div>
    </>
  );
}

