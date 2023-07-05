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
      <div className="w-full h-full flex justify-end items-center">
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
