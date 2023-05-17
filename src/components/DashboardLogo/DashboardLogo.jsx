import React from "react";

import { Link } from "react-router-dom";
import { FaBloggerB } from "react-icons/fa";

export default function DashboardLogo({ open }) {
  return (
    <Link to="/" className="w-full group">
      <div
        className={`w-full bg-slate-100 hover:bg-slate-800 p-2 rounded-md flex gap-2 px-4 ${
          open && "px-2"
        }`}
      >
        <FaBloggerB
          size="24"
          className="text-gray-600 group-hover:text-white"
        />
        {!open && (
          <p className="text-md text-gray-700 font-bold group-hover:text-white">
            BlogApp
          </p>
        )}
      </div>
    </Link>
  );
}
