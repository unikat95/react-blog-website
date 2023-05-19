import React, { useContext, useEffect, useState } from "react";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function DashArticles() {
  const { articleList } = useContext(ArticleContext);
  const { userList } = useContext(BlogContext);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 300);
  }, []);
  return (
    <>
      <DashboardContainer>
        <div className="w-full grid grid-cols-[3fr,2fr,1fr,auto] items-center justify-items-start relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md">
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Title
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Author
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Date of publication
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
            {articleList.map((art) => {
              const formattedDate = new Date(
                art.createdAt.seconds * 1000
              ).toLocaleString();
              const author = userList.find((user) => user.id === art.author);

              return (
                <Link
                  to={`/articles/${art.id}`}
                  key={art.id}
                  className="grid grid-cols-[3fr,2fr,1fr,auto] items-center justify-items-start bg-slate-100 hover:bg-slate-200 relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md transition-all duration-300 origin-center"
                >
                  <div>
                    <p className="text-sm text-slate-500 font-medium py-2">
                      {art.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium flex gap-2 justify-center items-center">
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
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      {formattedDate}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </DashboardContainer>
    </>
  );
}
