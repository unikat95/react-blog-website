import React, { useContext } from "react";

import { useParams } from "react-router-dom";
import BlogContext from "../../context/BlogContext";
import ArticleContext from "../../context/ArticleContext";
import Container from "../Container/Container";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import UserDetail from "../UserDetail/UserDetail";

export default function User() {
  const { userList, isProfileLoading } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const { id } = useParams();

  const user = userList.find((user) => user.id === id);
  if (isProfileLoading || !user) {
    return <LoadingProfile />;
  }
  const userArticles = [...articleList].filter((art) => art.author === user.id);

  return (
    <Container>
      <div className="w-full grid grid-cols-1 lg:grid-cols-[40%,1fr] gap-5 xl:gap-7 items-start">
        <UserDetail user={user} userArticles={userArticles} />
      </div>
    </Container>
  );
}
