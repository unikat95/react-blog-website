import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { BiMessageSquareDots } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import BlogContext from "../../context/BlogContext";
import { auth, db } from "../../config/firebase";
import LoadingProfile from "../LoadingProfile/LoadingProfile";

export default function ProfileDropdown({ showDropdown, margin, marginRight }) {
  const { logout, closeDropdown, incomingMessages, isProfileLoading } =
    useContext(BlogContext);
  const [userRank, setUserRank] = useState({});
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const userRef = db.collection("users").doc(currentUser.uid);

  const userDetail = async () => {
    try {
      await userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setUserRank(userData);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userDetail();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/account/signin");
  };

  return (
    <nav
      className={`absolute top-[2.5em] right-0 z-[99] ${margin} ${marginRight}`}
    >
      <ul
        className={`bg-white shadow-[rgba(0,_0,_0,_0.1)_0px_3px_8px] flex flex-col ${
          !showDropdown && "hidden"
        } duration-200 items-start rounded-md overflow-hidden py-3`}
      >
        <li className="w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700 group">
          <Link
            to="/profile"
            className="py-2 px-5 border-y flex justify-start items-center gap-2"
            onClick={closeDropdown}
          >
            <BsPersonCircle className="text-gray-400" />
            <p>Profile</p>
          </Link>
        </li>
        <li className="w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700 group">
          <Link
            to="/messages"
            className="py-2 px-5 border-b flex justify-start items-center gap-2"
            onClick={closeDropdown}
          >
            <BiMessageSquareDots className="text-gray-400" />
            <p>Messages</p>
          </Link>
        </li>
        {userRank.rank === 999 && (
          <li className="w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-700 group">
            <Link
              to="/dashboard"
              className="py-2 px-5 border-b flex justify-start items-center gap-2"
              onClick={closeDropdown}
            >
              <RiDashboardFill className="text-gray-400" />
              <p>Dashboard</p>
            </Link>
          </li>
        )}
        <li className="w-full text-sm text-gray-700 hover:bg-gray-900 hover:text-white group border-b">
          <button
            className="py-2 px-5 flex justify-start items-center gap-2"
            onClick={handleLogout}
          >
            <IoMdLogOut className="text-gray-400 group-hover:text-white" />
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </nav>
  );
}
