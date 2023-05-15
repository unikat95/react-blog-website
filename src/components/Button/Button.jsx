import React from "react";

export default function Button({ value, onClick }) {
  return (
    <button
      className="bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-md"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
