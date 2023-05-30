import React from "react";

import { FaUserEdit } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { RiMailSendLine } from "react-icons/ri";

import UserDetailSidebar from "../UserDetailSidebar/UserDetailSidebar";
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import { BiMessageSquareDots } from "react-icons/bi";

export default function UserDetail({
  user,
  userArticles,
  handleLogout,
  handleEditProfile,
}) {
  const currentUser = auth.currentUser;

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <h1>User profile:</h1>
        <div className="w-full flex flex-col justify-start items-center bg-white p-5 md:p-10 gap-5 md:gap-10 rounded-xl shadow-sm">
          <div className="border-[10px] border-slate-100 rounded-full">
            {user.picture === "" ? (
              <div className="w-[11em] h-[11em] bg-yellow-500 rounded-full flex justify-center items-center">
                <div className="text-7xl text-white uppercase font-bold flex justify-center items-center">
                  {user.firstName === "" || user.lastName === ""
                    ? user.email.slice(0, 1)
                    : user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </div>
              </div>
            ) : (
              <img
                src={user.picture}
                alt=""
                className="rounded-full w-[11em] h-[11em] object-cover"
              />
            )}
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full flex flex-col gap-1">
                <div className="text-gray-600 text-sm">First Name:</div>
                <div className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.firstName === "" ? "---" : user.firstName}
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="text-gray-600 text-sm">Last Name:</div>
                <div className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.lastName === "" ? "---" : user.lastName}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full flex flex-col gap-1">
                <div className="text-gray-600 text-sm">Email:</div>
                <div className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.email === "---" ? "---" : user.email}
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="text-gray-600 text-sm">Birth date:</div>
                <div className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.birthDate === "" ? "---" : user.birthDate}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full flex flex-col gap-1">
                <div className="text-gray-600 text-sm">Rank:</div>
                <div className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.role === "" ? "---" : user.role}
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="text-gray-600 text-sm">Posts:</div>
                <div className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {userArticles.length}
                </div>
              </div>
            </div>
            {currentUser && !handleLogout && currentUser.uid !== user.id ? (
              <div className="w-full flex justify-end items-end mt-2">
                <Link
                  to={`/messages/send-message/${user.id}`}
                  className="flex justify-center items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-700 hover:text-slate-100 rounded-md"
                >
                  <RiMailSendLine />
                  Send message
                </Link>
              </div>
            ) : null}
            {handleLogout && (
              <div className="w-full flex items-center justify-end mt-2 gap-2">
                <Link
                  to="/messages/incoming-messages"
                  className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-700 hover:text-slate-100 text-sm rounded-md"
                >
                  <BiMessageSquareDots size="18" />
                  Messages
                </Link>
                <button
                  onClick={handleEditProfile}
                  className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-700 hover:text-slate-100 text-sm rounded-md"
                >
                  <FaUserEdit size="18" /> Edit
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-700 hover:text-slate-100 text-sm rounded-md"
                >
                  <IoIosLogOut size="18" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <UserDetailSidebar userArticles={userArticles} />
    </>
  );
}
