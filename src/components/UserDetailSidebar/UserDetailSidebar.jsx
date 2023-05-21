import HTMLReactParser from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";

export default function UserDetailSidebar({ userArticles }) {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      <h1>User articles:</h1>
      {userArticles.length === 0 ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          This user has no articles yet
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {userArticles.map((art) => {
            const formattedDate = new Date(
              art.createdAt.seconds * 1000
            ).toLocaleString();
            return (
              <Link
                to={`/articles/${art.id}`}
                key={art.id}
                className="flex flex-col bg-white hover:bg-indigo-50 p-5 gap-3 rounded-lg group"
              >
                <div>
                  <p className="text-xs text-blue-300 font-bold">
                    {formattedDate}
                  </p>

                  <p className="text-slate-600 text-base font-bold group-hover:underline">
                    {art.title.length > 40
                      ? HTMLReactParser(art.title.slice(0, 40) + "...")
                      : HTMLReactParser(art.title)}
                  </p>
                </div>
                <p className="text-slate-600 text-sm font-base">
                  {art.text.length > 100
                    ? HTMLReactParser(art.text.slice(0, 100) + "...")
                    : HTMLReactParser(art.text)}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
