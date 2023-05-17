import React from "react";
import { Link } from "react-router-dom";

export default function DashboardLink({ Icon, open, value, to }) {
  return (
    <>
      <li>
        <Link
          to={to}
          className={`w-full bg-slate-100 hover:bg-slate-800 p-2 rounded-md flex justify-start items-center gap-2 px-4 ${
            open && "px-2 group"
          } text-gray-700 hover:text-white group`}
        >
          <Icon size="24" className="text-gray-700 group-hover:text-white" />
          {!open && (
            <p className="text-gray-700 group-hover:text-white">{value}</p>
          )}
        </Link>
      </li>
    </>
  );
}
