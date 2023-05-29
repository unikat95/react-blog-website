import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile/EditProfile";
import { auth, db } from "../config/firebase";
import Container from "../components/Container/Container";
import ArticleContext from "../context/ArticleContext";
import HTMLReactParser from "html-react-parser";
import UserDetail from "../components/UserDetail/UserDetail";

export default function Profile() {
  const { logout, setIsProfileLoading } = useContext(BlogContext);
  const { articleList } = useContext(ArticleContext);
  const [profile, setProfile] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const currentUser = auth.currentUser;
  const userRef = db.collection("users").doc(currentUser.uid);
  const navigate = useNavigate();

  const userArticles = [...articleList].filter(
    (art) => art.author === profile.id
  );

  const handleLogout = async () => {
    await logout();
    navigate("/account/signin");
  };

  const userDetail = async () => {
    setIsDataLoaded(false);
    try {
      await userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setProfile(userData);
        }
      });
      setIsProfileLoading(false);
      setIsDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = async () => {
    await userRef.update({
      completed: false,
    });
    userDetail();
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <Container>
      <div
        className={`w-full grid grid-cols-1 ${
          profile.completed && "lg:grid-cols-[40%,1fr]"
        } gap-5 xl:gap-7 items-start`}
      >
        {!isDataLoaded ? null : profile.completed ? (
          <UserDetail
            user={profile}
            userArticles={userArticles}
            handleLogout={handleLogout}
            handleEditProfile={handleEditProfile}
          />
        ) : (
          <EditProfile
            currentUser={currentUser}
            userRef={userRef}
            updateProfile={userDetail}
            profile={profile}
          />
        )}
      </div>
    </Container>
  );
}
