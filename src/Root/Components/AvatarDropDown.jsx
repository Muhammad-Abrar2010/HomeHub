


import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";

const AvatarDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (user) {
    return (
      <div className="relative inline-block text-left z-[9999]">
        <div>
          <img
            onClick={toggleDropdown}
            type="button"
            className="inline-flex justify-center w-10 rounded-full shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-2"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
            src={user?.photoURL}
            alt="User Avatar"
          />
        </div>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              <Link
                to={"/dashboard"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Dashboard
              </Link>
           
            
              <button
                type="submit"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={logout}
                href="/"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default AvatarDropDown;
