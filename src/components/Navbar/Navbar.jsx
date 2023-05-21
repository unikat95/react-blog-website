import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import BlogContext from "../../context/BlogContext";

import Logo from "../Logo/Logo";
import UserProfile from "../UserProfile/UserProfile";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar({ refNavbar }) {
  const { user, logout } = useContext(BlogContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scroll, setScroll] = useState(true);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const toggleOpenProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/account/signin");
  };

  return (
    <>
      {showNavbar && (
        <nav
          ref={refNavbar}
          className={`w-full flex justify-center items-center ${
            !scroll ? "bg-white py-3 shadow-sm" : "py-7"
          } fixed top-0 left-0 px-5 xl:px-0 z-[99] duration-300`}
        >
          <div className="w-full md:max-w-[1300px] flex justify-between items-center">
            <Logo />
            <ul
              className={`w-full h-[100dvh] top-0 left-0 bg-white gap-2 flex flex-col justify-start items-center fixed md:h-auto md:relative md:flex md:flex-row md:gap-5 md:justify-end md:bg-transparent ${
                open ? "flex" : "hidden"
              }`}
            >
              <li className="w-full md:w-auto px-5 md:px-0 mt-24 md:mt-0 flex">
                <Link
                  to="/"
                  className="w-full bg-slate-100 flex px-2 py-4 text-xl text-slate-500 font-bold uppercase md:w-auto md:text-slate-700 md:bg-transparent md:capitalize md:text-base md:font-normal"
                >
                  Home
                </Link>
              </li>
              <li className="w-full md:w-auto px-5 md:px-0 md:mt-0 flex">
                <Link
                  to="/articles"
                  className="w-full bg-slate-100 flex px-2 py-4 text-xl text-slate-500 font-bold uppercase md:text-slate-700 md:bg-transparent md:capitalize md:text-base md:font-normal"
                >
                  Articles
                </Link>
              </li>
              <li className="w-full md:w-auto px-5 md:px-0 md:mt-0 flex">
                <Link
                  to="/users"
                  className="w-full bg-slate-100 flex px-2 py-4 text-xl text-slate-500 font-bold uppercase md:text-slate-700 md:bg-transparent md:capitalize md:text-base md:font-normal"
                >
                  Users
                </Link>
              </li>
              {user && (
                <li className="w-full px-5 md:hidden">
                  <Link
                    to="/"
                    className="w-full bg-slate-100 flex justify-between items-center px-2 py-4 text-xl text-slate-500 font-bold uppercase"
                    onClick={toggleOpenProfile}
                  >
                    <p>Profile</p>
                    <span>
                      <IoMdArrowDropdown
                        className={`text-slate-500 ${
                          profileOpen && "rotate-180"
                        } duration-300`}
                        size="26"
                      />
                    </span>
                  </Link>
                  <div className={`${profileOpen ? "" : "hidden"} w-full`}>
                    <Link
                      to="/profile"
                      className="w-full bg-slate-200 flex px-2 py-2 text-lg text-slate-500 font-medium uppercase mt-1"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/"
                      className="w-full bg-slate-200 flex px-2 py-2 text-lg text-slate-500 font-medium uppercase mt-1"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/dashboard"
                      className="w-full bg-slate-200 flex px-2 py-2 text-lg text-slate-500 font-medium uppercase mt-1"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={handleLogout}
                      className="w-full bg-slate-200 flex px-2 py-2 text-lg text-slate-500 font-medium uppercase mt-1"
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              )}
              {user && (
                <li className="hidden md:flex">
                  <UserProfile
                    bgColor={"bg-gray-200"}
                    arrowBg={"bg-gray-100"}
                    arrowText={"text-gray-900"}
                  />
                </li>
              )}
              {!user && (
                <>
                  <li className="w-full md:w-auto px-5 md:px-0 mt-24 md:mt-0 flex">
                    <Link
                      to="account/signin"
                      className="w-full bg-slate-100 flex px-2 py-4 text-xl text-slate-500 font-bold uppercase md:text-slate-700 md:bg-transparent md:capitalize md:text-base md:font-normal"
                    >
                      Account
                    </Link>
                  </li>
                  <li className="w-full md:w-auto px-5 md:px-0 mt-24 md:mt-0 flex">
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
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden hamburger ${open && "active"}`}
            ></button>
          </div>
        </nav>
      )}
    </>
  );
}
