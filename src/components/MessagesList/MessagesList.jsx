import React, { useContext, useEffect } from "react";

import { RiSendPlaneFill, RiSensorFill, RiMailSendFill } from "react-icons/ri";

import { Link, Outlet, useLocation } from "react-router-dom";
import MessageContext from "../../context/MessageContext";
import Container from "../Container/Container";
import BlogContext from "../../context/BlogContext";

export default function MessagesList() {
  const { user } = useContext(BlogContext);
  const { message, setMessage, getMessageList, messageList } =
    useContext(MessageContext);
  const location = useLocation();

  const incMsgTo = messageList.filter((msg) => msg.to === user.uid);
  const unreadMsgTo = incMsgTo.filter((msg) => msg.unreadTo === true);

  const incMsgFrom = messageList.filter((msg) => msg.from === user.uid);
  const unreadMsgFrom = incMsgFrom.filter((msg) => msg.unreadFrom === true);

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
    <Container>
      <div className="w-full flex gap-5">
        <div className="w-auto">
          <ul className="w-full bg-white p-5 flex flex-col justify-start items-start rounded-lg">
            <li className="w-full flex">
              <Link
                to="/messages/incoming-messages"
                className={`w-full px-4 py-2 whitespace-nowrap text-sm flex justify-start items-center gap-2 ${
                  location.pathname === "/messages/incoming-messages" &&
                  "text-slate-100 bg-slate-800 rounded-md"
                }`}
              >
                <RiMailSendFill
                  size="18"
                  className={`text-slate-700 ${
                    location.pathname === "/messages/incoming-messages" &&
                    "text-white"
                  }`}
                />
                <p>
                  Incoming Messages{" "}
                  {unreadMsgTo.length > 0 && `(${unreadMsgTo.length})`}
                </p>
              </Link>
            </li>
            <li className="w-full flex">
              <Link
                to="/messages/sent-messages"
                className={`w-full px-4 py-2 whitespace-nowrap text-sm flex justify-start items-center gap-2 ${
                  location.pathname === "/messages/sent-messages" &&
                  "text-slate-100 bg-slate-800 rounded-md"
                }`}
              >
                <RiSendPlaneFill
                  size="18"
                  className={`text-slate-700 ${
                    location.pathname === "/messages/sent-messages" &&
                    "text-white"
                  }`}
                />
                <p>
                  Sent Messages{" "}
                  {unreadMsgFrom.length > 0 && `(${unreadMsgFrom.length})`}
                </p>
              </Link>
            </li>
            <li className="w-full flex">
              <Link
                to="/messages/archive"
                className={`w-full px-4 py-2 whitespace-nowrap text-sm flex justify-start items-center gap-2 ${
                  location.pathname === "/messages/archive" &&
                  "text-slate-100 bg-slate-800 rounded-md"
                }`}
              >
                <RiSensorFill
                  size="18"
                  className={`text-slate-700 ${
                    location.pathname === "/messages/archive" && "text-white"
                  }`}
                />
                <p>Archive</p>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`w-auto rounded-md shadow-sm absolute top-10 left-[50%] translate-x-[-50%] flex overflow-hidden transition-transform z-[9999] ${
            message ? "translate-y-0" : "translate-y-[-50dvh]"
          }`}
        >
          <p className="w-full p-4 px-6 bg-lime-500 text-white whitespace-nowrap">
            Message successfully sent!
          </p>
        </div>
        <div className="w-full rounded-lg">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
