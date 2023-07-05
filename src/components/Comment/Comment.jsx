import React, { useState } from "react";

import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineMessage,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaCrown, FaReply } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Reply from "../Reply/Reply";
import { useContext } from "react";
import BlogContext from "../../context/BlogContext";

export default function Comment({
  com,
  article,
  formattedDate,
  comUser,
  user,
  articleCommentRef,
  comments,
  setComments,
}) {
  const { userList } = useContext(BlogContext);
  const [reply, setReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likeCount, setLikeCount] = useState(com.likes.length);
  const [replyCount, setReplyCount] = useState(com.replies.length);
  const [showReply, setShowReply] = useState(false);
  const isLikedByUser = com.likes.some(
    (like) => like.user === user?.uid && like.status
  );

  const handleReplySubmit = () => {
    setReply(!reply);
    if (reply) {
      setShowReply(false);
    } else {
      setShowReply(true);
    }
  };

  const handleToggleReply = () => {
    setShowReply(!showReply);

    if (setReply) {
      setReply(false);
    } else {
      setReply(true);
      setReplyCount(com.replies.length);
    }
  };

  const handleLike = () => {
    const commentIndex = comments.findIndex((c) => c.id === com.id);
    if (commentIndex > -1) {
      const updatedComments = [...comments];
      const comment = { ...updatedComments[commentIndex] };
      const likeIndex = comment.likes.findIndex(
        (like) => like.user === user?.uid
      );

      if (likeIndex > -1) {
        comment.likes.splice(likeIndex, 1);
        setLikeCount(comment.likes.length);
      } else {
        comment.likes.push({ user: user?.uid, status: true });
        setLikeCount(comment.likes.length);
      }

      updatedComments[commentIndex] = comment;
      setComments(updatedComments);

      articleCommentRef.update({
        comments: updatedComments,
      });
    }
  };

  console.log(articleCommentRef);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const snapshot = await articleCommentRef.get();

    if (!snapshot.data()) {
      throw new Error("Message does not exist");
    }

    const commentData = snapshot.data();
    const newReply = {
      id: uuidv4(),
      user: user.uid,
      msg: replyText,
      written: new Date().toISOString(),
      likes: [],
    };
    const updatedComments = commentData.comments.map((comment) => {
      if (comment.id === com.id) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });

    await articleCommentRef.update({
      comments: updatedComments,
    });

    setComments(updatedComments);
    setReplyCount(replyCount + 1);
    setReplyText("");
  };

  return (
    <>
      <div
        key={com.id}
        className={`w-full bg-white shadow-sm rounded-lg p-5 flex flex-col gap-3 relative`}
      >
        {com.user === article.author && (
          <Tooltip
            content={"Author"}
            placement="bottom"
            className="p-2 bg-zinc-200 text-black"
          >
            <div className="absolute -left-2 -top-2 w-[1.75em] h-[1.75em] border-[4px] border-gray-100 bg-gray-100 flex justify-center items-center rounded-full">
              <FaCrown className="text-yellow-400" size="22" />
            </div>
          </Tooltip>
        )}
        <Link
          to={`/users/${comUser.id}`}
          className="flex justify-start items-center gap-3"
        >
          <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-yellow-500 rounded-full overflow-hidden relative">
            <div className="uppercase font-bold text-white text-base">
              {comUser.picture !== "" ? (
                <img
                  src={comUser.picture}
                  alt=""
                  className="w-full h-screen max-w-[2rem] max-h-[2rem] object-cover"
                />
              ) : comUser.firstName === "" && comUser.lastName === "" ? (
                user.email ? (
                  user.email.slice(0, 1)
                ) : (
                  ""
                )
              ) : comUser.firstName !== "" ? (
                comUser.firstName ? (
                  comUser.firstName.slice(0, 1) + comUser.lastName.slice(0, 1)
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="font-medium">
            {comUser.firstName} {comUser.lastName}
          </div>
        </Link>
        <div>{com.msg}</div>
        <div className="w-full h-full flex justify-between items-center gap-3">
          <div className="w-full flex justify-start items-center gap-2  -mb-2">
            <div className="flex gap-1 justify-center items-start">
              <div className="text-sm text-slate-600 font-medium mt-[2px]">
                {likeCount}
              </div>
              <button disabled={!user} className="w-auto" onClick={handleLike}>
                {isLikedByUser ? (
                  <AiTwotoneLike
                    size="20"
                    className="text-blue-400 hover:text-blue-300"
                  />
                ) : (
                  <AiOutlineLike
                    size="20"
                    className="text-slate-600 hover:text-blue-400"
                  />
                )}
              </button>
            </div>
            <div className="w-[1px] h-[14px] bg-slate-300 block "></div>
            <div className="text-xs text-slate-600 font-medium ">
              {formattedDate}
            </div>
            <div className="w-[1px] h-[14px] bg-slate-300 block "></div>

            <button
              onClick={handleToggleReply}
              className="text-xs text-slate-600 font-medium flex justify-center items-center gap-0.5 hover:underline"
            >
              <AiOutlineMessage size="20" className="text-slate-500 mb-[2px]" />
              <div>{replyCount} replies</div>
              <IoIosArrowDown
                size="14"
                className={`${showReply && "rotate-180"} text-slate-600`}
              />
            </button>
          </div>
          <div>
            <button
              onClick={handleReplySubmit}
              className="w-auto text-sm flex gap-1 justify-center items-center underline"
            >
              Reply <FaReply size="12" />
            </button>
          </div>
        </div>
      </div>
      {showReply &&
        com.replies.length > 0 &&
        com.replies.map((rep) => {
          const repUser = userList.find((user) => user.id === rep.user);
          const repDate = new Date(rep.written);
          const formattedDate = repDate.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <Reply
              key={rep.id}
              com={com}
              rep={rep}
              user={user}
              repUser={repUser}
              formattedDate={formattedDate}
              article={article}
              comments={comments}
              setComments={setComments}
            />
          );
        })}

      {reply && (
        <div className="w-[90%] ">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white shadow-sm  p-5 rounded-lg flex flex-col gap-5 items-end relative"
          >
            <button
              onClick={() => setReply(false)}
              className="absolute top-3 right-5"
            >
              <AiFillCloseCircle
                size="22"
                className="text-slate-700 hover:text-red-500 cursor-pointer"
              />
            </button>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="msg">Reply:</label>
              <textarea
                type="text"
                id="msg"
                placeholder="message..."
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="bg-slate-100 p-2 focus:outline-none rounded-md"
                required
              />
            </div>
            <Button value={"Send"} />
          </form>
        </div>
      )}
    </>
  );
}
