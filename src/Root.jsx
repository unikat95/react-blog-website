import React, { useContext, useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import BlogContext from "./context/BlogContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

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
    <div className="w-full h-screen flex items-start bg-zinc-100 justify-center relative">
      {loading && <LoadingBar />}
      <ScrollToTop />
      <Navbar refNavbar={dropdownRef} />
      <Outlet />
    </div>
  );
}
