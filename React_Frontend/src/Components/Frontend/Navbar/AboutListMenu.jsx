import React from "react";
import { Menu,MenuHandler,MenuList,MenuItem,Collapse,Typography,ListItem,} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const navListMenuItems = [
  { title: "About Company", path: "/about-company" },
  { title: "History", path: "/company-history" },
 
];


export default function  AboutListMenu() {
  const [isAboutMenuOpen, setIsAboutMenuOpen] = React.useState(false);
  const [isAboutMobileMenuOpen, setIsAboutMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({  title, path }, key) => (
    <NavLink
      to={path}
      key={key}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg p-2 ${
          isActive ? "bg-blue-500 text-white" : "text-gray-900"
        }`
      }
    >
      <MenuItem className="flex items-center gap-4  rounded-lg">
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-lg font-medium">
            {title}
          </Typography>
        </div>
      </MenuItem>
    </NavLink>
  ));

  return (
    <>
      <Menu open={isAboutMenuOpen} handler={setIsAboutMenuOpen} offset={{ mainAxis: 20 }} placement="bottom" allowHover={true}>
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium  text-lg text-gray-900"
              selected={isAboutMenuOpen || isAboutMobileMenuOpen}
              onClick={() => setIsAboutMobileMenuOpen((cur) => !cur)}
            >
              About Us
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                    isAboutMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isAboutMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden  w-60 rounded-xl lg:block">
          <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isAboutMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}

 