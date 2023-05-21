import React from "react";

export default function Button({ value, onClick, disabled, Icon }) {
  return (
    <button
      className={`bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-md disabled:cursor-not-allowed flex justify-center items-center gap-1`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon />}
      {value}
    </button>
  );
}
