import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AvatarDropDown from "./AvatarDropDown"
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const {user,loading} = useAuth();

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-gray-800 via-gray-900 to-black px-4 py-2 text-white shadow-lg">
      <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-bold text-white transition-transform duration-200 hover:scale-110">
        <Link to={"/"}>Home Hub</Link>
      </div>
      <div className="block md:hidden">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <div className="hidden md:flex md:items-center md:justify-between md:gap-16 w-full md:w-auto md:flex-row">
        <ul className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10">
          <li className="group cursor-pointer">
            <NavLink to="/" activeclassname="active" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="group cursor-pointer">
            <NavLink
              to="/allproperties"
              activeclassname="active"
              className="nav-link"
            >
              All Properties
            </NavLink>
          </li>
          <li className="group cursor-pointer">
            <NavLink to="/about" activeclassname="active" className="nav-link">
              About
            </NavLink>
          </li>
          <li className="group cursor-pointer">
            <NavLink
              to="/contact"
              activeclassname="active"
              className="nav-link"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        {!user?(<div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-5 mt-4 md:mt-0">
          <NavLink
            to={"/login"}
            className="rounded-full bg-gradient-to-r from-blue-700 to-indigo-600 px-4 py-2 text-white transition-transform duration-300 hover:scale-95 md:px-6"
          >
            Login
          </NavLink>
          <NavLink
            to={"/register"}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-700 px-4 py-2 text-white transition-transform duration-300 hover:scale-95 md:px-6"
          >
            Register
          </NavLink>
        </div>):<AvatarDropDown/>}
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-0 bg-[#1f1f1f] bg-opacity-90 z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-end p-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <ul className="flex flex-col items-center gap-4 mt-10">
        <li className="group cursor-pointer text-xl text-white">
          <NavLink to="/" activeclassname="active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="group cursor-pointer text-xl text-white">
          <NavLink
            to="/allproperties"
            activeclassname="active"
            className="nav-link"
          >
            All Properties
          </NavLink>
        </li>
        <li className="group cursor-pointer text-xl text-white">
          <NavLink to="/about" activeclassname="active" className="nav-link">
            About
          </NavLink>
        </li>
        <li className="group cursor-pointer text-xl text-white">
          <NavLink to="/contact" activeclassname="active" className="nav-link">
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="flex flex-col items-center gap-5 mt-10">
        <button className="rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-6 py-2 text-white transition-transform duration-300 hover:scale-95">
          <NavLink to={"/login"}>Log In</NavLink>
        </button>
        <NavLink
          to={"/register"}
          className="rounded-full bg-gradient-to-r from-green-600 to-blue-700 px-6 py-2 text-white transition-transform duration-300 hover:scale-95"
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
