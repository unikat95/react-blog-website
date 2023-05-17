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
  const [userDetails, setUserDetails] = useState({});
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isUserDetailsLoaded, setIsUserDetailsLoaded] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState("");

  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const userData = {
      id: userId,
      rank: 0,
      firstName: "",
      lastName: "",
      email: email,
      birthDate: "",
      about: "",
      completed: false,
      picture: "",
    };
    await setDoc(doc(db, "users", userId), userData);
    setLoading(false);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
      setShowDropdown(false);
      setIsUserLoaded(false);
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
  }, [user]);

  useEffect(() => {
    const userDetail = async () => {
      try {
        const currentUser = auth.currentUser;
        const userRef = db.collection("users").doc(currentUser.uid);
        await userRef.get().then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUserDetails(userData);
            setIsProfileLoading(false);
            setIsUserDetailsLoaded(true);
          }
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && !isUserLoaded) {
      userDetail();
      setIsUserLoaded(true);
    }
  }, [user, isUserLoaded]);

  return (
    <>
      <BlogContext.Provider
        value={{
          createUser,
          signIn,
          logout,
          user,
          setUser,
          userDetails,
          setUserDetails,
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
          isLoading,
          setIsLoading,
          picture,
          setPicture,
          isUserDetailsLoaded,
          setIsUserDetailsLoaded,
        }}
      >
        {children}
      </BlogContext.Provider>
    </>
  );
};

export default BlogContext;
