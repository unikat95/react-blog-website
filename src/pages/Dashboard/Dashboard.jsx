import React, { useContext } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import BlogContext from "../../context/BlogContext";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import DashboardUser from "../../components/DashboardUser/DashboardUser";
import LoadingProfile from "../../components/LoadingProfile/LoadingProfile";

export default function Dashboard() {
  const { logout, open, setOpen, isProfileLoading } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/account/signin");
  };

  const toggleMenu = () => {
    setOpen(!open);
    console.log("first");
  };

  if (isProfileLoading) return <LoadingProfile />;

  return (
    <>
      <div className="w-full h-[100dvh] bg-slate-200 grid grid-cols-1 lg:grid-cols-[auto,1fr]">
        <DashboardSidebar toggleMenu={toggleMenu} handleLogout={handleLogout} />
        <div className="w-full h-full flex flex-col">
          <DashboardUser />
          <Outlet />
        </div>
      </div>
    </>
  );
}
