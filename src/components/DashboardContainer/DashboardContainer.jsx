import React from "react";

export default function DashboardContainer({ children }) {
  return (
    <div className="w-full h-full flex flex-col justify-start items-end p-2 md:p-3 lg:p-7 xl:p-10">
      <div className="w-[calc(100%)] lg:w-full flex flex-col gap-2 bg-white p-2 rounded-md duration-300">
        {children}
      </div>
    </div>
  );
}