import React, { useContext } from "react";
import MessageItem from "../MessageItem/MessageItem";
import BlogContext from "../../context/BlogContext";
import MessageContext from "../../context/MessageContext";

export default function IncomingMessage() {
  const { userList, user } = useContext(BlogContext);
  const { messageList } = useContext(MessageContext);

  const incomingMessages = [...messageList].filter(
    (msg) => msg.to === user.uid
  );
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr,2fr,3fr,1fr] gap-2 px-4">
            <div>
              <p className="text-xs text-slate-700 font-bold">From</p>
            </div>
            <div>
              <p className="text-xs text-slate-700 font-bold">Title</p>
            </div>
            <div>
              <p className="text-xs text-slate-700 font-bold">Message</p>
            </div>
            <div>
              <p className="text-xs text-slate-700 font-bold">Date</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {incomingMessages.map((msg) => {
              const msgFrom = userList.find((user) => user.id === msg.from);
              return <MessageItem msg={msg} msgUser={msgFrom} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
