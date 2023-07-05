import React, { useContext, useState } from "react";

import { GoLinkExternal } from "react-icons/go";
import { MdKeyboardDoubleArrowDown, MdArticle } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import BlogContext from "../../context/BlogContext";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import ArticleContext from "../../context/ArticleContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ArticlesList() {
  const { isProfileLoading, userList } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const [numberOfArticles, setNumberOfArticles] = useState(3);
  const [loading, setLoading] = useState(false);

  const sortedArticleList = articleList.sort(
    (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
  );

  if (isProfileLoading) return <LoadingProfile />;

  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNumberOfArticles((prev) => prev + 3);
    }, 750);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      {sortedArticleList.slice(0, numberOfArticles).map((art) => {
        const formattedDate = new Date(
          art.createdAt.seconds * 1000
        ).toLocaleString();
        const author = userList.find((user) => user.id === art.author);

        return (
          <>
            <div
              key={art.id}
              className="grid grid-cols-1 md:grid-cols-[30%,1fr] lg:grid-cols-[23%,1fr] rounded-lg overflow-hidden gap-7 group"
            >
              <Link
                to={`/articles/${art.id}`}
                className="w-full h-full overflow-hidden"
              >
                <img
                  src={art.image}
                  alt=""
                  className="w-full md:max-w-[19rem] h-full min-h-[18rem] max-h-[18rem] md:min-h-[14rem] md:max-h-[14rem] object-cover group-hover:scale-[1.1] group-hover:rotate-3 duration-300 rounded-lg"
                />
              </Link>
              <div className="w-full h-full flex flex-col justify-between items-start gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-2">
                    <div className="text-xs flex gap-1 justify-start items-center text-slate-500">
                      <MdArticle size="16" className="text-slate-500" /> Posted:{" "}
                      {formattedDate}
                    </div>
                    <Link
                      to={`/articles/${art.id}`}
                      className="text-slate-700 font-bold text-2xl hover:underline inline-flex"
                    >
                      {art.title}
                    </Link>
                  </div>
                  <div>
                    <div className="text-slate-600 text-base">
                      {art.text.length > 350
                        ? HTMLReactParser(art.text.slice(0, 350) + "...")
                        : HTMLReactParser(art.text)}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <Link
                    to={`/users/${art.author}`}
                    className="flex justify-center items-center gap-2 group"
                  >
                    <div className="text-slate-600 group-hover:text-slate-700 text-sm font-medium flex justify-start items-center gap-1">
                      <FaUserAlt size="10" />
                      Author:
                    </div>
                    <div className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      {author.firstName} {author.lastName}
                    </div>
                  </Link>
                  <div>
                    <Link
                      to={`/articles/${art.id}`}
                      className="underline text-slate-600 hover:text-slate-900 flex justify-center items-center gap-1"
                    >
                      <div>Read more</div> <GoLinkExternal />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200"></div>
          </>
        );
      })}
      {numberOfArticles >= articleList.length ? null : (
        <button
          onClick={handleShowMore}
          className="flex justify-center items-center gap-1 hover:underline"
        >
          {loading && <LoadingSpinner width="w-[1em]" height="h-[1em]" />}
          <div className="ml-2">Show more</div>
          <MdKeyboardDoubleArrowDown size="18" />
        </button>
      )}
    </div>
  );
}
