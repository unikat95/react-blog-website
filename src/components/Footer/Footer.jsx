import React, { useContext } from "react";

import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";

import { Link } from "react-router-dom";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";

export default function Footer() {
  const { isProfileLoading, userList } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const latestArticles = articleList
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
    .slice(0, 3);
  if (isProfileLoading || !userList.length) {
    return <LoadingProfile />;
  }

  return (
    <div className="w-full">
      <div className="w-full h-auto bg-slate-900 text-slate-50 items-center justify-center flex py-14 px-5 xl:px-0">
        <div className="w-full max-w-[1300px] flex flex-col justify-between items-center gap-20">
          <div className="w-full flex flex-col md:flex-row justify-between items-center sm:items-start gap-20">
            <div className="flex gap-10 md:gap-20">
              <div className="w-auto border-r-2 border-slate-800 pr-10 md:pr-20">
                <p className="font-medium text-slate-300">Quick links</p>
                <ul className="flex flex-col gap-1 mt-3 list-disc">
                  <li className="text-sm font-light ml-5 text-slate-200 hover:text-slate-300">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="text-sm font-light ml-5 text-slate-200 hover:text-slate-300">
                    <Link to="/articles">Articles</Link>
                  </li>
                  <li className="text-sm font-light ml-5 text-slate-200 hover:text-slate-300">
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </div>
              <div className="w-auto">
                <p>Latest articles</p>

                <ul className="flex flex-col gap-1 mt-3 list-disc">
                  {latestArticles.map((art) => (
                    <li
                      key={art.id}
                      className="text-sm font-light ml-5 text-slate-200 hover:text-slate-300"
                    >
                      <Link to={`articles/${art.id}`}>
                        {art.title.length >= 40
                          ? `${art.title.slice(0, 40)}...`
                          : art.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-auto flex flex-col gap-3">
              <p>Follow us on</p>
              <div className="flex gap-3 -ml-1">
                <Link to="/" className="text-slate-100 hover:text-slate-300">
                  <AiFillInstagram size="40" />
                </Link>
                <Link to="/" className="text-slate-100 hover:text-slate-300">
                  <AiFillFacebook size="40" />
                </Link>
                <Link to="/" className="text-slate-100 hover:text-slate-300">
                  <AiFillTwitterSquare size="40" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto bg-gray-950 text-slate-50 items-center justify-center flex py-5">
        <p className="text-sm">
          &copy; Copyright 2023 BlogApp. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
