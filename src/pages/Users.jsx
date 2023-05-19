import React, { useContext } from "react";
import Container from "../components/Container/Container";
import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";
import { Link, Outlet } from "react-router-dom";

export default function Users() {
  const { isProfileLoading, userList } = useContext(BlogContext);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      <Container>
        <div>Users</div>
        <div className="flex flex-wrap gap-2">
          {userList.map((user) => (
            <Link
              to={`/users/${user.id}`}
              key={user.id}
              className="bg-white p-5 rounded-md"
            >
              {user.firstName}
            </Link>
          ))}
        </div>
        <Outlet />
      </Container>
    </>
  );
}
