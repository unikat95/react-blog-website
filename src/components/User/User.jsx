import React, { useContext } from "react";
import Container from "../Container/Container";
import BlogContext from "../../context/BlogContext";
import { Link, useParams } from "react-router-dom";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import ArticleContext from "../../context/ArticleContext";

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
      <div className="w-full grid grid-cols-1 md:grid-cols-[auto,1fr] gap-5 items-start">
        <div className="w-auto flex flex-col justify-start items-center bg-white p-10 gap-5 rounded-md shadow-sm">
          <div className="border-[15px] border-slate-100 rounded-full">
            {user.picture === "" ? (
              <div className="w-[10em] h-[10em] bg-yellow-500 rounded-full flex justify-center items-center">
                <p className="text-7xl text-white uppercase font-bold flex justify-center items-center">
                  {user.firstName === "" || user.lastName === ""
                    ? user.email.slice(0, 1)
                    : user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </p>
              </div>
            ) : (
              <img
                src={user.picture}
                alt=""
                className="rounded-full w-[10em] h-[10em] object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
              <p>Email:</p> <p>{user.email}</p>
            </div>
            <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
              <p>Role:</p> <p>{user.role}</p>
            </div>
            <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
              <p>Birth date:</p> <p>{user.birthDate}</p>
            </div>
            <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
              <p>Posts:</p> <p>{userArticles.length}</p>
            </div>
          </div>
        </div>
        <div className="w-auto flex flex-col justify-start items-start bg-white p-10 gap-5 rounded-md shadow-sm">
          <h1>User articles:</h1>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
            {userArticles.map((art) => (
              <Link
                to={`/articles/${art.id}`}
                key={art.id}
                className="flex flex-col bg-slate-100 hover:bg-slate-200 p-3 gap-2 rounded-md"
              >
                <p className="text-slate-600 text-md font-bold">{art.title}</p>
                <p className="text-slate-500 text-sm font-medium">
                  {art.text.length > 100
                    ? `${art.text.slice(0, 100)}...`
                    : art.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
