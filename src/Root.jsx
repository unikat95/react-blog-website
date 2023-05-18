import React, { useContext, useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import BlogContext from "./context/BlogContext";

export default function Root() {
  const { loading, setShowDropdown } = useContext(BlogContext);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleCloseMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleCloseMenu);

    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, [setShowDropdown]);

  useEffect(() => {
    setShowDropdown(false);
  }, [location, setShowDropdown]);

  return (
    <div className="w-full h-screen flex items-start justify-center relative bg-gradient-to-tr from-orange-100 to-blue-200">
      {loading && <LoadingBar />}
      <Navbar refNavbar={dropdownRef} />
      <Outlet />
    </div>
  );
}
