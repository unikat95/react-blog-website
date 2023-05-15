import React, { useContext } from "react";
import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";

export default function Home() {
  const { isProfileLoading } = useContext(BlogContext);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
