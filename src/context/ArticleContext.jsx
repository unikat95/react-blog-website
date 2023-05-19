import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import BlogContext from "./BlogContext";

const ArticleContext = createContext();

export function ArticleProvider({ children }) {
  const { setLoading, setIsProfileLoading } = useContext(BlogContext);
  const [articleList, setArticleList] = useState([]);
  const articlesCollectionRef = collection(db, "articles");

  const createArticle = async ({ articleData }) => {
    setLoading(true);
    const newArticleData = {
      ...articleData,
      createdAt: serverTimestamp(), // Dodaj pole createdAt z aktualną datą i czasem
    };
    await addDoc(articlesCollectionRef, newArticleData);
    setLoading(false);
  };

  const getArticleList = async () => {
    try {
      const data = await getDocs(articlesCollectionRef);
      const articleDetail = data.docs.map((article) => ({
        ...article.data(),
        id: article.id,
      }));
      setArticleList(articleDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <>
      <ArticleContext.Provider
        value={{ createArticle, articleList, setArticleList, getArticleList }}
      >
        {children}
      </ArticleContext.Provider>
    </>
  );
}

export default ArticleContext;
