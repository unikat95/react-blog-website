import React from "react";
import { HashLoader } from "react-spinners";

export default function LoadingProfile() {
  return (
    <div className="w-full h-screen top-0 left-0 right-0 bottom-0 bg-gray-100 absolute z-[9999] flex flex-col justify-center items-center">
      <div className=" w-full min-h-screen flex justify-center items-center">
        <HashLoader color="#a3d0df" />
      </div>
    </div>
  );
}
