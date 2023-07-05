import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MessageContext from "../../context/MessageContext";

export default function MessageItem({ msg, msgUser, toWhom }) {
  const { shouldDisplayDot } = useContext(MessageContext);
  const isUnread = shouldDisplayDot(msg);

  const formattedDate = new Date(msg.written.seconds * 1000).toLocaleString();

  return (
    <>
      <Link
        to={`/messages/msg/${msg.id}`}
        className={`grid grid-cols-[2fr,5fr,auto] gap-10 ${
          isUnread ? "bg-emerald-100" : "bg-white"
        } p-3 rounded-lg relative`}
      >
        {isUnread && (
          <span className="absolute w-[.7rem] h-[.7rem] top-2 right-2 bg-emerald-400 rounded-full"></span>
        )}
        <div className="flex flex-col gap-1">
          <div
            className={`text-[.55rem] ${
              isUnread ? "text-emerald-600" : "text-slate-400"
            } uppercase font-black`}
          >
            {toWhom}
          </div>
          <div
            className={`text-sm font-medium ${
              isUnread ? "text-emerald-800" : "text-slate-500"
            } flex justify-start items-center gap-2`}
          >
            <div>
              {msgUser.picture === "" ? (
                <span className="w-[1.75em] h-[1.75em] bg-gray-500 flex justify-center items-center rounded-full uppercase text-white font-bold">
                  {msgUser.email.slice(0, 1)}
                </span>
              ) : (
                <img
                  src={msgUser.picture}
                  alt=""
                  className="w-[1.75em] h-[1.75em] rounded-full object-cover"
                />
              )}
            </div>
            <div>
              {msgUser.firstName} {msgUser.lastName}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`text-[.55rem] ${
              isUnread ? "text-emerald-600" : "text-slate-400"
            } uppercase font-black `}
          >
            Title
          </div>
          <div
            className={`text-sm font-medium ${
              isUnread ? "text-emerald-800" : "text-slate-500"
            }`}
          >
            {msg.title}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`text-[.55rem] ${
              isUnread ? "text-emerald-600" : "text-slate-400"
            } uppercase font-black`}
          >
            Date
          </div>
          <div
            className={`text-sm font-medium ${
              isUnread ? "text-emerald-800" : "text-slate-500"
            }`}
          >
            {formattedDate}
          </div>
        </div>
      </Link>
    </>
  );
}
