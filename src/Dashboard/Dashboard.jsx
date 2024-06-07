import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  let isAgent = true;
  let isUser = false;

  return (
    <div className="flex h-full bg-gray-200">
      {isUser && (<div
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
              to="/dashboard/myprofile"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              My Profile
            </NavLink>
          </li>
          <li className="group cursor-pointer text-xl text-white">
            <NavLink
              to="/dashboard/wishlist"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              WishList
            </NavLink>
          </li>
          <li className="group cursor-pointer text-xl text-white">
            <NavLink
              to="/dashboard/property-bought"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              Property Bought
            </NavLink>
          </li>
          <li className="group cursor-pointer text-xl text-white">
            <NavLink
              to="/dashboard/my-reviews"
              activeClassName="active"
              className="nav-link"
              onClick={toggleSidebar}
            >
              My Reviews
            </NavLink>
          </li>
        </ul>
      </div>)}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute right-5 top-5 text-white bg-gray-800 p-2 rounded-full"
      >
        <MdMenu className="w-8 h-8 text-white" />
      </button>
      <div className="w-64 bg-gray-800 hidden lg:flex flex-col">
        <header className="p-4 flex flex-col items-center justify-center bg-gray-900">
          <h1 className="text-white text-2xl">Home-Hub</h1>
          <Link to="/dashboard" className="text-white text-lg mt-2">
            Dashboard
          </Link>
        </header>
        <nav className="mt-4 md:mt-10 flex-1">
          {isUser&&(<div><NavLink
            exact
            to="/dashboard/myprofile"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            My Profile
          </NavLink>
          <NavLink
            to="/dashboard/wishlist"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            WishList
          </NavLink>
          <NavLink
            to="/dashboard/my-reviews"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            My Reviews
          </NavLink>
          <NavLink
            to="/dashboard/property-bought"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
            Property Bought
          </NavLink></div>)}
        {isAgent && (<div>
          <hr className=" m-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
          <h1 className="text-center text-white text-lg mt-2">Agent Dashboard</h1>
          <hr className="m-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

          <NavLink
            to="/dashboard/agent-profile"
            className="flex items-center mt-2 py-2 px-6 text-gray-200 hover:bg-gray-700"
            activeClassName="active"
          >
           Agent Profile
          </NavLink>
        </div>)}

        </nav>
      </div>
      <div className="w-full p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
