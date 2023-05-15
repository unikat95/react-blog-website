import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Account() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center bg-gradient-to-tr from-orange-100 to-blue-200 absolute top-0 left-0">
      <div className="max-w-[30em] w-full flex flex-col bg-white p-16 rounded-md shadow-sm gap-10 items-center relative">
        <Outlet />
      </div>
      <Link
        to="/"
        className="bg-gray-700 hover:bg-blue-500 text-white p-3 rounded-full shadow-sm duration-100"
      >
        <FaHome size="20" />
      </Link>
    </div>
  );
}
