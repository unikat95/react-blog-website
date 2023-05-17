import React, { useState } from "react";

import UsersDropdown from "../UsersDropdown/UsersDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function UserListItem({ el, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-[1fr,auto,auto] md:grid-cols-[2fr,1fr,1fr,1fr,auto,auto] lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] xl:grid-cols-[3fr,2fr,2fr,2fr,2fr,4fr,auto] items-center justify-items-start bg-slate-100 hover:bg-slate-200 relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md">
      <div>{el.email}</div>
      <div>
        {el.picture === "" ? (
          <span className="w-[2em] h-[2em] bg-gray-500 flex justify-center items-center rounded-full uppercase text-white font-bold">
            {el.email.slice(0, 1)}
          </span>
        ) : (
          <img
            src={el.picture}
            alt=""
            className="w-[2em] h-[2em] rounded-full object-cover"
          />
        )}
      </div>
      <div className="hidden md:flex">
        <p>{el.firstName !== "" ? el.firstName : "---"}</p>
      </div>
      <div className="hidden md:flex">
        <p>{el.lastName !== "" ? el.lastName : "---"}</p>
      </div>
      <div className="hidden md:flex">
        <p>{el.birthDate !== "" ? el.birthDate : "---"}</p>
      </div>
      <div className="hidden xl:flex">
        <p>
          {el.about !== ""
            ? el.about.length > 30
              ? el.about.slice(0, 30) + "..."
              : el.about
            : "---"}
        </p>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 bg-white hover:bg-slate-300 w-[2em] h-[2em] rounded-full flex justify-center items-center"
      >
        <BsThreeDotsVertical size="20" />
      </button>
      {isOpen && <UsersDropdown isOpen={isOpen} />}
    </div>
  );
}