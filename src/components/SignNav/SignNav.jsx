import React from "react";
import { NavLink } from "react-router-dom";

export default function SignNav() {
  return (
    <nav className="w-full flex absolute top-0">
      <NavLink
        to="/account/signin"
        className="w-full bg-zinc-300 text-gray-500 font-medium py-4 px-4 text-center rounded-tl-md"
      >
        SignIn
      </NavLink>
      <NavLink
        to="/account/signup"
        className="w-full bg-zinc-300 text-gray-500 font-medium py-4 px-4 text-center rounded-tr-md"
      >
        SignUp
      </NavLink>
    </nav>
  );
}
