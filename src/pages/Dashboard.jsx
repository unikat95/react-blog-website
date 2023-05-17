import React, { useContext, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import BlogContext from "../context/BlogContext";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";

export default function Dashboard() {
  const { logout } = useContext(BlogContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/account/signin");
  };

  const toggleMenu = () => {
    setOpen(!open);
    console.log("first");
  };

  return (
    <>
      <div className="w-full h-[100dvh] bg-slate-200 grid grid-cols-1 md:grid-cols-[auto,1fr]">
        <DashboardSidebar
          open={open}
          toggleMenu={toggleMenu}
          handleLogout={handleLogout}
        />
        <div className="w-full h-full flex p-2 xl:p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
