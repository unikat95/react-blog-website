import React, { useContext, useEffect, useRef, useState } from "react";

import { AiFillCheckCircle, AiFillEye } from "react-icons/ai";
import { MdSaveAs } from "react-icons/md";

import JoditEditor from "jodit-react";
import { db } from "../../config/firebase";
import { useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Button from "../Button/Button";
import ArticleContext from "../../context/ArticleContext";
import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";
import PreviewArticle from "../PreviewArticle/PreviewArticle";

export default function EditArticle() {
  const { articleList, updateArticle, modalSize, setModalSize } =
    useContext(ArticleContext);
  const { isProfileLoading } = useContext(BlogContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { editId } = useParams();
  const article = articleList.find((art) => art.id === editId);
  const [artTitle, setArtTitle] = useState(article.title);
  const [artImage, setArtImage] = useState(article.image);
  const [artText, setArtText] = useState(article.text);
  const editor = useRef(null);

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

  if (isProfileLoading) return <LoadingProfile />;

  console.log(editedArticleRef);

  return (
    <DashboardContainer>
      <div className="w-full h-auto max-h-[78dvh] flex flex-col gap-10 p-3 md:p-5 md:py-10">
        <div>
          <p className="px-5">Edit:</p>
        </div>
        <div className="w-full h-full overflow-auto px-5">
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
              <JoditEditor
                ref={editor}
                value={artText}
                onChange={(newText) => setArtText(newText)}
                className="dark:text-slate-900"
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
            </div>
            <div className="absolute top-[7rem] md:top-[8rem] lg:top-[9rem] xl:top-[10rem] right-[2rem] md:right-[3rem] lg:right-[4rem] xl:right-[5em] flex gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-600 hover:bg-slate-700 text-slate-100 flex justify-center items-center gap-1 px-4 py-2 rounded-md"
              >
                <AiFillEye size="22" />
                <p>Preview</p>
              </button>
              <Button value={"Save"} disabled={message} Icon={MdSaveAs} />
            </div>
            <div
              className={`w-auto rounded-md shadow-sm absolute top-10 left-[50%] translate-x-[-50%] flex overflow-hidden transition-transform z-[9999] ${
                message ? "translate-y-0" : "translate-y-[-50dvh]"
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
          <PreviewArticle
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalSize={modalSize}
            setModalSize={setModalSize}
            artTitle={artTitle}
            artImage={artImage}
            artText={artText}
          />
        </div>
      </div>
    </DashboardContainer>
  );
}
