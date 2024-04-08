import React from "react";
import { Link } from "react-router-dom";
import { AppLogoUrl, AppName } from "../../common/links";
import { useUserAuth } from "../../utils/context/UserAuthContext";

function Navbar() {
  const { user, logOut } = useUserAuth();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex p-2 lg:p-5 items-center justify-between">
        <Link
          to="/home"
          className="title-font inline-flex justify-center font-medium items-center text-gray-900"
        >
          <img src={AppLogoUrl} alt="NewsKaro" className="w-auto h-8 lg:h-10" />
          <span className="ml-3 text-lg lg:text-xl">{AppName}</span>
        </Link>

        {!user ? (
          <span className="flex items-center justify-center">
            <Link
              to="/login"
              className="inline-flex items-center font-semibold border-0 py-2 px-3 focus:outline-none rounded text-base lg:text-lg mr-3 md:mt-0"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center active:scale-95 transition-all bg-emerald-500 border-0 py-2 px-5 focus:outline-none font-semibold hover:bg-emerald-400 rounded-full text-white md:mt-0 text-base lg:text-lg"
            >
              SignUp
            </Link>
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <button
              onClick={(e) => {
                localStorage.removeItem("token");
                logOut();
              }}
              className="inline-flex items-center font-semibold border-0 py-2 px-3 focus:outline-none rounded text-base lg:text-lg mr-3 md:mt-0"
            >
              Logout
            </button>
            <Link
              to="/dashboard"
              className="inline-flex active:scale-95 transition-all items-center bg-emerald-500 border-0 py-2 px-5 focus:outline-none font-semibold hover:bg-emerald-400 rounded-full text-white md:mt-0 text-base lg:text-lg"
            >
              Dashboard
            </Link>
          </span>
        )}
      </div>
    </header>
  );
}

export default Navbar;