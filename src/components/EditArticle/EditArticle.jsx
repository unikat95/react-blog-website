import React, { useContext, useEffect, useState } from "react";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import ArticleContext from "../../context/ArticleContext";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AiFillCheckCircle } from "react-icons/ai";

export default function EditArticle() {
  const { articleList, updateArticle } = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const { editId } = useParams();
  const article = articleList.find((art) => art.id === editId);
  const [artTitle, setArtTitle] = useState(article.title);
  const [artImage, setArtImage] = useState(article.image);
  const [artText, setArtText] = useState(article.text);

  //   const editedArticleRef2 = doc(db, "articles", article.id);
  const editedArticleRef = db.collection("articles").doc(article.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const snapshot = await editedArticleRef.get();

    if (!snapshot.data()) {
      throw new Error("Article does not exist");
    }

    await editedArticleRef.update({
      title: artTitle,
      image: artImage,
      text: artText,
      edited: true,
      lastEdit: serverTimestamp(),
    });

    const updatedArticle = {
      ...snapshot.data(),
      id: snapshot.id,
      title: artTitle,
      image: artImage,
      text: artText,
      edited: true,
      lastEdit: serverTimestamp(),
    };

    updateArticle(updatedArticle);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessage(true);
    }, 1000);
  };

  useEffect(() => {
    const inter = setInterval(() => {
      setMessage(false);
    }, 5000);
    return () => clearInterval(inter);
  }, []);

  return (
    <DashboardContainer>
      <div className="w-full h-full flex flex-col gap-10 p-3 md:p-10 overflow-auto">
        <div>
          <p>Edit article:</p>
        </div>
        <div className="w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col gap-5 items-end"
          >
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={artTitle}
                onChange={(e) => setArtTitle(e.target.value)}
                disabled={loading}
                className="bg-slate-100 p-2 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="image">Image:</label>
              <input
                type="text"
                name="image"
                id="image"
                value={artImage}
                onChange={(e) => setArtImage(e.target.value)}
                disabled={loading}
                className="bg-slate-100 p-2 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="text">Text:</label>
              <textarea
                type="text"
                name="text"
                id="text"
                rows={13}
                value={artText}
                onChange={(e) => setArtText(e.target.value)}
                disabled={loading}
                className="bg-slate-100 p-2 focus:outline-none rounded-md"
                required
              />
            </div>
            <div className="flex gap-1">
              {loading && (
                <div className="w-full h-full absolute bg-slate-900 bg-opacity-20 top-0 left-0 flex justify-center items-center">
                  <div className="p-2 flex justify-center items-center bg-white shadow-md rounded-md">
                    <LoadingSpinner
                      width={"w-[1.75em]"}
                      height={"h-[1.75em]"}
                    />
                  </div>
                </div>
              )}
              <Button value={"Edit post"} disabled={message} />
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
                Article successfully edited!
              </p>
            </div>
          </form>
        </div>
      </div>
    </DashboardContainer>
  );
}
