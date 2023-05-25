import React, { useContext, useEffect } from "react";
import MessageContext from "../../context/MessageContext";
import BlogContext from "../../context/BlogContext";
import { Link } from "react-router-dom";

export default function MessagesList() {
  const { message, setMessage, getMessageList, messageList } =
    useContext(MessageContext);
  const { user, userList } = useContext(BlogContext);

  const sentMessages = [...messageList].filter((msg) => msg.from === user.uid);
  const incomingMessages = [...messageList].filter(
    (msg) => msg.to === user.uid
  );

  useEffect(() => {
    getMessageList();
  }, []);

  useEffect(() => {
    const inter = setInterval(() => {
      setMessage(false);
    }, 2000);
    return () => clearInterval(inter);
  }, []);

  return (
    <>
      <div>Messages List</div>
      <div className="w-full flex flex-col gap-20">
        <div
          className={`w-auto rounded-md shadow-sm absolute top-10 left-[50%] translate-x-[-50%] flex overflow-hidden transition-transform z-[9999] ${
            message ? "translate-y-0" : "translate-y-[-50dvh]"
          }`}
        >
          <p className="w-full p-4 px-6 bg-lime-500 text-white whitespace-nowrap">
            Message successfully sent!
          </p>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div>Sent messages:</div>
          <div className="flex flex-col gap-2">
            {sentMessages.map((msg) => {
              const msgTo = userList.find((user) => user.id === msg.to);
              return (
                <Link
                  to={`/messages/${msg.id}`}
                  key={msg.id}
                  className="flex justify-between gap-2 bg-white p-2 rounded-lg"
                >
                  <div>
                    to: {msgTo.firstName} {msgTo.lastName}
                  </div>
                  <div>Title: {msg.title}</div>
                  <div>
                    Message:
                    {msg.message.length > 70
                      ? `${msg.message.slice(0, 70)}...`
                      : msg.message}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div>Incoming messages: </div>
          <div className="flex flex-col gap-2">
            {incomingMessages.map((msg) => {
              const msgFrom = userList.find((user) => user.id === msg.from);
              return (
                <Link
                  to={`/messages/${msg.id}`}
                  key={msg.id}
                  className="flex justify-between gap-2 bg-white p-2 rounded-lg"
                >
                  <div>
                    from: {msgFrom.firstName} {msgFrom.lastName}
                  </div>
                  <div>Title: {msg.title}</div>
                  <div>
                    Message:
                    {msg.message.length > 70
                      ? `${msg.message.slice(0, 70)}...`
                      : msg.message}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
