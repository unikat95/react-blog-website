import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading/Loading";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // ustawienie początkowego stanu na true
  const [user, setUser] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // stan do śledzenia, czy dane z bazy zostały wczytane

  const createUser = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const userData = {
        firstname: "",
        lastname: "",
        email: email,
        age: "",
        role: "",
        about: "",
        completed: false,
      };
      await setDoc(doc(db, "users", userId), userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(loading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BlogContext.Provider
          value={{ createUser, signIn, logout, user, setUser, loading }}
        >
          {children}
        </BlogContext.Provider>
      )}
    </>
  );
};

export default BlogContext;
