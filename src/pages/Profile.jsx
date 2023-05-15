import React, { useContext } from "react";
import BlogContext from "../context/BlogContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { logout, user, isProfileLoading } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/account/signin");
  };

  return (
    <div className="w-full max-w-[40em] flex flex-col bg-white p-10 rounded-md shadow-sm">
      <div className="flex flex-col gap-10 items-start">
        <div>Welcome, {user.email}</div>
        <Button value={"Logout"} onClick={handleLogout} />
      </div>
    </div>
  );
}
