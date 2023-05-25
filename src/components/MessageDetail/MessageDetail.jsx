import React, { useContext, useState } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import { FaReply } from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import MessageContext from "../../context/MessageContext";
import BlogContext from "../../context/BlogContext";
import Button from "../Button/Button";
import { db } from "../../config/firebase";
import { FieldValue, serverTimestamp } from "firebase/firestore";

export default function MessageDetail() {
  const { messageList, updateMessage } = useContext(MessageContext);
  const { userList, user } = useContext(BlogContext);
  const { msgId } = useParams();
  const [reply, setReply] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const message = messageList.find((msg) => msg.id === msgId);

  const msgFrom = userList.find((user) => user.id === message.from);

  const replyMessageRef = db.collection("messages").doc(message.id);

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
    <div className="w-full flex flex-col gap-10 justify-start items-start">
      <div className="w-full flex flex-col gap-5">
        <div>
          {message.from === user.uid ? "You" : msgFrom.firstName}{" "}
          {msgFrom.lastName}:
        </div>
        <div className="w-full flex flex-col gap-5 bg-white rounded-lg p-5 shadow-sm">
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
            console.log(replyUser.id === user.uid);
            return (
              <div
                key={rep.id}
                className={`w-[80%] flex flex-col ${
                  replyUser.id === user.uid && "items-end"
                }`}
              >
                <div
                  className={`flex flex-col w-[96%] ${
                    replyUser.id === user.uid
                      ? "bg-slate-50 border-l-[5px] border-slate-200"
                      : "bg-white border-r-[5px] border-orange-200"
                  } p-5 rounded-lg shadow-sm relative gap-3`}
                >
                  <div>
                    <p className="text-xs">
                      {replyUser.firstName} {replyUser.lastName}:
                    </p>
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
              className="w-[80%] bg-white p-5 rounded-lg flex flex-col gap-5 items-end"
            >
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
              <Button disabled={!replyMsg} value={"Reply"} />
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
      <div>
        <Link
          to="/messages"
          className="flex justify-center items-center text-slate-800 hover:text-slate-900 hover:underline rounded-md"
        >
          <IoIosArrowRoundBack size="20" />
          <p>Back to messages</p>
        </Link>
      </div>
    </div>
  );
}
