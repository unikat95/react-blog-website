import React from "react";

export default function Author({ author, direction, align }) {
  return (
    <div className={`w-auto flex ${direction} ${align} items-center gap-2`}>
      {author.picture === "" ? (
        <div className="w-[3em] h-[3em] bg-yellow-500 rounded-full flex justify-center items-center">
          <p className="text-xl text-white uppercase font-bold flex justify-center items-center">
            {author.firstName === "" || author.lastName === ""
              ? author.email.slice(0, 1)
              : author.firstName.slice(0, 1) + author.lastName.slice(0, 1)}
          </p>
        </div>
      ) : (
        <img
          src={author.picture}
          alt=""
          className="rounded-full w-[3em] h-[3em] object-cover"
        />
      )}

      <div className={`flex flex-col justify-start ${align}`}>
        <div>
          <p className="text-sm font-bold text-slate-600">
            {author.firstName} {author.lastName}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500">Administrator</p>
        </div>
      </div>
    </div>
  );
}
