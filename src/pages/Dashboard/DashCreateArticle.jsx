import React, { useContext, useEffect, useRef, useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";

import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import Button from "../../components/Button/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import JoditEditor from "jodit-react";

export default function DashCreateArticle() {
  const { createArticle, getArticleList } = useContext(ArticleContext);
  const { user } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const editor = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const articleData = {
      title: title,
      image: image,
      text: text,
      author: user.uid,
    };
    await createArticle({ articleData });
    getArticleList();
    setLoading(false);
    setMessage(true);
    setTitle("");
    setImage("");
    setText("");
  };

  useEffect(() => {
    const inter = setInterval(() => {
      setMessage(false);
    }, 3000);
    return () => clearInterval(inter);
  }, []);

  return (
    <>
      <DashboardContainer>
        <div className="w-full h-full flex flex-col gap-10 p-3 md:p-10 overflow-auto">
          <div>
            <p>Article list:</p>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5 items-end"
            >
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  className="bg-slate-100 p-2 focus:outline-none"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  className="bg-slate-100 p-2 focus:outline-none"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="text">Text:</label>
                <JoditEditor
                  ref={editor}
                  value={text}
                  onChange={(newText) => setText(newText)}
                  className="dark:text-slate-900"
                  required
                />
              </div>
              <div className="flex gap-1">
                {loading && (
                  <LoadingSpinner width={"w-[1.75em]"} height={"h-[1.75em]"} />
                )}
                <Button value={"Add post"} />
              </div>
              <div
                className={`w-auto rounded-md shadow-sm absolute top-10 left-[50%] translate-x-[-50%] flex overflow-hidden transition-transform z-[9999] ${
                  message ? "translate-y-0" : "translate-y-[-200%]"
                }`}
              >
                <div className="w-auto p-4 bg-lime-400 text-lime-700">
                  <AiFillCheckCircle size="24" />
                </div>
                <p className="w-full p-4 px-6 bg-lime-500 text-white whitespace-nowrap">
                  Article successfully created!
                </p>
              </div>
            </form>
          </div>
        </div>
      </DashboardContainer>
    </>
  );
}
