import React from "react";

export default function Container({ children }) {
  return (
    <div className="w-full max-w-[1300px] flex flex-col justify-center items-center py-32 px-5 xl:px-0 ">
      {children}
    </div>
  );
}
