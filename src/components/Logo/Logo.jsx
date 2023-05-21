import React from "react";

import { BsPen } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="flex flex-col">
      <Link
        to="/"
        className="text-xl text-gray-700 hover:text-gray-600 font-bold z-[99] flex justify-center items-center gap-2"
      >
        <BsPen size="24" />
        <p>BlogApp</p>
      </Link>
    </div>
  );
}
