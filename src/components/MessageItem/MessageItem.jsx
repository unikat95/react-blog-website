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
        className={`grid grid-cols-[2fr,2fr,4fr,auto] gap-2 ${
          isUnread ? "bg-emerald-100" : "bg-white"
        } p-4 rounded-lg relative`}
      >
        {isUnread && (
          <span className="absolute w-[.7rem] h-[.7rem] top-1 right-1 bg-emerald-400 rounded-full"></span>
        )}
        <div className="flex flex-col gap-1">
          <p
            className={`text-[.55rem] ${
              isUnread ? "text-emerald-600" : "text-slate-400"
            } uppercase font-black`}
          >
            {toWhom}
          </p>
          <p
            className={`text-xs font-bold ${
              isUnread ? "text-emerald-800" : "text-slate-500"
            }`}
          >
            {msgUser.firstName} {msgUser.lastName}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p
            className={`text-[.55rem] ${
              isUnread ? "text-emerald-600" : "text-slate-400"
            } uppercase font-black`}
          >
            Title
          </p>
          <p
            className={`text-xs font-bold ${
              isUnread ? "text-emerald-800" : "text-slate-500"
            }`}
          >
            {msg.title}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p
            className={`text-[.55rem] ${
              isUnread ? "text-emerald-600" : "text-slate-400"
            } uppercase font-black`}
          >
            Message
          </p>
          <p
            className={`text-xs font-bold ${
              isUnread ? "text-emerald-800" : "text-slate-500"
            }`}
          >
            {msg.message.length > 40
              ? `${msg.message.slice(0, 40)}...`
              : msg.message}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p
            className={`text-[.55rem] ${
              isUnread ? "text-emerald-600" : "text-slate-400"
            } uppercase font-black`}
          >
            Date
          </p>
          <p
            className={`text-xs font-bold ${
              isUnread ? "text-emerald-800" : "text-slate-500"
            }`}
          >
            {formattedDate}
          </p>
        </div>
      </Link>
    </>
  );
}
