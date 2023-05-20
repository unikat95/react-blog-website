import React from "react";
import { Link } from "react-router-dom";
import Author from "../Author/Author";

export default function LatestArticle({ art, formattedDate, author }) {
  return (
    <div key={art.id} className="w-full h-auto flex flex-col items-start gap-3">
      <Link
        to={`/articles/${art.id}`}
        className="w-full h-full flex flex-col gap-4"
      >
        <img
          src={art.image}
          alt=""
          className="w-full min-h-[15em] max-h-[15em] object-cover rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-slate-500">Added: {formattedDate}</h3>
          <h2 className="w-full text-gray-800 font-bold">
            {art.title.length > 45 ? `${art.title.slice(0, 45)}...` : art.title}
          </h2>
        </div>
        <div>
          <p className="w-full text-justify">
            {art.text.length > 150 ? `${art.text.slice(0, 150)}...` : art.text}
          </p>
        </div>
      </Link>
      <Link to={`/users/${author.id}`}>
        <Author
          author={author}
          direction={"flex-row"}
          align={"justify-start"}
        />
      </Link>
    </div>
  );
}
