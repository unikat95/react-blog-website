import React, { useContext, useState } from "react";

import { GoLinkExternal } from "react-icons/go";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import Container from "../components/Container/Container";
import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";
import ArticleContext from "../context/ArticleContext";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function Articles() {
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
    <Container>
      <div className="flex flex-col justify-center items-center gap-5">
        {sortedArticleList.slice(0, numberOfArticles).map((art) => {
          const formattedDate = new Date(
            art.createdAt.seconds * 1000
          ).toLocaleString();
          const author = userList.find((user) => user.id === art.author);

          return (
            <div
              key={art.id}
              className="grid grid-cols-1 md:grid-cols-[30%,1fr] lg:grid-cols-[23%,1fr] rounded-lg overflow-hidden bg-white hover:bg-slate-50 shadow-sm"
            >
              <Link
                to={`/articles/${art.id}`}
                className="w-full h-full overflow-hidden group"
              >
                <img
                  src={art.image}
                  alt=""
                  className="w-full md:max-w-[19rem] h-full min-h-[17rem] max-h-[17rem] md:min-h-[14rem] md:max-h-[14rem] object-cover group-hover:scale-[1.1] group-hover:rotate-3 duration-300"
                />
              </Link>
              <div className="w-full h-full flex flex-col justify-between items-start gap-3 p-5">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">
                      Posted: {formattedDate}
                    </p>
                    <Link
                      to={`/articles/${art.id}`}
                      className="text-slate-700 font-bold hover:underline"
                    >
                      {art.title}
                    </Link>
                  </div>
                  <div>
                    <p className="text-slate-600 text-base">
                      {art.text.length > 200
                        ? HTMLReactParser(art.text.slice(0, 200) + "...")
                        : HTMLReactParser(art.text)}
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <Link
                    to={`/users/${art.author}`}
                    className="flex justify-center items-center gap-2"
                  >
                    <p className="text-slate-600 text-sm font-medium">
                      Author:
                    </p>
                    <p>
                      {author.firstName} {author.lastName}
                    </p>
                  </Link>
                  <div>
                    <Link
                      to={`/users/${art.author}`}
                      className="underline text-slate-600 hover:text-slate-900 flex justify-center items-center gap-1"
                    >
                      <p>Read more</p> <GoLinkExternal />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {numberOfArticles >= articleList.length ? null : (
          <button
            onClick={handleShowMore}
            className="flex justify-center items-center gap-1 hover:underline"
          >
            {loading && <LoadingSpinner width="w-[1em]" height="h-[1em]" />}
            <p className="ml-2">Show more</p>{" "}
            <MdKeyboardDoubleArrowDown size="18" />
          </button>
        )}
      </div>
    </Container>
  );
}
