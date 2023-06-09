import React from "react";
import Container from "../components/Container/Container";
import LatestArticles from "../components/LatestArticles/LatestArticles";
import ArticlesList from "../components/ArticlesList/ArticlesList";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-medium text-slate-700">
          Latest articles:
        </h1>
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <LatestArticles />
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-20">
        <h1 className="text-3xl font-medium text-slate-700">Other articles:</h1>
        <ArticlesList />
      </div>
    </Container>
  );
}
