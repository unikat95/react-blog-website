import React, { useContext, useEffect, useState } from "react";

import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import BlogContext from "../context/BlogContext";
import LoadingProfile from "../components/LoadingProfile/LoadingProfile";

export default function Users() {
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userList, setUserList] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const { isProfileLoading } = useContext(BlogContext);

  const [isOpenList, setIsOpenList] = useState(
    new Array(userList.length).fill(false)
  );

  const handleToggleList = (index) => {
    setIsOpenList((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    const getUserList = async () => {
      try {
        setLoadingUsers(true);
        const data = await getDocs(usersCollectionRef);
        const usersDetail = data.docs.map((user) => ({
          ...user.data(),
          id: user.id,
        }));
        console.log(usersDetail);
        setUserList(usersDetail);
        setLoadingUsers(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUserList();
  }, []);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1>User list:</h1>
        {userList.map((el, index) => (
          <div
            key={el.id}
            className="flex justify-between items-center justify-items-start bg-slate-50 hover:bg-gray-100 p-2 relative rounded-md shadow-sm"
          >
            <p className="text-sm">{el.email}</p>
            <p className="text-sm">
              <img src={el.picture} alt="" className="w-[2em] rounded-full" />
            </p>
            <p className="text-sm">{el.firstName}</p>
            <p className="text-sm">{el.lastName}</p>
            <p className="text-sm">{el.birthDate}</p>
            <p className="text-sm">
              {el.about.length >= 10 && `${el.about.slice(0, 10)}...`}
            </p>

            <button
              className="hover:bg-gray-200 p-2 rounded-full z-[98]"
              onClick={() => handleToggleList(index)}
            >
              <BsThreeDotsVertical className="text-gray-600 hover:text-black" />
            </button>

            <ul
              className={`flex flex-col items-start absolute bg-white rounded-md scale-0 ${
                isOpenList[index] && "scale-100"
              } overflow-hidden shadow-[rgba(0,_0,_0,_0.1)_0px_3px_8px] right-0 top-10 z-50 duration-200`}
            >
              <li className="w-full hover:bg-gray-100">
                <button className="w-full py-2 px-3 flex gap-2 justify-start items-center text-sm">
                  <AiOutlineEdit /> <p>Edit</p>
                </button>
              </li>
              <li className="w-full hover:bg-gray-100">
                <button className="w-full py-2 px-3 flex gap-2 justify-start items-center text-sm">
                  <RiDeleteBinLine /> <p>Remove</p>
                </button>
              </li>
            </ul>
          </div>
        ))}
        {loadingUsers && <div>Loading users...</div>}
      </div>
    </>
  );
}
