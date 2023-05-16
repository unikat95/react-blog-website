import React, { useContext } from "react";
import BlogContext from "../../context/BlogContext";

export default function UserPhoto() {
  const { user, userDetails } = useContext(BlogContext);

  return (
    <>
      <div className="flex justify-center items-center w-[2.5em] h-[2.5em] bg-yellow-500 rounded-full overflow-hidden relative">
        <p className="uppercase font-bold text-white text-xl">
          {userDetails.picture !== "" ? (
            <img
              src={userDetails.picture}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : userDetails.firstName === "" && userDetails.lastName === "" ? (
            user.email ? (
              user.email.slice(0, 1)
            ) : (
              ""
            )
          ) : userDetails.firstName !== "" ? (
            userDetails.firstName ? (
              userDetails.firstName.slice(0, 1) +
              userDetails.lastName.slice(0, 1)
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </p>
      </div>
    </>
  );
}
