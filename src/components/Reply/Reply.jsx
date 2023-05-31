import { Tooltip } from "@material-tailwind/react";
import React from "react";
import { FaCrown } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Reply({ rep, user, repUser, article, formattedDate }) {
  return (
    <div className="w-[90%] flex flex-col gap-2 justify-start items-center">
      <div
        key={rep.id}
        className={`w-full bg-gray-50 rounded-lg shadow-sm flex flex-col gap-3 p-5 relative ${
          rep.user === article.author && "bg-white"
        }`}
      >
        {rep.user === article.author && (
          <Tooltip
            content={"Author"}
            placement="bottom"
            className="p-2 bg-zinc-200 text-black"
          >
            <div className="absolute -left-2 -top-2 w-[1.75em] h-[1.75em] border-[4px] border-gray-100 bg-gray-100 flex justify-center items-center rounded-full">
              <FaCrown className="text-yellow-400" size="22" />
            </div>
          </Tooltip>
        )}
        <Link
          to={`/users/${repUser.id}`}
          className="flex justify-start items-center gap-3"
        >
          <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-yellow-500 rounded-full overflow-hidden relative">
            <div className="uppercase font-bold text-white text-base">
              {repUser.picture !== "" ? (
                <img
                  src={repUser.picture}
                  alt=""
                  className="w-full h-screen max-w-[2rem] max-h-[2rem] object-cover"
                />
              ) : repUser.firstName === "" && repUser.lastName === "" ? (
                user.email ? (
                  user.email.slice(0, 1)
                ) : (
                  ""
                )
              ) : repUser.firstName !== "" ? (
                repUser.firstName ? (
                  repUser.firstName.slice(0, 1) + repUser.lastName.slice(0, 1)
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="font-medium">
            {repUser.firstName} {repUser.lastName}
          </div>
        </Link>
        <div>{rep.msg}</div>
        <div className="w-full h-full flex justify-between items-center gap-3">
          <div className="w-full flex justify-start items-center gap-2  -mb-2">
            <div className="text-xs text-slate-600 font-medium ">
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
