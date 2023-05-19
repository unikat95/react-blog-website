import React, { useContext, useEffect, useState } from "react";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import Button from "../../components/Button/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function DashCreateArticle() {
  const { createArticle, getArticleList } = useContext(ArticleContext);
  const { user, setIsProfileLoading } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

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
    }, 5000);
    return () => clearInterval(inter);
  }, []);

  console.log(message);

  return (
    <>
      <DashboardContainer>
        <div className="flex flex-col gap-10 p-10">
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
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="text">Text:</label>
                <textarea
                  type="text"
                  name="text"
                  id="text"
                  rows={5}
                  value={text}
                  className="bg-slate-100 p-2 focus:outline-none"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="flex gap-1">
                {loading && (
                  <LoadingSpinner width={"w-[1.75em]"} height={"h-[1.75em]"} />
                )}
                <Button value={"Add post"} />
              </div>
              <div
                className={`bg-emerald-500 text-white py-5 px-10 rounded-md absolute top-10 left-[50%] translate-x-[-50%]  transition-transform z-[9999] ${
                  message ? "translate-y-0" : "translate-y-[-200%]"
                }`}
              >
                Article was created
              </div>
            </form>
          </div>
        </div>
      </DashboardContainer>
    </>
  );
}
