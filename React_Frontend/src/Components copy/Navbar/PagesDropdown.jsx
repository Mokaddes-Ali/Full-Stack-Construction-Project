import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  ListItem,
  Collapse,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const nestedMenuItems = [
  { title: "Our Team", path: "/pages-our-team" },
  { title: "FAQs", path: "/pages-faqs" },
  { title: "Pricing", path: "/pages-pricing" },
  { title: "Testimonials", path: "/pages-testimonials" },
  { title: "Image Gallery", path: "/pages-image-gallery" },
  { title: "Profile", path: "/pages-profile" },
  { title: "Our Works", path: "/pages-our-works" },
  { title: "Private Policy", path: "/pages-private-policy" },
  { title: "404 Page", path: "/pages-404-page" },
];

const PagesDropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setopenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Menu items render function
  const renderItems = nestedMenuItems.map(({ title, path }, key) => (
    <NavLink to={path} key={key} className="block w-full px-4 py-2 hover:bg-blue-100 rounded-lg">
      <MenuItem>{title}</MenuItem>
    </NavLink>
  ));

  return (
    <>
      {/* Main Menu */}
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom" allowHover>
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900 cursor-pointer"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Blocks
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>

        {/* Desktop Dropdown */}
        <MenuList className="hidden rounded-xl lg:block bg-blue-50 p-4">
          <Menu placement="right-start" allowHover open={openNestedMenu} handler={setopenNestedMenu}>
            <MenuHandler className="flex items-center justify-between">
              <MenuItem className="flex justify-between w-full" onClick={() => setopenNestedMenu(!openNestedMenu)}>
                Figma
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openNestedMenu ? "rotate-180" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="rounded-xl bg-white p-2">{renderItems}</MenuList>
          </Menu>
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </MenuList>
      </Menu>

      {/* Mobile Dropdown */}
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <Menu open={openNestedMenu} handler={setopenNestedMenu}>
            <MenuHandler className="flex items-center justify-between">
              <MenuItem className="flex justify-between w-full" onClick={() => setopenNestedMenu(!openNestedMenu)}>
                Figma
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openNestedMenu ? "rotate-180" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="rounded-xl bg-white p-2">{renderItems}</MenuList>
          </Menu>
          <MenuItem className="py-2 px-4 hover:bg-blue-50 rounded-md">React</MenuItem>
          <MenuItem className="py-2 px-4 hover:bg-blue-50 rounded-md">TailwindCSS</MenuItem>
        </Collapse>
      </div>
    </>
  );
};



export default PagesDropdown;

