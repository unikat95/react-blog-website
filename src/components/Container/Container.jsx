import React from "react";

export default function Container({ children }) {
  return (
    <div className="w-full max-w-[1300px] flex flex-col py-5 px-5 xl:px-0 mt-24">
      {children}
    </div>
  );
}
