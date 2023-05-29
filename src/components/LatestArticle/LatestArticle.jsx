import React from "react";

import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import HTMLReactParser from "html-react-parser";
import Author from "../Author/Author";

export default function LatestArticle({ art, formattedDate, author }) {
  return (
    <div key={art.id} className="w-full h-auto flex flex-col items-start gap-7">
      <div className="w-full h-full flex flex-col gap-3">
        <Link
          to={`/articles/${art.id}`}
          className="w-full h-auto overflow-hidden rounded-lg group"
        >
          <img
            src={art.image}
            alt=""
            className="w-full min-h-[14em] max-h-[14em] object-cover group-hover:scale-[1.15] group-hover:rotate-3 duration-300"
          />
        </Link>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-slate-500">Added: {formattedDate}</p>
          {art.title.length > 45 ? (
            <Tooltip
              content={art.title}
              placement="top"
              className="p-2 bg-zinc-200 text-black"
            >
              <Link
                to={`/articles/${art.id}`}
                className="w-full text-gray-800 text-xl font-bold hover:underline orange"
              >
                {art.title.length > 45
                  ? `${art.title.slice(0, 45)}...`
                  : art.title}
              </Link>
            </Tooltip>
          ) : (
            <Link
              to={`/articles/${art.id}`}
              className="w-full text-gray-800 text-xl font-bold hover:underline orange"
            >
              {art.title.length > 45
                ? `${art.title.slice(0, 45)}...`
                : art.title}
            </Link>
          )}
        </div>
        <div>
          <div className="w-full text-base text-slate-600 text-justify">
            {art.text.length > 150
              ? HTMLReactParser(art.text.slice(0, 150) + "...")
              : HTMLReactParser(art.text)}
          </div>
        </div>
      </div>
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
