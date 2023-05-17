import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile/EditProfile";
import { auth, db } from "../config/firebase";
import Container from "../components/Container/Container";

export default function Profile() {
  const { logout, setIsProfileLoading } = useContext(BlogContext);
  const [profile, setProfile] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const currentUser = auth.currentUser;
  const userRef = db.collection("users").doc(currentUser.uid);
  const navigate = useNavigate();

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
      <div className="flex flex-col gap-10 items-center">
        {!isDataLoaded ? null : profile.completed ? (
          <>
            <div className="w-full max-w-[50em] flex flex-col bg-white p-12 rounded-md shadow-sm relative">
              <div className="flex flex-col gap-10 items-center">
                <div>
                  Welcome, {profile.firstName} {profile.lastName}
                </div>
                <div className="w-full flex gap-10 items-center justify-center">
                  <div className="w-auto">
                    <span className="w-[15em] h-[15em] rounded-full flex bg-slate-200 overflow-hidden justify-center items-center">
                      {profile.picture === "" ? null : (
                        <img
                          src={profile.picture}
                          alt=""
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </span>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="border-l-[3px] border-blue-400 bg-slate-100 px-3 py-1">
                      Email: {profile.email}
                    </p>
                    <p className="border-l-[3px] border-blue-400 bg-slate-100 px-3 py-1">
                      First name: {profile.firstName}
                    </p>
                    <p className="border-l-[3px] border-blue-400 bg-slate-100 px-3 py-1">
                      Last name: {profile.lastName}
                    </p>
                    <p className="border-l-[3px] border-blue-400 bg-slate-100 px-3 py-1">
                      Rank: {profile.rank === 999 ? "Administrator" : "User"}
                    </p>
                    <p className="border-l-[3px] border-blue-400 bg-slate-100 px-3 py-1">
                      Birth date: {profile.birthDate}
                    </p>
                    <p className="border-l-[3px] border-blue-400 bg-slate-100 px-3 py-1">
                      About: {profile.about}
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-end">
                  <Button value={"Logout"} onClick={handleLogout} />
                </div>
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
