import React, { useContext } from "react";
import BlogContext from "../../context/BlogContext";
import ArticleContext from "../../context/ArticleContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import LatestArticle from "../LatestArticle/LatestArticle";

export default function LatestArticles() {
  const { isProfileLoading, userList } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const latestArticles = articleList
    .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
    .slice(0, 3);
  if (isProfileLoading || !userList.length) {
    return <LoadingProfile />;
  }
  return (
    <>
      {latestArticles.map((art) => {
        const author = userList.find((user) => user.id === art.author);
        const formattedDate = new Date(
          art.createdAt.seconds * 1000
        ).toLocaleString();

        return (
          <LatestArticle
            art={art}
            author={author}
            formattedDate={formattedDate}
          />
        );
      })}
    </>
  );
}
