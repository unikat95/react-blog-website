import React, { useContext, useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import HTMLReactParser from "html-react-parser";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import Container from "../Container/Container";
import Author from "../Author/Author";
import Button from "../Button/Button";
import Comment from "../Comment/Comment";

export default function Article() {
  const { isProfileLoading, userList, user } = useContext(BlogContext);
  const { articleList, comments, setComments, updateArticle } =
    useContext(ArticleContext);
  const [isLoading, setIsLoading] = useState(true);
  const { artId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const article = articleList.find((art) => art.id === artId);
    setArticle(article);
    setIsLoading(false);
    setComments(article?.comments || []);
  }, [articleList, artId, setComments]);

  const author = userList.find((user) => user.id === article?.author);
  const [text, setText] = useState("");
  const articleCommentRef = db.collection("articles").doc(article?.id);

  const formattedDate = new Date(
    article?.createdAt.seconds * 1000
  ).toLocaleString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const snapshot = await articleCommentRef.get();

    if (!snapshot.data()) {
      throw new Error("Message does not exist");
    }

    const commentData = snapshot.data();
    const newComment = {
      id: uuidv4(),
      user: user.uid,
      msg: text,
      written: new Date().toISOString(),
      likes: [],
      replies: [],
    };
    const updatedComment = [...(commentData.comments || []), newComment];

    await articleCommentRef.update({
      comments: updatedComment,
    });

    updateArticle({
      ...article,
      comments: updatedComment,
    });

    setComments(updatedComment);
    setText("");
  };

  if (isProfileLoading || isLoading || !author) return <LoadingProfile />;

  return article ? (
    <Container>
      <div className="w-full max-w-[1000px] h-auto flex flex-col justify-start items-center gap-10 mb-20">
        <Link to={`/users/${author.id}`}>
          <Author
            author={author}
            direction={"flex-col"}
            align={"items-center"}
          />
        </Link>
        <h6 className="text-slate-400 text-xs font-bold uppercase -mb-5">
          Posted: {formattedDate}
        </h6>
        <h1 className="text-3xl text-slate-700 font-bold">{article.title}</h1>
        <img
          src={article.image}
          alt=""
          className="w-full h-full max-h-[23em] object-cover rounded-lg"
        />
        <div className="text-base md:text-lg text-slate-600 text-justify">
          {HTMLReactParser(article.text)}
        </div>
        <div className="w-full flex flex-col gap-10">
          <h1>Comments:</h1>
          <div className="w-full flex justify-end items-end flex-col gap-4">
            {comments.length <= 0 ? (
              <div className="w-full flex justify-center items-center">
                no one has commented on this article yet
              </div>
            ) : (
              comments.map((com) => {
                const comUser = userList.find((user) => user.id === com.user);
                const commentDate = new Date(com.written);
                const formattedDate = commentDate.toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <Comment
                    key={com.id}
                    com={com}
                    article={article}
                    formattedDate={formattedDate}
                    comUser={comUser}
                    user={user}
                    articleCommentRef={articleCommentRef}
                    comments={comments}
                    setComments={setComments}
                  />
                );
              })
            )}
          </div>
          {user ? (
            <div className="w-full">
              <div className="w-full flex flex-col justify-end items-end">
                <form
                  onSubmit={handleSubmit}
                  className="w-full bg-white shadow-sm  p-5 rounded-lg flex flex-col gap-5 items-end relative"
                >
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="msg">Add comment:</label>
                    <textarea
                      type="text"
                      id="msg"
                      placeholder="message..."
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="bg-slate-100 p-2 focus:outline-none rounded-md"
                      required
                    />
                  </div>
                  <Button value={"Send"} />
                </form>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              You must be logged in to write a comment
            </div>
          )}
        </div>
      </div>
    </Container>
  ) : (
    <div>Loading article...</div>
  );
}
