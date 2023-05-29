import React, { useContext } from "react";

import BlogContext from "../../context/BlogContext";
import UserPhoto from "../UserPhoto/UserPhoto";
import { IoMdArrowDropdown } from "react-icons/io";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import MessageContext from "../../context/MessageContext";

export default function UserProfile({ bgColor, arrowBg, arrowText }) {
  const { openDropdown, showDropdown } = useContext(BlogContext);
  const { messageList, shouldDisplayDot } = useContext(MessageContext);

  return (
    <div className="relative">
      <div className={`p-2 ${bgColor} rounded-full`}>
        <div
          className="flex gap-1 justify-center items-center group relative cursor-pointer"
          onClick={openDropdown}
        >
          <UserPhoto />
          {messageList.map(
            (message) =>
              shouldDisplayDot(message) && (
                <span
                  key={message.id}
                  className={`absolute w-[.7em] h-[.7em] bottom-0 right-6 bg-red-500 rounded-full ${
                    message.unreadTo || message.unreadFrom
                      ? "visible"
                      : "invisible"
                  }`}
                ></span>
              )
          )}
          <button
            className={`w-[1em] h-[.85em] ${arrowBg} shadow-sm rounded-[4px] text-gray-500 absolute bottom-0 right-0`}
          >
            <IoMdArrowDropdown
              className={`${arrowText} ${showDropdown && "rotate-180"}`}
            />
          </button>
        </div>
      </div>
      <ProfileDropdown
        showDropdown={showDropdown}
        shouldDisplayDot={shouldDisplayDot}
        messageList={messageList}
      />
    </div>
  );
}
