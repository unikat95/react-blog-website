import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import BlogContext from "./context/BlogContext";

export default function Root() {
  const { loading } = useContext(BlogContext);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    setNavbarHeight(navbar.offsetHeight);
  }, [navbarHeight, setNavbarHeight]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {loading && <Loading />}
      <Navbar />
      <div
        style={{ marginTop: navbarHeight }}
        className="w-full max-w-[1300px] flex flex-col py-5 px-5 xl:px-0"
      >
        <Outlet />
      </div>
    </div>
  );
}
