import React, { useState } from "react";

import {
  AiFillCloseCircle,
  AiFillEdit,
  AiFillDelete,
  AiFillCheckCircle,
} from "react-icons/ai";
import { MdDoNotDisturbOn } from "react-icons/md";

import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import Author from "../Author/Author";

export default function DashArticleList({
  art,
  formattedDate,
  editedFormattedDate,
  author,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        key={art.id}
        className="grid grid-cols-[3fr,2fr,1fr,1fr,2.5%] items-center justify-items-start bg-slate-100 hover:bg-slate-200 relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md transition-all duration-300 origin-center"
      >
        <div>
          <p className="text-sm text-slate-500 font-medium py-2">{art.title}</p>
        </div>
        <div>
          <div className="text-sm text-slate-500 font-medium flex gap-2 justify-center items-center">
            {author.picture === "" ? (
              <div className="w-[2.25em] h-[2.25em] rounded-full bg-yellow-500 flex justify-center items-center">
                <p className="text-md text-white uppercase font-bold flex justify-center items-center">
                  {author.firstName === "" || author.lastName === ""
                    ? author.email.slice(0, 1)
                    : author.firstName.slice(0, 1) +
                      author.lastName.slice(0, 1)}
                </p>
              </div>
            ) : (
              <img
                src={author.picture}
                alt=""
                className="w-[2.25em] h-[2.25em] rounded-full object-cover"
              />
            )}
            <p>
              {author.firstName} {author.lastName}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{formattedDate}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {art.edited ? editedFormattedDate : formattedDate}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {art.edited ? (
              <AiFillCheckCircle size="22" className="text-lime-500" />
            ) : (
              <MdDoNotDisturbOn size="22" className="text-rose-400" />
            )}
          </p>
        </div>
      </button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="w-full justify-between items-center flex gap-2">
          <div className="flex gap-2 justify-center items-center">
            <Link
              to={`/dashboard/edit-article/${art.id}`}
              className="bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-slate-100 px-4 py-2 rounded-md flex justify-center items-center gap-1"
            >
              <AiFillEdit size="24" />
              <p>Edit article</p>
            </Link>
            <button
              onClick={() => {}}
              className="bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-slate-100 px-4 py-2 rounded-md flex justify-center items-center gap-1"
            >
              <AiFillDelete size="24" />
              <p>Delete article</p>
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-slate-100 px-4 py-2 rounded-md flex justify-center items-center gap-1"
            >
              <AiFillCloseCircle size="24" />
            </button>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-5 px-5 overflow-auto">
          <div className="w-full h-auto flex flex-col justify-start items-center gap-10 rounded-md">
            <Link to={`/users/${author.id}`}>
              <Author
                author={author}
                direction={"flex-col"}
                align={"items-center"}
              />
            </Link>
            <h1 className="text-3xl text-slate-700 font-bold">{art.title}</h1>
            <img
              src={art.image}
              alt=""
              className="w-full h-full max-h-[23em] object-cover rounded-lg"
            />
            <p>{art.text}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
