import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashboardLink({ Icon, open, value, to }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <>
      <li>
        <Link
          to={to}
          className={`w-full bg-slate-100 hover:bg-slate-800 p-2 rounded-md flex justify-start items-center gap-2 px-4 ${
            open && "px-2 group"
          } text-gray-700 hover:text-white group ${
            isActive && "bg-slate-800 text-white"
          }`}
        >
          <span className="block">
            <Icon
              size="24"
              className={`text-gray-700 group-hover:text-white ${
                isActive && "text-white"
              }`}
            />
          </span>
          <p className={`${open ? "scale-0" : "scale-100"} duration-200`}>
            {value}
          </p>
        </Link>
      </li>
    </>
  );
}
