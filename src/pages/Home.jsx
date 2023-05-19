import React from "react";
import Container from "../components/Container/Container";
import LatestArticles from "../components/LatestArticles/LatestArticles";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-medium text-slate-700">
          Latest articles:
        </h1>
        <div className="w-full h-auto flex gap-5">
          <LatestArticles />
        </div>
      </div>
    </Container>
  );
}
