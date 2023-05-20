import React, { useContext, useEffect, useState } from "react";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import ArticleContext from "../../context/ArticleContext";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

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
      <div className="w-full h-full flex flex-col gap-10 p-10 overflow-auto">
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
                className="bg-slate-100 p-2 focus:outline-none"
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
                className="bg-slate-100 p-2 focus:outline-none"
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
                className="bg-slate-100 p-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex gap-1">
              {loading && (
                <LoadingSpinner width={"w-[1.75em]"} height={"h-[1.75em]"} />
              )}
              <Button value={"Edit post"} />
            </div>
            <div
              className={`bg-emerald-500 text-white py-5 px-10 rounded-md absolute top-10 left-[50%] translate-x-[-50%]  transition-transform z-[9999] ${
                message ? "translate-y-0" : "translate-y-[-200%]"
              }`}
            >
              Article successfully edited!
            </div>
          </form>
        </div>
      </div>
    </DashboardContainer>
  );
}
