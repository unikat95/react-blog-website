import React from "react";

export default function Input({
  type,
  name,
  set,
  firstName,
  placeholder,
  error,
  setError,
}) {
  const handleValue = (e) => {
    set(e.target.value);
    setError(false);
  };

  return (
    <input
      type={type}
      name={name}
      id={name}
      value={firstName}
      className={`w-full border-l-[4px] border-gray-200 bg-zinc-100 p-2 focus:outline-none focus:border-blue-400 placeholder:text-gray-400 ${
        error && "border-red-500"
      }`}
      onChange={handleValue}
      placeholder={placeholder}
      required
    />
  );
}
