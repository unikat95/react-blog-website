import React from "react";

import { FaUserEdit } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import UserDetailSidebar from "../UserDetailSidebar/UserDetailSidebar";

export default function UserDetail({
  user,
  userArticles,
  handleLogout,
  handleEditProfile,
}) {
  return (
    <>
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <h1>User profile:</h1>
        <div className="w-full flex flex-col justify-start items-center bg-white p-5 gap-5 rounded-xl shadow-sm">
          <div className="border-[10px] border-slate-100 rounded-full">
            {user.picture === "" ? (
              <div className="w-[8em] h-[8em] bg-yellow-500 rounded-full flex justify-center items-center">
                <p className="text-7xl text-white uppercase font-bold flex justify-center items-center">
                  {user.firstName === "" || user.lastName === ""
                    ? user.email.slice(0, 1)
                    : user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </p>
              </div>
            ) : (
              <img
                src={user.picture}
                alt=""
                className="rounded-full w-[8em] h-[8em] object-cover"
              />
            )}
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full flex flex-col gap-1">
                <p className="text-gray-600 text-sm">First Name:</p>
                <p className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.firstName === "" ? "---" : user.firstName}
                </p>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-gray-600 text-sm">Last Name:</p>
                <p className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.lastName === "" ? "---" : user.lastName}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full flex flex-col gap-1">
                <p className="text-gray-600 text-sm">Email:</p>
                <p className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.email === "" ? "---" : user.email}
                </p>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-gray-600 text-sm">Birth date:</p>
                <p className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.birthDate === "" ? "---" : user.birthDate}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full flex flex-col gap-1">
                <p className="text-gray-600 text-sm">Rank:</p>
                <p className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {user.role === "" ? "---" : user.role}
                </p>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-gray-600 text-sm">Posts:</p>
                <p className="bg-gray-100 p-2 rounded-lg border-b-[3px] border-gray-300 text-sm">
                  {userArticles.length}
                </p>
              </div>
            </div>
            {handleLogout && (
              <div className="w-full flex items-center justify-end mt-2 gap-2">
                <button
                  onClick={handleEditProfile}
                  className="flex justify-center items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-700 hover:text-slate-100 rounded-md"
                >
                  <FaUserEdit size="18" /> Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex justify-center items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-700 hover:text-slate-100 rounded-md"
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
