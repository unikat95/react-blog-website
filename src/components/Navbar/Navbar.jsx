import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import BlogContext from "../../context/BlogContext";
import { IoMdArrowDropdown } from "react-icons/io";

import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import UserPhoto from "../UserPhoto/UserPhoto";

export default function Navbar({ refNavbar }) {
  const { user, showDropdown, openDropdown } = useContext(BlogContext);
  const [showNavbar, setShowNavbar] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const excludedPaths = ["/account/signin", "/account/signup", "/dashboard"];
    setShowNavbar(!excludedPaths.includes(location.pathname));
  }, [location]);

  return (
    <>
      {showNavbar && (
        <nav
          ref={refNavbar}
          className="w-full flex justify-center items-center bg-white shadow-sm fixed top-0 left-0 px-5 xl:px-0 z-[99]"
        >
          <div className="w-full max-w-[1300px] flex justify-between items-center py-5">
            <div className="flex flex-col">
              <Link to="/" className="text-xl text-gray-700 font-bold">
                BlogApp
              </Link>
            </div>
            <ul className="flex gap-10 justify-center items-center">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="">Articles</Link>
              </li>
              {/* <li>
                <Link to="/users">Users</Link>
              </li> */}
              {user && (
                <li className="relative">
                  <div
                    className="flex gap-1 justify-center items-center group relative cursor-pointer"
                    onClick={openDropdown}
                  >
                    <UserPhoto />
                    <button className="w-[1em] h-[.85em] bg-white shadow-sm rounded-[4px] text-gray-500 absolute bottom-0 right-0">
                      <IoMdArrowDropdown
                        className={`text-gray-800 ${
                          showDropdown && "rotate-180"
                        }`}
                      />
                    </button>
                  </div>
                  <ProfileDropdown showDropdown={showDropdown} />
                </li>
              )}
              {!user && (
                <>
                  <li>
                    <Link to="account/signin">Account</Link>
                  </li>
                  <li className="py-2">
                    <Link
                      to="account/signup"
                      className="bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
