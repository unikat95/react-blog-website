import React, { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(email, password);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-auto flex flex-col bg-white p-10 rounded-md shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-start"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input type={"email"} set={setEmail} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <Input type={"password"} set={setPassword} />
          </div>
          <Button value="Sign Up" />
        </form>
      </div>
    </>
  );
}
