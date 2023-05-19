import React, { useContext } from "react";
import Container from "../components/Container/Container";
import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";

export default function Articles() {
  const { isProfileLoading } = useContext(BlogContext);
  if (isProfileLoading) return <LoadingProfile />;

  return <Container>Articles</Container>;
}
