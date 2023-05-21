import React, { useContext, useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { MdDoNotDisturbOn } from "react-icons/md";

import ArticleContext from "../../context/ArticleContext";
import PreviewArticle from "../PreviewArticle/PreviewArticle";

export default function DashArticleList({
  art,
  formattedDate,
  editedFormattedDate,
  author,
  deleteArticle,
}) {
  const { modalSize, setModalSize } = useContext(ArticleContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        key={art.id}
        className="grid grid-cols-[2fr,1fr] md:grid-cols-[1fr,1fr,auto] lg:grid-cols-[2fr,2fr,1fr,1fr,2.5%] items-center justify-items-start bg-slate-100 hover:bg-slate-200 relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md transition-all duration-300 origin-center"
      >
        <div>
          <p className="text-sm text-slate-500 font-medium py-2 flex">
            {art.title.length > 30 ? `${art.title.slice(0, 30)}...` : art.title}
          </p>
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
          <p className="hidden md:flex text-sm text-slate-500 font-medium">
            {formattedDate}
          </p>
        </div>
        <div>
          <p className="hidden lg:flex text-sm text-slate-500 font-medium">
            {art.edited ? editedFormattedDate : formattedDate}
          </p>
        </div>
        <div>
          <p className="hidden xl:flex text-sm text-slate-500 font-medium">
            {art.edited ? (
              <AiFillCheckCircle size="22" className="text-lime-500" />
            ) : (
              <MdDoNotDisturbOn size="22" className="text-rose-400" />
            )}
          </p>
        </div>
      </button>
      <PreviewArticle
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalSize={modalSize}
        setModalSize={setModalSize}
        article={art}
        deleteArticle={deleteArticle}
      />
    </>
  );
}
