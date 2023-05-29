import React, { useContext } from "react";
import MessageItem from "../MessageItem/MessageItem";
import BlogContext from "../../context/BlogContext";
import MessageContext from "../../context/MessageContext";

export default function IncomingMessage() {
  const { userList } = useContext(BlogContext);
  const { incomingMessages } = useContext(MessageContext);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {incomingMessages.length <= 0 ? (
          <div>There are no messages to display.</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              {incomingMessages.map((msg) => {
                const msgFrom = userList.find((user) => user.id === msg.from);
                return (
                  <MessageItem
                    msg={msg}
                    msgUser={msgFrom}
                    status={msg.status}
                    toWhom={"From"}
                    key={msg.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
