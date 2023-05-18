import React, { useContext, useEffect, useState } from "react";

import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../../components/LoadingProfile/LoadingProfile";
import UserListItem from "../../components/UserListItem/UserListItem";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import { AiTwotoneSetting } from "react-icons/ai";
import { deleteUser } from "firebase/auth";

export default function Users() {
  const { isProfileLoading, user } = useContext(BlogContext);
  const [userList, setUserList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    setLoadingUsers(true);
    setTimeout(() => {
      // temporary
      const getUserList = async () => {
        try {
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
    }, 500);
  }, []);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      <DashboardContainer>
        <div className="grid grid-cols-[4fr,1fr,auto] md:grid-cols-[2fr,1fr,1fr,1fr,auto] lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] xl:grid-cols-[3fr,2fr,2fr,2fr,2fr,4fr,auto] items-center justify-items-start relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md">
          <div className="text-sm font-bold text-slate-700">email</div>
          <div className="text-sm font-bold text-slate-700">photo</div>
          <div className="hidden md:flex text-sm font-bold text-slate-700">
            First name
          </div>
          <div className="hidden md:flex text-sm font-bold text-slate-700">
            Last name
          </div>
          <div className="hidden lg:flex text-sm font-bold text-slate-700">
            Birth Date
          </div>
          <div className="hidden xl:flex text-sm font-bold text-slate-700">
            About
          </div>
          <div className="px-2 bg-white w-[2em] h-[2em] rounded-full flex justify-center items-center">
            <AiTwotoneSetting size="20" className="text-slate-700" />
          </div>
        </div>
        {userList.map((el, index) => (
          <UserListItem key={el.id} el={el} index={index} />
        ))}
        {loadingUsers && (
          <div className="w-full h-auto flex justify-center items-center py-10 relative">
            <LoadingSpinner />
          </div>
        )}
      </DashboardContainer>
    </>
  );
}
