import React, { useContext } from "react";

import { Link, useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import Container from "../Container/Container";
import Author from "../Author/Author";

export default function Article() {
  const { isProfileLoading, userList } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const { artId } = useParams();
  const article = articleList.find((art) => art.id === artId);
  const author = userList.find((user) => user.id === article.author);

  if (isProfileLoading || !author) return <LoadingProfile />;

  const formattedDate = new Date(
    article.createdAt.seconds * 1000
  ).toLocaleString();

  return article ? (
    <Container>
      <div className="w-full max-w-[1000px] bg-white py-16 px-14 h-auto flex flex-col justify-start items-center gap-10 rounded-lg shadow-sm mb-20">
        <Link to={`/users/${author.id}`}>
          <Author
            author={author}
            direction={"flex-col"}
            align={"items-center"}
          />
        </Link>
        <h6 className="text-slate-400 text-xs font-bold uppercase -mb-5">
          Posted: {formattedDate}
        </h6>
        <h1 className="text-3xl text-slate-700 font-bold">{article.title}</h1>
        <img
          src={article.image}
          alt=""
          className="w-full h-full max-h-[23em] object-cover rounded-lg"
        />
        <p className="text-lg text-slate-600 text-justify">
          {HTMLReactParser(article.text)}
        </p>
      </div>
    </Container>
  ) : (
    <div>Loading article...</div>
  );
}
