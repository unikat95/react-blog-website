import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile/EditProfile";
import { auth, db } from "../config/firebase";
import Container from "../components/Container/Container";
import ArticleContext from "../context/ArticleContext";

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

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <Container>
      <div className="w-full grid grid-cols-1 md:grid-cols-[auto,1fr] gap-5 items-start">
        {!isDataLoaded ? null : profile.completed ? (
          <>
            <div className="w-auto flex flex-col justify-start items-center bg-white p-10 gap-5 rounded-md shadow-sm">
              <div className="border-[15px] border-slate-100 rounded-full">
                {profile.picture === "" ? (
                  <div className="w-[10em] h-[10em] bg-yellow-500 rounded-full flex justify-center items-center">
                    <p className="text-7xl text-white uppercase font-bold flex justify-center items-center">
                      {profile.firstName === "" || profile.lastName === ""
                        ? profile.email.slice(0, 1)
                        : profile.firstName.slice(0, 1) +
                          profile.lastName.slice(0, 1)}
                    </p>
                  </div>
                ) : (
                  <img
                    src={profile.picture}
                    alt=""
                    className="rounded-full w-[10em] h-[10em] object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
                  <p>
                    {profile.firstName} {profile.lastName}
                  </p>
                </div>
                <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
                  <p>Email:</p> <p>{profile.email}</p>
                </div>
                <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
                  <p>Role:</p> <p>{profile.role}</p>
                </div>
                <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
                  <p>Birth date:</p> <p>{profile.birthDate}</p>
                </div>
                <div className="w-full flex gap-2 bg-slate-100 p-2 rounded-sm">
                  <p>Posts:</p> <p>{userArticles.length}</p>
                </div>
                <div className="w-full flex items-center justify-end">
                  <Button value={"Logout"} onClick={handleLogout} />
                </div>
              </div>
            </div>
            <div className="w-auto flex flex-col justify-start items-start bg-white p-10 gap-5 rounded-md shadow-sm">
              <h1>User articles:</h1>
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
                {userArticles.map((art) => (
                  <Link
                    to={`/articles/${art.id}`}
                    key={art.id}
                    className="flex flex-col bg-slate-100 hover:bg-slate-200 p-3 gap-2 rounded-md"
                  >
                    <p className="text-slate-600 text-md font-bold">
                      {art.title}
                    </p>
                    <p className="text-slate-500 text-sm font-medium">
                      {art.text.length > 100
                        ? `${art.text.slice(0, 100)}...`
                        : art.text}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <EditProfile
            currentUser={currentUser}
            userRef={userRef}
            updateProfile={userDetail}
          />
        )}
      </div>
    </Container>
  );
}
