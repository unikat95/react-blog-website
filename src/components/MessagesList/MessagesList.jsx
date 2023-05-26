import React, { useContext, useEffect } from "react";

import { BsEnvelopeOpenFill } from "react-icons/bs";
import { RiSendPlaneFill, RiSensorFill, RiMailSendFill } from "react-icons/ri";

import { Link, Outlet, useLocation } from "react-router-dom";
import MessageContext from "../../context/MessageContext";
import Container from "../Container/Container";

export default function MessagesList() {
  const { message, setMessage, getMessageList } = useContext(MessageContext);
  const location = useLocation();

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
      <div className="w-full flex gap-10">
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
                    "text-slate-200"
                  }`}
                />
                <p>Incoming Messages</p>
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
                    "text-slate-200"
                  }`}
                />
                <p>Sent Messages</p>
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
                    location.pathname === "/messages/archive" &&
                    "text-slate-200"
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
