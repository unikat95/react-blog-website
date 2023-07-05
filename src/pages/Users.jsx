import React, { useContext } from "react";
import Container from "../components/Container/Container";
import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";
import { Link } from "react-router-dom";

export default function Users() {
  const { isProfileLoading, userList } = useContext(BlogContext);

  const sortedList = userList.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      <Container>
        <div>Users</div>
        <div className="w-full grid grid-cols-5 gap-5 mt-10">
          {sortedList.map((user) => (
            <Link
              to={`/users/${user.id}`}
              key={user.id}
              className="w-full bg-white hover:bg-slate-50 p-10 gap-5 rounded-lg shadow-sm flex flex-col justify-center items-center"
            >
              <div className="flex justify-center items-center w-[5em] h-[5em] bg-yellow-500 rounded-full overflow-hidden relative">
                <div className="uppercase font-bold text-white text-xl">
                  {user.picture !== "" ? (
                    <img
                      src={user.picture}
                      alt=""
                      className="w-[4em] h-[4em] object-cover"
                    />
                  ) : user.firstName === "" && user.lastName === "" ? (
                    user.email ? (
                      user.email.slice(0, 1)
                    ) : (
                      ""
                    )
                  ) : user.firstName !== "" ? (
                    user.firstName ? (
                      user.firstName.slice(0, 1) + user.lastName.slice(0, 1)
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <div className="text-sm font-bold text-slate-500">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm font-medium text-slate-600">
                  {user.role === "" ? "---" : user.role}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
