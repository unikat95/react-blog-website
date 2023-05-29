import React, { useContext } from "react";
import MessageItem from "../MessageItem/MessageItem";
import BlogContext from "../../context/BlogContext";
import MessageContext from "../../context/MessageContext";

export default function SentMessages() {
  const { userList, user } = useContext(BlogContext);
  const { messageList } = useContext(MessageContext);
  const sentMessages = [...messageList].filter((msg) => msg.from === user.uid);
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {sentMessages.length <= 0 ? (
          <div>There are no messages to display.</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              {sentMessages.map((msg) => {
                const msgTo = userList.find((user) => user.id === msg.to);
                return (
                  <MessageItem
                    msg={msg}
                    msgUser={msgTo}
                    userList={userList}
                    toWhom={"To"}
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
