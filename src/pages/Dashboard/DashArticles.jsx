import React, { useContext, useEffect, useState } from "react";

import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";

import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import DashArticleList from "../../components/DashArticleList/DashArticleList";

export default function DashArticles() {
  const { articleList, getArticleList } = useContext(ArticleContext);
  const { userList } = useContext(BlogContext);
  const [spinner, setSpinner] = useState(true);
  const [message, setMessage] = useState(false);
  const [sortByLatest, setSortByLatest] = useState(true);

  useEffect(() => {
    getArticleList();
    setTimeout(() => {
      setSpinner(false);
    }, 300);
  }, []);

  const deleteArticle = async (id) => {
    await deleteDoc(doc(db, "articles", id));
    getArticleList();
    setTimeout(() => {
      setSpinner(false);
    }, 300);
    setMessage(true);
  };

  useEffect(() => {
    const inter = setInterval(() => {
      setMessage(false);
    }, 5000);
    return () => clearInterval(inter);
  }, []);

  const sortedArticles = articleList.sort((a, b) =>
    sortByLatest
      ? b.createdAt.toDate() - a.createdAt.toDate()
      : a.createdAt.toDate() - b.createdAt.toDate()
  );

  const handleToggleSortMethod = () => {
    setSortByLatest((prevSortByLatest) => !prevSortByLatest);
  };

  return (
    <>
      <DashboardContainer>
        <div className="grid grid-cols-[2fr,1fr] md:grid-cols-[1fr,1fr,auto] lg:grid-cols-[2fr,2fr,1fr,1fr,2.5%] items-center justify-items-start relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md transition-all duration-300 origin-center">
          <div className="flex text-[.70rem] font-black text-slate-500 uppercase">
            Title
          </div>
          <div className="flex text-[.70rem] font-black text-slate-500 uppercase">
            Author
          </div>
          <div
            onClick={handleToggleSortMethod}
            className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase cursor-pointer justify-center items-center select-none"
          >
            <p> Date of publication </p>
            <IoMdArrowDropdown
              size="22"
              className={`${!sortByLatest && "rotate-180"}`}
            />
          </div>
          <div className="hidden lg:flex text-[.70rem] font-black text-slate-500 uppercase">
            Last edit
          </div>
          <div className="hidden xl:flex text-[.70rem] font-black text-slate-500 uppercase">
            Edited
          </div>
        </div>
        {spinner ? (
          <div className="w-full h-auto flex justify-center items-center py-10 relative">
            <LoadingSpinner
              width={"w-[1.75em]"}
              height={"h-[1.75em]"}
              value={"Loading article list..."}
            />
          </div>
        ) : !articleList.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            there are currently no articles to display
          </div>
        ) : (
          <div className="w-full flex flex-col gap-1">
            {sortedArticles.map((art) => {
              const formattedDate = new Date(
                art.createdAt.seconds * 1000
              ).toLocaleString();
              const editedFormattedDate = new Date(
                art.lastEdit.seconds * 1000
              ).toLocaleString();
              const author = userList.find((user) => user.id === art.author);

              return (
                <DashArticleList
                  key={art.id}
                  art={art}
                  formattedDate={formattedDate}
                  editedFormattedDate={editedFormattedDate}
                  author={author}
                  deleteArticle={deleteArticle}
                />
              );
            })}
          </div>
        )}
        <div
          className={`w-auto rounded-md shadow-sm absolute top-10 left-[50%] translate-x-[-50%] flex overflow-hidden transition-transform z-[9999] ${
            message ? "translate-y-0" : "translate-y-[-200%]"
          }`}
        >
          <div className="w-auto p-4 bg-slate-500 text-slate-400">
            <AiFillCheckCircle size="24" />
          </div>
          <p className="w-full p-4 px-6 bg-slate-600 text-white whitespace-nowrap">
            Article successfully deleted!
          </p>
        </div>
      </DashboardContainer>
    </>
  );
}
