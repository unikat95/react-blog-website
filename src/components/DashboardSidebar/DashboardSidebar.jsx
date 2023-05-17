import React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";

import DashboardLogo from "../DashboardLogo/DashboardLogo";
import DashboardNav from "../DashboardNav/DashboardNav";

export default function DashboardSidebar({ open, handleLogout, toggleMenu }) {
  return (
    <div
      className={`w-auto ${
        !open && "w-[18em] md:w-[22em] -translate-x-0"
      } h-full flex flex-col justify-between items-start bg-white px-5 py-6 absolute -translate-x-20 md:-translate-x-0 md:relative shadow-md z-[999]`}
    >
      <div className="w-full flex flex-col gap-20 items-center">
        <DashboardLogo open={open} />
        <DashboardNav open={open} />
      </div>
      <div className="w-full group">
        <button
          onClick={handleLogout}
          className={`w-full bg-slate-100 hover:bg-slate-800 p-2 rounded-md flex gap-2 px-4 ${
            open && "px-2"
          }`}
        >
          <RiLogoutCircleRLine
            size="24"
            className="text-gray-500 group-hover:text-white"
          />
          {!open && (
            <p className="text-gray-500 group-hover:text-white">Logout</p>
          )}
        </button>
      </div>
      <button
        onClick={toggleMenu}
        className="absolute -right-4 top-6 bg-white p-1 rounded-md"
      >
        <GiHamburgerMenu size="28" className="text-gray-600" />
      </button>
    </div>
  );
}
