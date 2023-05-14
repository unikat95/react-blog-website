import React, { useContext, useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import BlogContext from "../context/BlogContext";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
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
          <Button value="Sign In" />
        </form>
      </div>
    </>
  );
}
