import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineSetting,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { RiContactsLine } from "react-icons/ri";
import { FaUserCircle, FaSave } from "react-icons/fa";

interface NavItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Profile", icon: <AiOutlineUser />, path: "/profile" },
  { name: "New Group", icon: <FiUsers />, path: "/new-group" },
  { name: "Contacts", icon: <RiContactsLine />, path: "/contacts" },
  { name: "Calls", icon: <AiOutlinePhone />, path: "/calls" },
  { name: "Saved Messages", icon: <FaSave />, path: "/saved-messages" },
  { name: "Settings", icon: <AiOutlineSetting />, path: "/settings" },
];

const SideNavbar: React.FC<{
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}> = ({ isOpen, toggleSidebar, closeSidebar }) => {
  return (
    <div
      className={`fixed flex flex-col inset-y-0 left-0 z-50 w-80 bg-white text-gray-900 shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <FaUserCircle className="text-4xl text-gray-600" />
          <div className="ml-3">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500">Online</p>
          </div>
        </div>
        <button onClick={closeSidebar} className="text-2xl md:hidden">
          <AiOutlineClose />
        </button>
      </div>
      <nav className="flex flex-col space-y-1 mt-4 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-3 text-white bg-teal-500 rounded-lg"
                : "flex items-center p-3 text-gray-600 hover:bg-teal-100 hover:text-teal-600 transition-colors duration-200 rounded-lg"
            }
            onClick={toggleSidebar}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="ml-3 text-lg">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <NavLink
          to="/logout"
          className="flex items-center p-3 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 rounded-lg"
        >
          <HiOutlineLogout className="text-2xl" />
          <span className="ml-3 text-lg">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideNavbar;
