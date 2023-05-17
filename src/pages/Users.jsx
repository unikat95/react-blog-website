import React, { useContext, useEffect, useRef, useState } from "react";

import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";
import UserListItem from "../components/UserListItem/UserListItem";
import { useLocation } from "react-router-dom";

export default function Users() {
  const { isProfileLoading } = useContext(BlogContext);
  const [userList, setUserList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const usersCollectionRef = collection(db, "users");
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const getUserList = async () => {
      try {
        setLoadingUsers(true);
        const data = await getDocs(usersCollectionRef);
        const usersDetail = data.docs.map((user) => ({
          ...user.data(),
          id: user.id,
        }));
        setUserList(usersDetail);
        setLoadingUsers(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUserList();
  }, []);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <div
      className="w-full flex flex-col gap-2 bg-white p-2 rounded-md duration-300"
      ref={dropdownRef}
    >
      <div className="grid grid-cols-[1fr,auto,auto] md:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] xl:grid-cols-[3fr,2fr,2fr,2fr,2fr,4fr,auto] items-center justify-items-start hover:bg-slate-200 relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md">
        <div className="text-sm font-bold text-slate-700">email</div>
        <div className="text-sm font-bold text-slate-700">photo</div>
        <div className="hidden md:flex text-sm font-bold text-slate-700">
          First name
        </div>
        <div className="hidden md:flex text-sm font-bold text-slate-700">
          Last name
        </div>
        <div className="hidden md:flex text-sm font-bold text-slate-700">
          Birth date
        </div>
        <div className="hidden xl:flex text-sm font-bold text-slate-700">
          About
        </div>
        <div className="text-sm font-bold text-slate-700">Action</div>
      </div>
      {userList.map((el, index) => (
        <UserListItem key={el.id} el={el} index={index} />
      ))}
      {loadingUsers && <div>Loading users...</div>}
    </div>
  );
}
