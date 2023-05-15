import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import BlogContext from "../../context/BlogContext";

export default function ProfileDropdown() {
  const { logout, closeDropdown, user } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/account/signin");
  };

  return (
    <nav className="absolute top-[3em] right-0 z-[99]">
      <ul className="bg-white shadow-[rgba(0,_0,_0,_0.1)_0px_3px_8px] flex flex-col items-start rounded-md overflow-hidden ">
        <li className="w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700 group">
          <Link
            to="/profile"
            className="py-2 px-5 border-b flex justify-start items-center gap-2"
            onClick={closeDropdown}
          >
            <BsPersonCircle className="text-gray-400" />
            <p>Profile</p>
          </Link>
        </li>
        <li className="w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700 group">
          <Link
            to=""
            className="py-2 px-5 border-b flex justify-start items-center gap-2"
            onClick={closeDropdown}
          >
            <AiFillSetting className="text-gray-400" />
            <p>Settings</p>
          </Link>
        </li>
        {user.email === "unikat995@gmail.com" && (
          <li className="w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700 group">
            <Link
              to=""
              className="py-2 px-5 border-b flex justify-start items-center gap-2"
              onClick={closeDropdown}
            >
              <RiDashboardFill className="text-gray-400" />
              <p>Dashboard</p>
            </Link>
          </li>
        )}
        <li className="w-full text-sm text-gray-700 hover:bg-gray-800 hover:text-white group">
          <button
            className="py-2 px-5 flex justify-start items-center gap-2"
            onClick={handleLogout}
          >
            <IoMdLogOut className="text-gray-400 group-hover:text-white" />
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </nav>
  );
}
