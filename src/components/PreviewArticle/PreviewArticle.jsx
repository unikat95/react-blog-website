import React, { useState } from "react";

import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { AiFillCloseCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";

import HTMLReactParser from "html-react-parser";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";

export default function PreviewArticle({
  isModalOpen,
  setIsModalOpen,
  modalSize,
  setModalSize,
  article,
  artTitle,
  artImage,
  artText,
  deleteArticle,
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="w-full justify-between items-center flex gap-2">
        <div className="flex gap-2 justify-center items-center">
          {deleteArticle && (
            <>
              <Link
                to={`/dashboard/edit-article/${article.id}`}
                className="bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-slate-100 px-2 md:px-4 py-2 rounded-md flex justify-center items-center gap-1 group"
              >
                <AiFillEdit size="24" />
                <p className="font-medium text-slate-800 group-hover:text-slate-100">
                  Edit
                </p>
              </Link>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-slate-100 px-4 py-2 rounded-md flex justify-center items-center gap-1"
              >
                <AiFillDelete size="24" />
              </button>
              <Modal
                isModalOpen={deleteModalOpen}
                setIsModalOpen={setDeleteModalOpen}
                confirm={"Confirm"}
                cancel={"Cancel"}
                action={deleteArticle}
                id={article.id}
              >
                <p>
                  Are you sure you want to delete the article? After deletion,
                  any data will be completely lost
                </p>
              </Modal>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setModalSize(!modalSize)}
            className="bg-slate-100 hidden hover:bg-slate-800 text-slate-800 hover:text-slate-100 px-4 py-2 rounded-md md:flex justify-center items-center gap-1"
          >
            {modalSize ? (
              <BiExitFullscreen size="24" />
            ) : (
              <BiFullscreen size="24" />
            )}
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-slate-100 px-4 py-2 rounded-md flex justify-center items-center gap-1"
          >
            <AiFillCloseCircle size="24" />
          </button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center gap-5 px-2 md:px-5 overflow-auto">
        <div
          className={`w-full max-w-[900px] h-auto flex flex-col justify-start items-center gap-10 rounded-md`}
        >
          <h1 className="text-3xl text-slate-700 font-bold">
            {artTitle ? artTitle : article.title}
          </h1>
          <img
            src={artImage ? artImage : article.image}
            alt=""
            className="w-full h-full max-h-[23em] object-cover rounded-lg"
          />
          <p className="text-lg text-justify">
            {HTMLReactParser(artText ? artText : article.text)}
          </p>
        </div>
      </div>
    </Modal>
  );
}
