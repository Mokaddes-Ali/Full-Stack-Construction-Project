import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Collapse,
  Typography,
  ListItem,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  SquaresPlusIcon,
  UserGroupIcon,
  Bars4Icon,
  SunIcon,
  GlobeAmericasIcon,
  PhoneIcon,
  NewspaperIcon,
  RectangleGroupIcon,
  TagIcon,
  UsersIcon,
  InformationCircleIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

const navListMenuItems = [
  { title: "Home", description: "Landing page or starting point", icon: GlobeAmericasIcon, path: "/" },
  { title: "About Us", description: "Information about us", icon: InformationCircleIcon, path: "/about" },
  { title: "Services", description: "Our services offerings", icon: BriefcaseIcon, path: "/services" },
  { title: "Portfolio", description: "Showcasing our projects", icon: RectangleGroupIcon, path: "/portfolio" },
  { title: "Products", description: "Explore our products", icon: SquaresPlusIcon, path: "/products" },
  { title: "Blog", description: "Articles and updates", icon: Bars4Icon, path: "/blog" },
  { title: "Testimonials", description: "Feedback from clients", icon: ChatBubbleBottomCenterTextIcon, path: "/testimonials" },
  { title: "Team", description: "Meet our team members", icon: UsersIcon, path: "/team" },
  { title: "Features", description: "Key features we provide", icon: SunIcon, path: "/features" },
  { title: "Pricing", description: "Our pricing plans", icon: TagIcon, path: "/pricing" },
  { title: "FAQ", description: "Frequently asked questions", icon: ClipboardDocumentCheckIcon, path: "/faq" },
  { title: "News", description: "Latest news and updates", icon: NewspaperIcon, path: "/news" },
  { title: "Contact", description: "Reach out to us", icon: PhoneIcon, path: "/contact" },
  { title: "Support", description: "Get help and support", icon: GlobeAmericasIcon, path: "/support" },
  { title: "Careers", description: "Job opportunities", icon: UserGroupIcon, path: "/careers" },
  { title: "Events", description: "Upcoming events", icon: DocumentTextIcon, path: "/events" },
];

export default function PagesListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ icon, title, description, path }, key) => (
    <NavLink
      to={path}
      key={key}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg p-2 ${
          isActive ? "bg-blue-500 text-white" : "text-gray-900"
        }`
      }
    >
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {React.createElement(icon, { strokeWidth: 2, className: "h-6 text-gray-900 w-6" })}
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
            {title}
          </Typography>
          <Typography variant="paragraph" className="text-xs !font-medium text-blue-gray-500">
            {description}
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
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Pages
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
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

 