import React, { useContext, useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import HTMLReactParser from "html-react-parser";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import Container from "../Container/Container";
import Author from "../Author/Author";
import Button from "../Button/Button";
import { FaReply } from "react-icons/fa";

export default function Article() {
  const { isProfileLoading, userList, user } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const { artId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const article = articleList.find((art) => art.id === artId);
    setArticle(article);
    setIsLoading(false);
    setComments(article?.comments || []);
  }, [articleList, artId]);

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
    const updatedComment = [
      ...(commentData.comments || []),
      { user: user.uid, msg: text, written: new Date().toISOString() },
    ];

    await articleCommentRef.update({
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
        <div className="w-full flex flex-col gap-20">
          <div className="w-full flex justify-end items-end flex-col gap-4">
            {comments.map((com) => {
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
                <div
                  key={com.id}
                  className="w-full bg-white shadow-sm rounded-lg p-5 flex flex-col gap-3 relative"
                >
                  {com.user === article.author && (
                    <div className="absolute -left-2 -top-2 bg-yellow-500 w-[1.35em] h-[1.35em] border-[4px] border-[rgb(244,244,245)] flex rounded-full"></div>
                  )}
                  <Link
                    to={`/users/${comUser.id}`}
                    className="flex justify-start items-center gap-3"
                  >
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-yellow-500 rounded-full overflow-hidden relative">
                      <div className="uppercase font-bold text-white text-base">
                        {comUser.picture !== "" ? (
                          <img
                            src={comUser.picture}
                            alt=""
                            className="w-full h-screen max-w-[2rem] max-h-[2rem] object-cover"
                          />
                        ) : comUser.firstName === "" &&
                          comUser.lastName === "" ? (
                          user.email ? (
                            user.email.slice(0, 1)
                          ) : (
                            ""
                          )
                        ) : comUser.firstName !== "" ? (
                          comUser.firstName ? (
                            comUser.firstName.slice(0, 1) +
                            comUser.lastName.slice(0, 1)
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-slate-700 font-medium">
                      {comUser.firstName} {comUser.lastName}
                    </div>
                  </Link>
                  <div>{com.msg}</div>
                  <div className="w-full h-full flex justify-between items-center gap-3">
                    <div className="w-full flex justify-start items-center gap-2">
                      <div className="w-auto">
                        <AiOutlineLike size="20" className="text-slate-600" />
                      </div>
                      <div className="w-[1px] h-[14px] bg-slate-300 block mt-1"></div>
                      <div className="text-xs text-slate-600 font-medium mt-1">
                        {formattedDate}
                      </div>
                    </div>
                    <div>
                      <button className="w-auto text-sm flex gap-1 justify-center items-center underline">
                        Reply <FaReply size="12" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
        </div>
      </div>
    </Container>
  ) : (
    <div>Loading article...</div>
  );
}
