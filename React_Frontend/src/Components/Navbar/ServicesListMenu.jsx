import React from "react";
import { Menu,MenuHandler,MenuList,MenuItem,Collapse,Typography,ListItem,} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const navListMenuItems = [
  { title: "Architecture Design",   path: "/architecture_design" },
  { title: "Building Construction", path: "/building_construction" },
  { title: "Building Maintenance", path: "/building_maintenance" },
  { title: "BuildingRenovation", path: "/building_renovation" },
  { title: "Flooring Roofing", path: "/flooring_roofing" },
  { title: "Project Management", path: "/project_management" },

];

export default function ServicesListMenu() {
  const [isServiceMenuOpen, setIsServiceMenuOpen] = React.useState(false);
  const [isServiceMobileMenuOpen, setServiceIsMobileMenuOpen] = React.useState(false);

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
    <React.Fragment>
      <Menu open={isServiceMenuOpen} handler={ setIsServiceMenuOpen} offset={{ mainAxis: 20 }} placement="bottom" allowHover={true}>
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 text-lg font-medium  text-gray-900"
              selected={isServiceMenuOpen ||isServiceMobileMenuOpen}
              onClick={() => setServiceIsMobileMenuOpen((cur) => !cur)}
            >
             Services
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                    isServiceMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                    isServiceMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden  bg-deep-orange-600 w-screen rounded-xl lg:block">
          <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isServiceMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

 

