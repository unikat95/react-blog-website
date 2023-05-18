import React, { useContext } from "react";

import { BsArrowRightShort } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiHome } from "react-icons/hi";

import DashboardLogo from "../DashboardLogo/DashboardLogo";
import DashboardNav from "../DashboardNav/DashboardNav";
import BlogContext from "../../context/BlogContext";
import { Link } from "react-router-dom";

export default function DashboardSidebar({ handleLogout, toggleMenu }) {
  const { open } = useContext(BlogContext);

  return (
    <div
      className={`${
        !open ? "w-[18em] -translate-x-0" : "w-[6em]"
      }  h-full flex flex-col justify-between items-start bg-white px-5 py-6 absolute -translate-x-20 lg:-translate-x-0 lg:relative shadow-md z-[999] transition-width duration-300`}
    >
      <div className="w-full flex flex-col gap-20 items-center">
        <DashboardLogo open={open} />
        <DashboardNav open={open} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full group gap-2">
          <Link
            to="/"
            className={`w-full bg-slate-100 hover:bg-slate-800 p-2 rounded-md flex gap-2 px-4 ${
              open && "px-2"
            }`}
          >
            <span className="block">
              <HiHome
                size="24"
                className="text-gray-500 group-hover:text-white"
              />
            </span>
            <p
              className={`text-gray-500 group-hover:text-white ${
                open ? "scale-0" : "scale-100"
              } duration-200`}
            >
              Home
            </p>
          </Link>
        </div>
        <div className="w-full group gap-2">
          <button
            onClick={handleLogout}
            className={`w-full bg-slate-100 hover:bg-slate-800 p-2 rounded-md flex gap-2 px-4 ${
              open && "px-2"
            }`}
          >
            <span className="block">
              <RiLogoutCircleRLine
                size="24"
                className="text-gray-500 group-hover:text-white"
              />
            </span>

            <p
              className={`text-gray-500 group-hover:text-white ${
                open ? "scale-0" : "scale-100"
              } duration-200`}
            >
              Logout
            </p>
          </button>
        </div>
      </div>
      <button
        onClick={toggleMenu}
        className="absolute -right-6 top-6 bg-white p-1 rounded-md"
      >
        <BsArrowRightShort
          size="32"
          className={`text-gray-600 ${!open && "rotate-180"} duration-200`}
        />
      </button>
    </div>
  );
}
