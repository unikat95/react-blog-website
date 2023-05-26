import React, { useContext, useState } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import { FaReply } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { Link, useParams } from "react-router-dom";
import MessageContext from "../../context/MessageContext";
import BlogContext from "../../context/BlogContext";
import Button from "../Button/Button";
import { db } from "../../config/firebase";
import Container from "../Container/Container";

export default function MessageDetail() {
  const { messageList, updateMessage } = useContext(MessageContext);
  const { userList, user } = useContext(BlogContext);
  const { msgId } = useParams();
  const [reply, setReply] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const message = messageList.find((msg) => msg.id === msgId);
  const msgFrom = userList.find((user) => user.id === message.from);
  const replyMessageRef = db.collection("messages").doc(message.id);
  const date = new Date(message.written);
  const formattedDate = date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const snapshot = await replyMessageRef.get();

    if (!snapshot.data()) {
      throw new Error("Message does not exist");
    }

    const messageData = snapshot.data();
    const updatedReplies = [
      ...(messageData.replies || []),
      { user: user.uid, msg: replyMsg, written: new Date().toISOString() },
    ];

    await replyMessageRef.update({
      replies: updatedReplies,
    });

    const updatedMessage = {
      ...messageData,
      id: snapshot.id,
      replies: updatedReplies,
    };

    updateMessage(updatedMessage);
    setReply(false);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-10 justify-start items-start">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-5 bg-white rounded-lg p-5 shadow-sm border-l-[5px] border-blue-400">
            <div className="text-xs flex gap-2 justify-start items-center">
              <div>
                {msgFrom.picture === "" ? (
                  <span className="w-[2em] h-[2em] bg-gray-500 flex justify-center items-center rounded-full uppercase text-white font-bold">
                    {msgFrom.email.slice(0, 1)}
                  </span>
                ) : (
                  <img
                    src={msgFrom.picture}
                    alt=""
                    className="w-[2em] h-[2em] rounded-full object-cover"
                  />
                )}
              </div>
              <div className="font-bold text-slate-600">
                {msgFrom.firstName} {msgFrom.lastName},
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {formattedDate}
              </div>
            </div>
            <div>
              <p className="text-base">{message.title}</p>
            </div>
            <div>
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end items-end gap-5">
            {message.replies.map((rep) => {
              const replyUser = userList.find((user) => user.id === rep.user);
              const replyDate = new Date(rep.written);
              const formattedDate = replyDate.toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={rep.id}
                  className={`w-full flex flex-col ${
                    replyUser.id === user.uid && "items-end"
                  }`}
                >
                  <div
                    className={`flex flex-col w-full ${
                      replyUser.id === user.uid
                        ? "w-[97%] bg-slate-50 border-l-[5px] border-gray-400"
                        : "bg-white border-l-[5px] border-blue-400"
                    } p-5 rounded-lg shadow-sm relative gap-3`}
                  >
                    <div>
                      <div className="text-xs flex gap-2 justify-start items-center">
                        <div>
                          {replyUser.picture === "" ? (
                            <span className="w-[2em] h-[2em] bg-gray-500 flex justify-center items-center rounded-full uppercase text-white font-bold">
                              {replyUser.email.slice(0, 1)}
                            </span>
                          ) : (
                            <img
                              src={replyUser.picture}
                              alt=""
                              className="w-[2em] h-[2em] rounded-full object-cover"
                            />
                          )}
                        </div>
                        <div className="font-bold text-slate-600">
                          {replyUser.firstName} {replyUser.lastName},
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {formattedDate}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">{rep.msg}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {reply && (
            <div className="w-full flex flex-col justify-end items-end">
              <form
                onSubmit={handleSubmit}
                className="w-[80%] bg-white p-5 rounded-lg flex flex-col gap-5 items-end relative"
              >
                <button
                  onClick={() => setReply(false)}
                  type="button"
                  className="absolute top-4 right-5"
                >
                  <AiFillCloseCircle
                    size="22"
                    className="text-slate-600 hover:text-slate-950"
                  />
                </button>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="msg">Message:</label>
                  <textarea
                    type="text"
                    id="msg"
                    placeholder="message..."
                    rows={4}
                    value={replyMsg}
                    onChange={(e) => setReplyMsg(e.target.value)}
                    className="bg-slate-100 p-2 focus:outline-none rounded-md"
                    required
                  />
                </div>
                <Button disabled={!replyMsg} value={"Send"} />
              </form>
            </div>
          )}
          <div className="flex justify-end mr-5">
            <button
              onClick={() => setReply(!reply)}
              className="flex justify-center items-center gap-1 underline"
            >
              <p>Reply</p> <FaReply />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
