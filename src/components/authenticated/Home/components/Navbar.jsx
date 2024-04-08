import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../../utils/context/UserAuthContext";
import { AppLogoUrl, AppName, profilepic } from "../../../common/links";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useUserAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-emerald-300 shadow-xl">
      <div className="mx-auto px-4 py-5 sm:px-6 lg:px-10 flex justify-between items-center">
        <Link to="" className="flex items-center">
          <img
            src={AppLogoUrl}
            alt="SanTech API"
            className="h-10 w-auto mr-2"
          />
          <span className="text-white text-2xl font-bold">{AppName}</span>
        </Link>
        <div className="flex items-center ml-3 relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer"
          >
            <div className="h-12 w-12 rounded-full flex border bg-gray-700 border-gray-300 items-center justify-center text-white text-2xl relative">
              <h1 className="uppercase text-center">
                {user.email && user.email.slice(0, 1)}
              </h1>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="origin-top-right z-[100] absolute right-10 top-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <Link
                  to="home"
                  className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={toggleDropdown}
                >
                  Home
                </Link>
                <Link
                  to="profile"
                  className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={toggleDropdown}
                >
                  Profile
                </Link>

                <button
                  onClick={(e) => {
                    localStorage.removeItem("token");
                    logOut();
                    window.location.href = "/home";
                  }}
                  className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
