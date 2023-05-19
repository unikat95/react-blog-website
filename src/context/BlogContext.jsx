import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [userList, setUserList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [picture, setPicture] = useState("");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usersCollectionRef = collection(db, "users");

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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoadingUsers(true);
    setTimeout(() => {
      // temporary
      const getUserList = async () => {
        try {
          const data = await getDocs(usersCollectionRef);
          const usersDetail = data.docs.map((user) => ({
            ...user.data(),
            id: user.id,
          }));
          setUserList(usersDetail);
          setLoadingUsers(false);
        } catch (error) {
          console.log(error);
        }
      };

      getUserList();
    }, 500);
  }, []);

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
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      userDetail();
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
          userList,
          setUserList,
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
          picture,
          setPicture,
          open,
          setOpen,
          isModalOpen,
          setIsModalOpen,
          loadingUsers,
          setLoadingUsers,
        }}
      >
        {children}
      </BlogContext.Provider>
    </>
  );
};

export default BlogContext;
