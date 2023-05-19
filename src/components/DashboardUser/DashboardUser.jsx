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
      className="w-full h-auto flex justify-end lg:justify-between items-center bg-blue-600 text-slate-800 gap-5 lg:gap-10  px-2 md:px-3 lg:px-7 xl:px-10 shadow-sm z-[970]"
    >
      <div className="hidden sm:flex sm:w-[calc(100%-12rem)] lg:w-full justify-end items-center group relative lg:flex">
        <GoSearch
          className={`w-[2.5em] h-[2.5em] p-2 bg-blue-500 ${
            searchInput && "bg-white text-black"
          } text-white rounded-l-md z-[2]`}
          size="34"
        />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className={`w-[7em] focus:w-full z-[2] py-2 px-1 outline-none border-white bg-blue-500 placeholder:text-white rounded-r-md ${
            searchInput ? "w-full bg-white outline-none focus:outline-none" : ""
          } duration-300`}
          onChange={(e) => handleInputChange(e)}
        />
        {searchInput && (
          <>
            <div className="w-full h-auto flex flex-col absolute left-0 top-12 bg-white rounded-md shadow-md  z-[999]">
              <div className="flex flex-col justify-center items-center p-5 gap-2">
                <div className="flex gap-2 justify-center items-center">
                  <LoadingSpinner width={"w-[1.5em]"} height={"h-[1.5em]"} />
                  <p className="text-sm">searching for result...</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {searchInput && (
        <div className="flex w-full h-full absolute top-0 left-0 bg-black bg-opacity-20 z-[1]"></div>
      )}
      <div className="w-auto h-full flex justify-center items-center">
        <div className="bg-blue-700 py-4 px-6">
          <UserProfile
            bgColor={"bg-blue-600"}
            arrowBg={"bg-blue-500"}
            arrowText={"text-blue-900"}
          />
        </div>
      </div>
    </div>
  );
}
