import React from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Collapse, Typography, ListItem } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";


const navListMenuItems = [
  { title: "Aspen Heights", path: "aspen-heights"},
  { title: "Bayside Residences",path: "bayside_residences"  },
  { title: "ForestHillTowers",path: "forest_hill_towers" },
  { title: "Parkview Plaza", path: "oarkview_plaza" },
];


export default function  ProjectListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, path }, key) => (
    <NavLink to={path} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
            {title}
          </Typography>
        </div>
      </MenuItem>
    </NavLink>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} offset={{ mainAxis: 20 }} placement="bottom" allowHover={true}>
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900" selected={isMenuOpen || isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((cur) => !cur)}>
              Project
              <ChevronDownIcon strokeWidth={2.5} className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""}`} />
              <ChevronDownIcon strokeWidth={2.5} className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""}`} />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

