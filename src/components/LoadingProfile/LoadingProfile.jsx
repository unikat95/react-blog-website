import React from "react";

export default function LoadingProfile() {
  return (
    <div className="w-full h-screen top-0 left-0 right-0 bottom-0 bg-gray-200 absolute z-[9999] flex flex-col justify-center items-center">
      <p className="absolute mt-[4.5rem] text-sm text-gray-500 font-bold">
        Loading...
      </p>
      <div className="bg-gray-200 w-full min-h-screen flex justify-center items-center">
        <svg
          className="w-12 h-12 animate-spin text-gray-800"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4.75V6.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17.1266 6.87347L16.0659 7.93413"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.25 12L17.75 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17.1266 17.1265L16.0659 16.0659"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 17.75V19.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.9342 16.0659L6.87354 17.1265"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6.25 12L4.75 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7.9342 7.93413L6.87354 6.87347"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
}
