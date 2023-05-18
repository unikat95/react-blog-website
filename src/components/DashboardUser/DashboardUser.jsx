import React, { useContext, useEffect, useRef, useState } from "react";

import { GoSearch } from "react-icons/go";
import UserProfile from "../UserProfile/UserProfile";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import BlogContext from "../../context/BlogContext";

export default function DashboardUser() {
  const { setShowDropdown } = useContext(BlogContext);
  const [searchInput, setSearchInput] = useState("");
  const profileRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleBackgroundClick = (event) => {
    if (profileRef.current && profileRef.current.contains(event.target)) {
      return;
    }

    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  return (
    <div
      ref={profileRef}
      className="w-full h-auto flex justify-end lg:justify-between items-center bg-white text-slate-800 gap-5 lg:gap-10  px-2 md:px-3 lg:px-7 xl:px-10 shadow-sm"
    >
      <div className="hidden sm:flex sm:w-[calc(100%-12rem)] lg:w-full justify-end items-center group relative lg:flex">
        <GoSearch className="bg-white p-2" size="40" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className={`w-[7em] focus:w-full focus:border-l-[4px] focus:border-blue-400 p-2 outline-none border-white border-l-[4px] bg-slate-100 placeholder:text-slate-800 rounded-md ${
            searchInput
              ? "w-full focus:bg-slate-100  outline-none focus:outline-none"
              : ""
          } duration-300`}
          onChange={(e) => handleInputChange(e)}
        />
        {searchInput && (
          <div className="w-[calc(100%_-_2.5rem)] h-auto flex flex-col absolute left-0 top-14 bg-white rounded-md shadow-md ml-10 z-[999]">
            <div className="flex justify-center items-center p-5 gap-2">
              <LoadingSpinner />
              <p>searching for result...</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-auto h-full flex justify-center items-center">
        <div className="bg-slate-100 py-4 px-6">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
