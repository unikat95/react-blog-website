import React, { useContext } from "react";

import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { FaBan } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import BlogContext from "../../context/BlogContext";

export default function UsersDropdown({ setIsOpen, setIsModalOpen }) {
  // const { setIsModalOpen } = useContext(BlogContext);

  const handleToggleModal = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <ul className="flex flex-col items-start absolute bg-white rounded-md z-[100] overflow-hidden shadow-[rgba(0,_0,_0,_0.1)_0px_3px_8px] right-0 top-10 duration-200">
        <li className="w-full hover:bg-gray-100">
          <button className="w-full py-2 px-3 flex gap-2 justify-start items-center text-sm">
            <AiOutlineEdit /> <p>Edit</p>
          </button>
        </li>
        <li className="w-full hover:bg-gray-100">
          <button className="w-full py-2 px-3 flex gap-2 justify-start items-center text-sm">
            <TbMessageDots /> <p>Send message</p>
          </button>
        </li>
        <li className="w-full hover:bg-gray-100">
          <button
            onClick={handleToggleModal}
            className="w-full py-2 px-3 flex gap-2 justify-start items-center text-sm"
          >
            <RiDeleteBinLine /> <p>Delete user</p>
          </button>
        </li>
        <li className="w-full hover:bg-gray-100">
          <button className="w-full py-2 px-3 flex gap-2 justify-start items-center text-sm">
            <FaBan /> <p>Ban user</p>
          </button>
        </li>
      </ul>
    </>
  );
}
