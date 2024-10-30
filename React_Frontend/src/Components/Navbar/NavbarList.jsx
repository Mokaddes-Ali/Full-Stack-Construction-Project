import React from "react";
import { List, Typography, ListItem } from "@material-tailwind/react";
import ProjectListMenu from "./ProjectListMenu";
import PagesListMenu from "./PagesListMenu";
import ServicesListMenu from "./ServicesListMenu";
import AboutListMenu from "./AboutListMenu";


export default function NavbarList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <AboutListMenu />
      <ProjectListMenu />
      <ServicesListMenu />
      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
        <ListItem className="flex items-center gap-2 font-semibold text-lg py-2 pr-4">Blog</ListItem>
      </Typography>
      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
        <ListItem className="flex items-center font-semibold text-lg gap-2 py-2 pr-4">Contact Us</ListItem>
      </Typography>
    </List>
  );
}


 