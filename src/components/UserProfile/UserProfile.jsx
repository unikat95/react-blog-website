import React, { useContext } from "react";
import BlogContext from "../../context/BlogContext";
import UserPhoto from "../UserPhoto/UserPhoto";
import { IoMdArrowDropdown } from "react-icons/io";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function UserProfile() {
  const { openDropdown, showDropdown } = useContext(BlogContext);

  return (
    <div className="relative">
      <div className="p-2 bg-slate-200 rounded-full">
        <div
          className="flex gap-1 justify-center items-center group relative cursor-pointer"
          onClick={openDropdown}
        >
          <UserPhoto />
          <button
            className={`w-[1em] h-[.85em] bg-white shadow-sm rounded-[4px] text-gray-500 absolute bottom-0 right-0`}
          >
            <IoMdArrowDropdown
              className={`text-gray-800 ${showDropdown && "rotate-180"}`}
            />
          </button>
        </div>
      </div>
      <ProfileDropdown showDropdown={showDropdown} />
    </div>
  );
}
