import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import BlogContext from "./context/BlogContext";

export default function Root() {
  const { loading, dataLoaded } = useContext(BlogContext);
  return (
    <div className="w-full flex flex-col justify-start items-center px-5 relative overflow-x-hidden">
      {loading && <Loading />}
      <div className="flex flex-col w-full max-w-[1300px] items-center py-10 gap-10">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
