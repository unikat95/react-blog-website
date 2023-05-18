import React from "react";

import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

export default function DashboardLogo({ open }) {
  const location = useLocation();
  const isActive = location.pathname === "/dashboard";

  return (
    <Link to="/dashboard" className="w-full group">
      <div
        className={`w-full bg-slate-100 hover:bg-slate-800 p-2 rounded-md flex gap-2 px-4 ${
          open && "px-2"
        } ${isActive && "bg-slate-800"}`}
      >
        <span className="block">
          <MdDashboard
            size="24"
            className={`text-gray-600 group-hover:text-white ${
              isActive && "text-white"
            }`}
          />
        </span>
        <p
          className={`text-md text-gray-700 font-bold group-hover:text-white ${
            open ? "scale-0" : "scale-100"
          } duration-200 ${isActive && "text-white"}`}
        >
          Dashboard
        </p>
      </div>
    </Link>
  );
}
