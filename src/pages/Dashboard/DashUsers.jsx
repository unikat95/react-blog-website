import React, { useContext, useEffect, useState } from "react";

import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../../components/LoadingProfile/LoadingProfile";
import UserListItem from "../../components/UserListItem/UserListItem";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import { AiTwotoneSetting } from "react-icons/ai";

export default function DashUsers() {
  const { isProfileLoading, userList, loadingUsers } = useContext(BlogContext);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 300);
  }, []);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      <DashboardContainer>
        <div className="grid grid-cols-[4fr,1fr,auto] md:grid-cols-[2fr,1fr,1fr,1fr,auto] lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] xl:grid-cols-[3fr,2fr,2fr,2fr,2fr,4fr,auto] items-center justify-items-start relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md">
          <div className="flex text-[.70rem] font-black text-slate-500 uppercase">
            Email
          </div>
          <div className="flex text-[.70rem] font-black text-slate-500 uppercase">
            Photo
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            First name
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Last name
          </div>
          <div className="hidden lg:flex text-[.70rem] font-black text-slate-500 uppercase">
            Birth Date
          </div>
          <div className="hidden xl:flex text-[.70rem] font-black text-slate-500 uppercase">
            About
          </div>
          <div className="px-2 bg-white w-[2em] h-[2em] rounded-full flex justify-center items-center">
            <AiTwotoneSetting size="20" className="text-slate-700" />
          </div>
        </div>
        {!spinner &&
          userList.map((el, index) => (
            <UserListItem key={el.id} el={el} index={index} />
          ))}
        {spinner && (
          <div className="w-full h-auto flex justify-center items-center py-10 relative">
            <LoadingSpinner
              width={"w-[1.75em]"}
              height={"h-[1.75em]"}
              value={"Loading user list..."}
            />
          </div>
        )}
      </DashboardContainer>
    </>
  );
}
