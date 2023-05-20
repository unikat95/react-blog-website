import React, { useContext, useEffect, useState } from "react";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import DashArticleList from "../../components/DashArticleList/DashArticleList";
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
        <div className="w-full grid grid-cols-[3fr,2fr,1fr,1fr,2.5%] items-center justify-items-start relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md">
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Title
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Author
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Date of publication
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Last edit
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
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
            {articleList.map((art) => {
              const formattedDate = new Date(
                art.createdAt.seconds * 1000
              ).toLocaleString();
              const editedFormattedDate = new Date(
                art.lastEdit.seconds * 1000
              ).toLocaleString();
              console.log(editedFormattedDate);
              const author = userList.find((user) => user.id === art.author);

              return (
                <DashArticleList
                  key={art.id}
                  art={art}
                  formattedDate={formattedDate}
                  editedFormattedDate={editedFormattedDate}
                  author={author}
                />
              );
            })}
          </div>
        )}
      </DashboardContainer>
    </>
  );
}
