import React from "react";

export default function Modal({
  children,
  confirm,
  cancel,
  user,
  userId,
  isModalOpen,
  setIsModalOpen,
  handleRemoveUser,
}) {
  return (
    <>
      {isModalOpen && (
        <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-10 absolute top-0 left-0 z-[9999]">
          <div className="w-full max-w-[26em] flex flex-col justify-between items-end gap-12 p-5 bg-white rounded-md relative">
            <div>{children}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded-md text-sm"
              >
                {confirm}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-600 hover:bg-slate-800 px-4 py-2 text-white rounded-md text-sm"
              >
                {cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
