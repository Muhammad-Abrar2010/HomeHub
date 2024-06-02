import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div
        className={`fixed inset-0 bg-[#1f1f1f] bg-opacity-90 z-50 transform md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <MdClose className="w-8 h-8 text-white" />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-4 mt-10">
          <li className="group cursor-pointer text-xl text-white">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              Home
            </NavLink>
          </li>
          <li className="group cursor-pointer text-xl text-white">
            <NavLink
              to="/allproperties"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              All Properties
            </NavLink>
          </li>
          <li className="group cursor-pointer text-xl text-white">
            <NavLink
              to="/about"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              About
            </NavLink>
          </li>
          <li className="group cursor-pointer text-xl text-white">
            <NavLink
              to="/contact"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-5 mt-10">
          <NavLink
            to="/login"
            className="rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-6 py-2 text-white transition-transform duration-300 hover:scale-95"
            onClick={toggleSidebar}
          >
            Log In
          </NavLink>
          <NavLink
            to="/register"
            className="rounded-full bg-gradient-to-r from-green-600 to-blue-700 px-6 py-2 text-white transition-transform duration-300 hover:scale-95"
            onClick={toggleSidebar}
          >
            Register
          </NavLink>
        </div>
      </div>
      <button
          onClick={toggleSidebar}
          className="md:hidden absolute right-5 top-5 text-white bg-gray-800 p-2 rounded-full"
        >
          <MdMenu className="w-8 h-8 text-white" />
        </button>
      <div className="w-64 bg-gray-800 hidden lg:grid">
        <div className="flex items-center justify-center mt-4 md:mt-10">
          <h1 className="text-white text-2xl">Dashboard</h1>
        </div>
    
        <nav className="mt-4 md:mt-10">
          <NavLink
            exact
            to="/"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            to="/allproperties"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            All Properties
          </NavLink>
          <NavLink
            to="/about"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            Contact
          </NavLink>
        </nav>
      </div>
      <div className="w-full p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
