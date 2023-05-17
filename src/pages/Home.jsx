import React, { useContext } from "react";
import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";
import Container from "../components/Container/Container";

export default function Home() {
  const { isProfileLoading } = useContext(BlogContext);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
}
