import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

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
  const [open, setOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      if (!currentUser) {
        setIsProfileLoading(false);
      }
    });

    const userDetail = async () => {
      try {
        const currentUser = auth.currentUser;
        const userRef = db.collection("users").doc(currentUser.uid);
        await userRef.get().then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUserDetails(userData);
            setIsProfileLoading(false);
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

    return () => {
      unsubscribe();
    };
  }, [user]);

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
          open,
          setOpen,
          isModalOpen,
          setIsModalOpen,
        }}
      >
        {children}
      </BlogContext.Provider>
    </>
  );
};

export default BlogContext;
