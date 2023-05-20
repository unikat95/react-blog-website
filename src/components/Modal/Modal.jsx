import React from "react";

export default function Modal({
  children,
  confirm,
  cancel,
  isModalOpen,
  setIsModalOpen,
}) {
  return (
    <>
      {isModalOpen && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-[990]">
          <div className="w-auto max-w-[80%] max-h-[80%] flex flex-col justify-between items-end gap-12 p-5 bg-white rounded-md relative shadow-sm ">
            {children}
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded-md text-sm ${
                  !confirm && "hidden"
                }`}
              >
                {confirm}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`bg-slate-600 hover:bg-slate-800 px-4 py-2 text-white rounded-md text-sm ${
                  !cancel && "hidden"
                }`}
              >
                {cancel}
              </button>
            </div>
          </div>
          <div
            onClick={() => setIsModalOpen(false)}
            className="w-full h-full left-0 top-0 bg-slate-900 bg-opacity-30 absolute -z-10"
          ></div>
        </div>
      )}
    </>
  );
}
