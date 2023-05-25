import React from "react";
import Container from "../components/Container/Container";
import { Outlet } from "react-router-dom";

export default function Messages() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
