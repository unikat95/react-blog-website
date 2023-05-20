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
  const { setLoading } = useContext(BlogContext);
  const [articleList, setArticleList] = useState([]);
  const articlesCollectionRef = collection(db, "articles");

  const createArticle = async ({ articleData }) => {
    setLoading(true);
    const newArticleData = {
      ...articleData,
      createdAt: serverTimestamp(),
      lastEdit: serverTimestamp(),
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

  const updateArticle = (updatedArticle) => {
    setArticleList((prevList) => {
      const updatedList = prevList.map((article) => {
        if (article.id === updatedArticle.id) {
          return updatedArticle;
        }
        return article;
      });
      return updatedList;
    });
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <>
      <ArticleContext.Provider
        value={{
          createArticle,
          articleList,
          setArticleList,
          getArticleList,
          updateArticle,
        }}
      >
        {children}
      </ArticleContext.Provider>
    </>
  );
}

export default ArticleContext;
