import React from "react";

export default function Button({ value, onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-flex"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
