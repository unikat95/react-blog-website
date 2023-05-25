import React, { useContext } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";

import { Link, useParams } from "react-router-dom";
import MessageContext from "../../context/MessageContext";
import BlogContext from "../../context/BlogContext";

export default function MessageDetail() {
  const { messageList } = useContext(MessageContext);
  const { userList, user } = useContext(BlogContext);
  const { msgId } = useParams();
  const message = messageList.find((msg) => msg.id === msgId);
  const msgFrom = userList.find((user) => user.id === message.from);

  return (
    <div className="w-full flex flex-col gap-10 justify-start items-start">
      <div className="w-full flex flex-col gap-2">
        <div>{msgFrom.firstName}</div>
        <div className="w-full flex flex-col gap-5 bg-white rounded-lg p-5">
          <div>{message.title}</div>
          <div>
            <p className="bg-gray-100 p-2 rounded-md">{message.message}</p>
          </div>
        </div>
      </div>
      <div>
        <Link
          to="/messages"
          className="flex justify-center items-center text-slate-800 hover:text-slate-900 hover:underline rounded-md"
        >
          <IoIosArrowRoundBack size="20" />
          <p>Back to messages list</p>
        </Link>
      </div>
    </div>
  );
}
