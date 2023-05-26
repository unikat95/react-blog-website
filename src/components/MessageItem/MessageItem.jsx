import React from "react";
import { Link } from "react-router-dom";

export default function MessageItem({ msg, msgUser }) {
  const date = new Date(msg.written);
  const formattedDate = date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      to={`/messages/msg/${msg.id}`}
      key={msg.id}
      className="grid grid-cols-[1fr,2fr,3fr,1fr] gap-2 bg-white p-4 rounded-lg"
    >
      <div>
        <p className="text-sm font-medium text-slate-600">
          {msgUser.firstName} {msgUser.lastName}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600">{msg.title}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600">
          {msg.message.length > 30
            ? `${msg.message.slice(0, 30)}...`
            : msg.message}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600">{formattedDate}</p>
      </div>
    </Link>
  );
}
