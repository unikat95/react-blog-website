import React from "react";

export default function Input({ type, name, set, firstName }) {
  return (
    <input
      type={type}
      name={name}
      id={name}
      value={firstName}
      className="border p-2 focus:outline-blue-400"
      onChange={(e) => set(e.target.value)}
      required
    />
  );
}
