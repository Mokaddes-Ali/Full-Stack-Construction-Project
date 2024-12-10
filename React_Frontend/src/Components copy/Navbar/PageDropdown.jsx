// NavListMenu.js
import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { FaProductHunt, FaInfoCircle, FaBlog, FaServicestack, FaHeadset, FaEnvelope, FaNewspaper, FaTag } from 'react-icons/fa'; // Import your desired icons

const navListMenuItems = [
  { title:  "Our Team", path: "/pages-our-team" , icon: <FaProductHunt /> },
  { title: "FAQs", path: "/pages-faqs", icon: <FaInfoCircle /> },
  { title:"Pricing", path: "/pages-pricing", icon: <FaBlog /> },
  { title: "Testimonials", path: "/pages-testimonials",  icon: <FaServicestack /> },
  { title: "Image Gallery", path: "/pages-image-gallery", icon: <FaHeadset /> },
  { title: "Profile", path: "/pages-profile", icon: <FaEnvelope /> },
  { title: "Our Works", path: "/pages-our-works", icon: <FaNewspaper /> },
  { title: "Private Policy", path: "/pages-private-policy", icon: <FaTag /> },
  { title:"404 Page", path: "/pages-404-page", icon: <FaTag /> },
  
];

const PageDropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, path, icon }, key) => (
    <NavLink to={path} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        {icon}
        <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
          {title}
        </Typography>
      </MenuItem>
    </NavLink>
  ));

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <Typography as="div" variant="small" className="font-medium">
          <span onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 cursor-pointer">
            Pages
            <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
          </span>
        </Typography>
      </MenuHandler>
      <MenuList>{renderItems}</MenuList>
    </Menu>
  );
};

export default PageDropdown;

