import React, { useContext } from "react";
import ArticleContext from "../../context/ArticleContext";

export default function Modal({
  children,
  confirm,
  cancel,
  isModalOpen,
  setIsModalOpen,
  action,
  id,
  width,
}) {
  const { modalSize } = useContext(ArticleContext);
  return (
    <>
      {isModalOpen && (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-[990]">
          <div
            className={`${width} max-w-[100%]  ${
              modalSize
                ? "md:max-w-[100%] max-h-[100%]"
                : "md:max-w-[85%] md:max-h-[80%] "
            } max-h-[100%] flex flex-col justify-between items-end gap-12 p-3 md:p-5 bg-white md:rounded-md relative shadow-sm`}
          >
            {children}
            <div className="flex gap-2">
              <button
                onClick={() => action(id)}
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
