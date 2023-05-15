import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

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
        id: userId,
        firstname: "",
        lastname: "",
        email: email,
        age: "",
        role: "",
        about: "",
        completed: false,
        open: false,
      };
      await setDoc(doc(db, "users", userId), userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw error;
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
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
      setShowDropdown(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setIsProfileLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <BlogContext.Provider
        value={{
          createUser,
          signIn,
          logout,
          user,
          setUser,
          loading,
          navbarHeight,
          setNavbarHeight,
          showDropdown,
          setShowDropdown,
          openDropdown,
          closeDropdown,
          isProfileLoading,
          setIsProfileLoading,
          setLoading,
        }}
      >
        {children}
      </BlogContext.Provider>
    </>
  );
};

export default BlogContext;
