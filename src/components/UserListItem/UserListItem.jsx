import React, { useEffect, useRef, useState } from "react";

import UsersDropdown from "../UsersDropdown/UsersDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../Modal/Modal";

export default function UserListItem({ el }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackgroundClick = (event) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      return;
    }

    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  return (
    <>
      <div
        ref={dropdownRef}
        className="grid grid-cols-[4fr,1fr,auto] md:grid-cols-[2fr,1fr,1fr,1fr,auto] lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] xl:grid-cols-[3fr,2fr,2fr,2fr,2fr,4fr,auto] items-center justify-items-start bg-slate-100 hover:bg-slate-200 relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md transition-all duration-300 origin-center"
      >
        <div>
          <p className="text-sm text-slate-500 font-medium">{el.email}</p>
        </div>
        <div>
          {el.picture === "" ? (
            <span className="w-[2em] h-[2em] bg-gray-500 flex justify-center items-center rounded-full uppercase text-white font-bold">
              {el.email.slice(0, 1)}
            </span>
          ) : (
            <img
              src={el.picture}
              alt=""
              className="w-[2em] h-[2em] rounded-full object-cover"
            />
          )}
        </div>
        <div className="hidden md:flex">
          <p className="text-sm text-slate-500 font-medium">
            {el.firstName !== "" ? el.firstName : "---"}
          </p>
        </div>
        <div className="hidden md:flex">
          <p className="text-sm text-slate-500 font-medium">
            {el.lastName !== "" ? el.lastName : "---"}
          </p>
        </div>
        <div className="hidden lg:flex">
          <p className="text-sm text-slate-500 font-medium">
            {el.birthDate !== "" ? el.birthDate : "---"}
          </p>
        </div>
        <div className="hidden xl:flex">
          <p className="text-sm text-slate-500 font-medium">
            {el.about !== ""
              ? el.about.length > 30
                ? el.about.slice(0, 30) + "..."
                : el.about
              : "---"}
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 bg-white hover:bg-slate-300 w-[2em] h-[2em] rounded-full flex justify-center items-center"
        >
          <BsThreeDotsVertical size="20" />
        </button>
        {isOpen && (
          <UsersDropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            userId={el.id}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
      <Modal
        confirm="Confirm"
        cancel="Cancel"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <p className="text-md text-slate-600">
          Are you sure you want to delete the user? After deletion, any data
          will be completely lost
        </p>
      </Modal>
    </>
  );
}
