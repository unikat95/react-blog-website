import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import { RiMailSendLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import MessageContext from "../../context/MessageContext";
import BlogContext from "../../context/BlogContext";

export default function SendMessage() {
  const { setMessage, sendMessage, getMessageList } =
    useContext(MessageContext);
  const { setLoading, user } = useContext(BlogContext);
  const { userId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const messageData = {
      from: user.uid,
      title: title,
      message: text,
      to: userId,
      replies: [],
      written: new Date().toISOString(),
    };
    await sendMessage({ messageData });
    setMessage(true);
    navigate("/messages/incoming-messages");
    getMessageList();
  };

  return (
    <>
      <div className="w-full h-auto flex justify-center items-center bg-white p-10 rounded-lg">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="title..."
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-100 p-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">Message:</label>
            <textarea
              type="text"
              id="message"
              rows={10}
              placeholder="message..."
              onChange={(e) => setText(e.target.value)}
              className="bg-slate-100 p-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <Button value={"Send message"} Icon={RiMailSendLine} />
          </div>
        </form>
      </div>
    </>
  );
}
