import React, { useContext, useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import BlogContext from "./context/BlogContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";

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
    <div className="w-screen h-screen flex flex-col items-center bg-zinc-100 justify-between relative">
      {loading && <LoadingBar />}
      <ScrollToTop />
      <Navbar refNavbar={dropdownRef} />
      <Outlet />
      <Footer />
    </div>
  );
}
