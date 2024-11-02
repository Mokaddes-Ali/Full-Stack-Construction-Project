import React from "react";
import { List, Typography, ListItem } from "@material-tailwind/react";
import ProjectListMenu from "./ProjectListMenu";
import ServicesListMenu from "./ServicesListMenu";
import AboutListMenu from "./AboutListMenu";
import { NavLink } from "react-router-dom";


export default function NavbarList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <AboutListMenu />
      <ProjectListMenu />
      <ServicesListMenu />
      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
        <ListItem className="flex items-center gap-2 font-medium text-lg py-2 pr-4">Blog</ListItem>
      </Typography>
      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
        <NavLink to="/contact" className="flex items-center font-medium  text-lg gap-2 py-2 pr-4">Contact Us</NavLink>
      </Typography>
    </List>
  );
}


 