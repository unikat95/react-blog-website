import React, { useContext } from "react";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import { Link, useParams } from "react-router-dom";
import Container from "../Container/Container";
import Author from "../Author/Author";

export default function Article() {
  const { isProfileLoading, userList } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const { artId } = useParams();
  const article = articleList.find((art) => art.id === artId);
  const author = userList.find((user) => user.id === article.author);

  if (isProfileLoading || !author) return <LoadingProfile />;

  return (
    <Container>
      <div className="w-full h-auto flex flex-col justify-start items-center gap-10 rounded-md">
        <Link to={`/users/${author.id}`}>
          <Author
            author={author}
            direction={"flex-col"}
            align={"items-center"}
          />
        </Link>
        <h1 className="text-3xl text-slate-700 font-bold">{article.title}</h1>
        <img
          src={article.image}
          alt=""
          className="w-full h-full max-h-[23em] object-cover rounded-lg"
        />
        <p>{article.text}</p>
      </div>
    </Container>
  );
}
