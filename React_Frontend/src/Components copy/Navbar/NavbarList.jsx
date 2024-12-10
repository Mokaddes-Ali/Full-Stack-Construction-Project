import React from "react";
import { List, Typography, ListItem } from "@material-tailwind/react";
import NavDropdown from "./NavDropdown";
import {NavLink} from 'react-router-dom'
import PagesDropdown from "./PagesDropdown";
import AboutDropdown from "./PageDropdown";

const NavbarList = () => {
      return (
        <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4"> <PagesDropdown />  </ListItem>
          </Typography>
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <NavLink className="flex items-center gap-2 py-2 pr-4" to="/home-page-1">Account</NavLink>
          </Typography>
          <NavDropdown />
          <AboutDropdown />
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Docs</ListItem>
          </Typography>
        </List>
      );
    }

export default NavbarList
