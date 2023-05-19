import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="flex flex-col">
      <Link to="/" className="text-xl text-gray-700 font-bold z-[99]">
        BlogApp
      </Link>
    </div>
  );
}
