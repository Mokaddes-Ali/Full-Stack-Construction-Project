import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const menuItems = [
  {
    title: "Home",
    path: "/",
    dropdowns: [
      { title: "Home Page 1", path: "/home-page-1" },
      { title: "Home Page 2", path: "/home-page-2" },
    ],
    height: "200px",
    width: "w-64",
    bgColor: "bg-red-100",
  },
 {
  title: "About Us",
  dropdowns: [
    { title: "About Us 1", path: "/about-us-1" },
    { title: "About Us 2", path: "/about-us-2" },
  ],
  height: "200px",
  width: "w-64",
  bgColor: "bg-red-100",
 },
  {
    title: "Services",
    path: "/Services",
    dropdowns: [
      { title: "Building Construction", path: "/services-building-construction" },
      { title: "Architecture Design", path: "/services-architecture-design" },
      { title: "Building Renovation", path: "/services-building-renovation" },
      { title: "Flooring & Roofing", path: "/services-flooring-roofing" },
      { title: "Building Maintenance", path: "/services-building-maintenance" },
      { title: "Project Management", path: "/services-project-management" },
      
    ],
    height: "230px",
    width: "w-64",
    bgColor: "bg-yellow-100",
  },

  {
    title: "Projects",
    path: "/projects",
    dropdowns: [
      { title: "Aspen Heights", path: "/aspen-heights" },
      { title: "Forest Hill Towers", path: "/forest-hill-towers" },
      { title: "Bayside Residences", path: "/bayside-residences" },
      { title: "Parkview Plaza", path: "/parkview-plaza" },
    ],
    height: "220px",
    width: "w-80",
    bgColor: "bg-green-100",
  },
  {
    title: "Blog",
    path: "/blog",
    dropdowns: [
      { title: "Blog 1", path: "/blog-1" },
      { title: "Blog 2", path: "/blog-2" }
    ],
    height: "300px",
    width: "w-80",
    bgColor: "bg-purple-100",
  },

  {
    title: "Pages",
    path: "/pages",
    dropdowns: [
      { title: "Our Team", path: "/pages-our-team" },
      { title: "FAQs", path: "/pages-faqs" },
      { title: "Pricing", path: "/pages-pricing" },
      { title: "Testimonials", path: "/pages-testimonials" },
      { title: "Image Gallery", path: "/pages-image-gallery" },
      { title: "Profile", path: "/pages-profile" },
      { title: "Our Works", path: "/pages-our-works" },
      { title: "Private Policy", path: "/pages-private-policy" },
      { title: "404 Page", path: "/pages-404-page" },
    ],
    height: "250px",
    width: "w-72",
    bgColor: "bg-blue-100",
  },
  {
    title: "Contact Us",
    path: "/contact",
    dropdowns: [
      { title: "Contact Us 1", path: "/contact-us-1" },
      { title: "Contact Us 2", path: "/contact-us-2" },
    ],
    height: "240px",
    width: "w-72",
    bgColor: "bg-pink-100",
  },
];


function NavListMenu({ title, items, height, width, bgColor, onNavLinkClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = items.map(({ title, path }, key) => (
    <NavLink
      to={path}
      key={key}
      onClick={onNavLinkClick}
      className={({ isActive }) =>
        `block py-2 px-4 text-gray-900 ${
          isActive ? "text-orange-500" : ""
        } hover:text-orange-500`
      }
    >
      {title}
    </NavLink>
  ));

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="font-medium cursor-pointer"
          >
            <ListItem
              className={`flex items-center gap-2 py-2 pr-4 font-medium text-gray-900 ${
                isMenuOpen || isMobileMenuOpen ? "text-orange-500" : ""
              }`}
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {title}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform md:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform md:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className={` rounded-xl ${bgColor} border-none shadow-none`}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: height }}
            transition={{ duration: 0.5 }}
            className={`overflow-hidden ${width} bg-transparent border-none shadow-none`}
          >
            {renderItems}
          </motion.div>
        </MenuList>
      </Menu>
      <div className="block md:hidden">
        <Collapse open={isMobileMenuOpen}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: height }}
            transition={{ duration: 0.5 }}
            className={`overflow-hidden ${width} ${bgColor} bg-transparent border-none shadow-none`}
          >
            {renderItems}
          </motion.div>
        </Collapse>
      </div>
    </>
  );
}

function NavList({ onNavLinkClick }) {
  return (
    <List className="mb-6 mt-4 p-0 md:mb-0 md:mt-0 md:flex-row md:p-1 border-none shadow-none">
      {menuItems.map(({ title, path, dropdowns, height, width, bgColor }) => (
        <NavListMenu
          key={title}
          title={title}
          items={dropdowns}
          height={height}
          width={width}
          bgColor={bgColor}
          onNavLinkClick={onNavLinkClick}
        />
      ))}
    </List>
  );
}

export function NavbarSection() {
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
      <div className="flex items-center justify-between">
        <Typography
          as={NavLink}
          to="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 md:ml-2"
        >
          Material Tailwind
        </Typography>
        <div className="hidden md:block border-none shadow-none">
          <NavList onNavLinkClick={handleNavLinkClick} />
        </div>
        <div className="hidden gap-2 md:flex">
          <Button size="sm">Get Started</Button>
        </div>
        <IconButton
          variant="text"
          className="md:hidden"
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
          <NavList onNavLinkClick={handleNavLinkClick} />
          <div className="flex flex-col gap-2">
            <Button size="sm" fullWidth={true} className="mb-2">
              Get Started
            </Button>
          </div>
        </Collapse>
      </motion.div>
    </motion.nav>
  );
}

export default NavbarSection;



