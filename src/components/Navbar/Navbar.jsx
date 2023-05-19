import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import BlogContext from "../../context/BlogContext";

import Logo from "../Logo/Logo";
import UserProfile from "../UserProfile/UserProfile";

export default function Navbar({ refNavbar }) {
  const { user } = useContext(BlogContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    const excludedPaths = ["/dashboard", "/account"];
    const isExcludedPath = excludedPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    setShowNavbar(!isExcludedPath);
  }, [location]);

  window.addEventListener("scroll", () => {
    window.scrollY > 50 ? setScroll(false) : setScroll(true);
  });

  return (
    <>
      {showNavbar && (
        <nav
          ref={refNavbar}
          className={`w-full flex justify-center items-center ${
            !scroll ? "bg-white py-3" : "py-7"
          } fixed top-0 left-0 px-5 xl:px-0 z-[99] duration-300`}
        >
          <div className="w-full max-w-[1300px] flex justify-between items-center ">
            <Logo />
            <ul className="flex gap-10 justify-center items-center">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              {user && (
                <UserProfile
                  bgColor={"bg-gray-200"}
                  arrowBg={"bg-gray-100"}
                  arrowText={"text-gray-900"}
                />
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
