import React from "react";
import { Navbar, Collapse, Typography, Button, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavbarList from "./NavbarList";
import logo from '../../../assets/Images/hero logo.png'
import { NavLink } from "react-router-dom";

export default function NavbarSection() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);


  return (
    <>
    <div className="w-screen bg-gray-100">
      <div className="mx-auto max-w-7xl">
    <Navbar className=" px-4 py-2 bg-yellow-100 ">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" to="/" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
        <img
          src={logo}
        className="w-[65px] h-[60px] animate-imgRotate "
        />
        </Typography>
        <div className="hidden lg:block">
          <NavbarList />
        </div>
        <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
          {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavbarList />
      </Collapse>
    </Navbar>
    </div>
    </div>
    </>
  );
}


